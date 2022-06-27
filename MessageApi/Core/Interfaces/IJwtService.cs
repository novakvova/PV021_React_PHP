using Entities;
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
        //string CreateRefreshToken();
        //IEnumerable<Claim> GetClaimsFromExpiredToken(string token);
        // ===== Need Add Posibility For Authentication using Google Auth
        // Task<GoogleJsonWebSignature.Payload> VerifyGoogleToken(UserExternalAuthDTO authDTO);
    }
}
