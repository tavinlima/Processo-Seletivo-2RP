using System;
using System.Linq;
using UConnection_webAPI.Contexts;
using UConnection_webAPI.Domains;
using UConnection_webAPI.Interfaces;

namespace UConnection_webAPI.Repositories
{
    public class TipoUsuarioRepository : ITipoUsuarioRepository
    {
        readonly UConnectionContext ctx = new();
        public void Cadastrar(TipoUsuario novoTipo)
        {
            ctx.TiposUsuario.Add(novoTipo);
            ctx.SaveChanges();
        }

        public void Excluir(int idTipo)
        {
            var tipoBuscado = ctx.TiposUsuario.FirstOrDefault(m => m.IdTipoUsuario == idTipo);
            ctx.TiposUsuario.Remove(tipoBuscado);
            ctx.SaveChanges();
        }
    }
}
