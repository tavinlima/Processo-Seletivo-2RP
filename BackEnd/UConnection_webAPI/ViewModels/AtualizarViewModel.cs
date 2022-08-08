using System.ComponentModel.DataAnnotations;

namespace UConnection_webAPI.ViewModels
{
    public class AtualizarViewModel
    {
        public int IdTipoUsuario { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public bool Status { get; set; }
    }
}
