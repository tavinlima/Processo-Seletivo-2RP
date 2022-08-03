using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using UConnection_webAPI.Domains;
using UConnection_webAPI.Interfaces;
using UConnection_webAPI.ViewModels;

namespace UConnection_webAPI.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private IUsuarioRepository _usuarioRepository { get; set; }
        public LoginController(IUsuarioRepository repo)
        {
            _usuarioRepository = repo;
        }

        [HttpPost]
        public IActionResult Login(LoginViewModel login)
        {
            try
            {
                Usuario usuarioBuscado = _usuarioRepository.Login(login.Email, login.Senha);
                if (usuarioBuscado == null)
                {
                    return NotFound("E-mail ou senha inválidos!");
                }

                var MinhaClaim = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Email, usuarioBuscado.Email),
                    new Claim(JwtRegisteredClaimNames.FamilyName, usuarioBuscado.Nome),
                    new Claim(JwtRegisteredClaimNames.Jti, usuarioBuscado.IdUsuario.ToString()),
                    new Claim(ClaimTypes.Role, usuarioBuscado.IdTipoUsuario.ToString()),
                    new Claim( "role", usuarioBuscado.IdTipoUsuario.ToString() )
                };
                var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("FEWFEW323rdewsadas3"));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var meuToken = new JwtSecurityToken(
                       issuer: "UConnection_webAPI",
                       audience: "UConnection_webAPI",
                       claims: MinhaClaim,
                       expires: DateTime.Now.AddMinutes(30),
                       signingCredentials: creds
                   );

                return Ok(
                    new
                    {
                        tokenGerado = new JwtSecurityTokenHandler().WriteToken(meuToken)
                    });
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
            }
        }
    }
}
