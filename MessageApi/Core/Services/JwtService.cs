using Core.DTO.Account;
using Core.Helpers;
using Core.Interfaces;
using Entities;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Core.Services
{
    public class JwtService : IJwtService
    {
        private readonly IOptions<JwtOptions> _jwtOptions;
        private readonly IOptions<GoogleAuthSettings> _googleAuthSettings;
        private readonly UserManager<ApplicationUser> _userManager;
        public JwtService(IOptions<JwtOptions> jwtOptions, 
            IOptions<GoogleAuthSettings> googleAuthSettings,
            UserManager<ApplicationUser> userManager)
        {
            _jwtOptions = jwtOptions;
            _googleAuthSettings = googleAuthSettings;
            _userManager = userManager;
        }
        public string CreateToken(ApplicationUser user)
        {
            var roles = _userManager.GetRolesAsync(user).Result;
            List<Claim> claims = new List<Claim>()
            {
                new Claim("name", user.UserName)
                //new Claim("image", user.Photo)
            };

            foreach (var role in roles)
            {
                claims.Add(new Claim("roles", role));
            }
            var signinKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtOptions.Value.Key));
            var signinCredentials = new SigningCredentials(signinKey, SecurityAlgorithms.HmacSha256);

            var jwt = new JwtSecurityToken(
                signingCredentials: signinCredentials,
                expires: DateTime.Now.AddHours(_jwtOptions.Value.LifeTime),
                issuer: _jwtOptions.Value.Issuer,
                claims: claims
            );
            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }

        public async Task<GoogleJsonWebSignature.Payload> VerifyGoogleToken(ExternalLoginDTO request)
        {
            var settings = new GoogleJsonWebSignature.ValidationSettings()
            {
                Audience = new List<string>() { _googleAuthSettings.Value.ClientId }
            };

            var payload = await GoogleJsonWebSignature.ValidateAsync(request.Token, settings);
            return payload;
        }
    }
}
