using AutoMapper;
using Core.DTO.Account;
using Core.Helpers;
using Core.Interfaces;
using Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace MessageApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _env;
        private readonly IConfiguration _configuration;
        private readonly IRecaptchaService _recaptchaService;
        private readonly IJwtService _jwtService;
        public AccountController(UserManager<ApplicationUser> userManager,
            IJwtService jwtService,
            IMapper mapper,
            IRecaptchaService recaptchaService,
            IWebHostEnvironment env,
            IConfiguration configuration)
        {
            _userManager = userManager;
            _mapper = mapper;
            _env = env;
            _configuration = configuration;
            _recaptchaService = recaptchaService;
            _jwtService = jwtService;
        }
        [HttpPost]
        public IActionResult Register([FromBody] RegisterUserDTO register)
        {
            var user = _mapper.Map<ApplicationUser>(register);
            if (!_recaptchaService.IsValid(register.RecaptchaToken))
            {
                return BadRequest(new { error = "Recaptcha not valid" });
            }
            try
            {
                if (register.Photo != null)
                {
                    string randomFilename = Path.GetRandomFileName() +
                        ".jpeg";
                    string pathSaveImages = InitStaticFiles
                        .CreateImageByFileName(_env, _configuration,
                            new string[] { "Folder" },
                            randomFilename, register.Photo, false, false);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            //доробить
            return Ok();
        }

        [HttpPost("GoogleExternalLogin")]
        public async Task<IActionResult> GoogleExternalLoginAsync([FromBody] ExternalLoginDTO request)
        {
            var payload = await _jwtService.VerifyGoogleToken(request);
            if (payload == null)
            {
                return BadRequest(new 
                { 
                    error = "Щось пішло не так!" 
                });
            }
            var info = new UserLoginInfo(request.Provider, payload.Subject, request.Provider);
            var user = await _userManager.FindByLoginAsync(info.LoginProvider, info.ProviderKey);

            if (user == null)
            {
                user = await _userManager.FindByEmailAsync(payload.Email);

                if (user == null)
                {
                    user = new ApplicationUser
                    {
                        Email = payload.Email,
                        UserName = payload.Email,
                        FirstName = payload.GivenName
                    };
                    var resultCreate = await _userManager.CreateAsync(user);
                    if (!resultCreate.Succeeded)
                    {
                        return BadRequest(new { error = "Щось пішло не так!" });
                    }
                }

                var resultAddLogin = await _userManager.AddLoginAsync(user, info);
                if (!resultAddLogin.Succeeded)
                {
                    return BadRequest(new { error = "Щось пішло не так!" });
                }
            }

            string token = _jwtService.CreateToken(user);
            return Ok(
                new { token }
            );
        }
    }
}
