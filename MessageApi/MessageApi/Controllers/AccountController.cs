using AutoMapper;
using Core.DTO.Account;
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
        public AccountController(UserManager<ApplicationUser> userManager,
            IMapper mapper)
        {
            _userManager = userManager;
            _mapper = mapper;
        }
        [HttpPost]
        public IActionResult Register([FromBody]RegisterUserDTO register)
        {
            var user = _mapper.Map<ApplicationUser>(register);
            //доробить
            return Ok();
        }
    }
}
