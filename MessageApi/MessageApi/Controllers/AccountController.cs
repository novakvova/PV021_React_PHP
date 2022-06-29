using AutoMapper;
using Core.DTO.Account;
using Core.Helpers;
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
        public AccountController(UserManager<ApplicationUser> userManager,
            IMapper mapper, 
            IWebHostEnvironment env,
            IConfiguration configuration)
        {
            _userManager = userManager;
            _mapper = mapper;
            _env = env;
            _configuration = configuration;
        }
        [HttpPost]
        public IActionResult Register([FromBody]RegisterUserDTO register)
        {
            var user = _mapper.Map<ApplicationUser>(register);
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
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
            //доробить
            return Ok();
        }
    }
}
