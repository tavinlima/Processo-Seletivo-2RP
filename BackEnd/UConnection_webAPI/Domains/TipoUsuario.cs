using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UConnection_webAPI.Domains
{
    [Table("TipoUsuario")]
    public class TipoUsuario
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int IdTipoUsuario { get; set; }
        [Required]
        public string Tipo { get; set; }
    }
}
