using Core.DTO.Account;
using Entities;
using Google.Apis.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IJwtService
    {
        //IEnumerable<Claim> SetClaims(Author author, string userRole);
        string CreateToken(ApplicationUser user);
        Task<GoogleJsonWebSignature.Payload> VerifyGoogleToken(ExternalLoginDTO request);
    }
}
