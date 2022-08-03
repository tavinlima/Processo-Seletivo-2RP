using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UConnection_webAPI.Domains
{
    [Table("Usuarios")]
    public class Usuario
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid IdUsuario { get; set; }
        [ForeignKey("TipoUsuario")]
        public int IdTipoUsuario { get; set; }
        public TipoUsuario TipoUsuario { get; set; }

        [Required(ErrorMessage = "Por favor, informe o nome de usuário!")]
        public string Nome { get; set; }

        [Required(ErrorMessage = "Por favor, informe o e-mail de usuário!")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Por favor, informe a senha do usuário!")]
        [StringLength(250, MinimumLength = 8, ErrorMessage = "A senha deve conter entre 8 e 250 caracteres!")]
        public string Senha { get; set; }
        public string Imagem { get; set; }
        public bool Status { get; set; }
    }
}
