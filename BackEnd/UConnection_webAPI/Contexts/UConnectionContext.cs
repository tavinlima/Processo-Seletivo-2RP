using Microsoft.EntityFrameworkCore;
using UConnection_webAPI.Domains;

namespace UConnection_webAPI.Contexts
{
    public class UConnectionContext : DbContext
    {
        public UConnectionContext()
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=.\\SQLEXPRESS;Database=UConnection;Integrated Security=True");

            base.OnConfiguring(optionsBuilder);
        }
        public DbSet<TipoUsuario> TiposUsuario { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }

        
    }
}
