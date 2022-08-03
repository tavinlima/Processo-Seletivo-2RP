using System.ComponentModel.DataAnnotations;

namespace UConnection_webAPI.ViewModels
{
    public class LoginViewModel
    {
        [Required(ErrorMessage = "Por favor, informe o e-mail de usuário!")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Por favor, informe a senha do usuário!")]
        public string Senha { get; set; }
    }
}
