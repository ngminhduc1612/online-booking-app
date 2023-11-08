
using Api.Database;
using Api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly MyDbContext _context;
        private readonly AppSettings _appSettings;
        public LoginController(MyDbContext context, IOptionsMonitor<AppSettings> optionsMonitor) {
            _context = context;
            _appSettings = optionsMonitor.CurrentValue;
        }

        [HttpPost("Login")]
        public IActionResult Validate(LoginModel model) {
            var user = _context.Users.SingleOrDefault(p => p.Username == model.Username && 
            p.Password == model.Password);
            if (user == null)
            {
                return Ok(new ApiResponse
                {
                    Success = false,
                    Message = "Invalid username/password"
                });
            }

            return Ok(new ApiResponse
            {
                Success = true,
                Message = "Authenticate success",
                Data = GenerateToken(user)
            }) ;
        }

        [HttpPost("Auth")]
        public IActionResult Auth(TokenModel token)
        {
            Guid id = (Guid)ValidateToken(token.AccessToken);
            if (token == null)
                return NotFound();
            var user = _context.Users.SingleOrDefault(p => p.Id == id);

            return Ok(new ApiResponse
            {
                Success = true,
                Message = "Valid Token",
                Data =  user,
            });
        }

        private TokenModel GenerateToken(User user)
        {
            var jwtToken = new JwtSecurityTokenHandler();

            var seretKeyBytes = Encoding.UTF8.GetBytes(_appSettings.SecretKey);

            var tokenDecription = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim("Username", user.Username),
                    new Claim("Id", user.Id.ToString()),

                    //roles

                    new Claim("TokenId", Guid.NewGuid().ToString())
                }),

                Expires = DateTime.UtcNow.AddMinutes(60),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(seretKeyBytes),
                SecurityAlgorithms.HmacSha512Signature
                )
                
            };

            var token = jwtToken.CreateToken(tokenDecription);
            var acessToken =  jwtToken.WriteToken(token);

            return new TokenModel
            {
                AccessToken = acessToken,
                RefreshToken = GenerateRefreshToken()
            };
        }

        private Guid? ValidateToken(string token)
        {
            if (token == null)
                return null;

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.SecretKey);
            try
            {
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    // set clockskew to zero so tokens expire exactly at token expiration time (instead of 5 minutes later)
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                var jwtToken = (JwtSecurityToken)validatedToken;
                var userId = Guid.Parse(jwtToken.Claims.First(x => x.Type == "Id").Value);

                // return user id from JWT token if validation successful
                return userId;
            }
            catch
            {
                // return null if validation fails
                return null;
            }
        }

        private string GenerateRefreshToken()
        {
            var random = new byte[32];
            using(var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(random);
                return Convert.ToBase64String(random);
            }
        }
    }
}
