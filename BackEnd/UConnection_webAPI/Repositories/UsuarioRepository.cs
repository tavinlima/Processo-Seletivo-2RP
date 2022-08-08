using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using UConnection_webAPI.Contexts;
using UConnection_webAPI.Domains;
using UConnection_webAPI.Interfaces;
using UConnection_webAPI.Utils;
using UConnection_webAPI.ViewModels;

namespace UConnection_webAPI.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        readonly UConnectionContext ctx = new();

        public void AlterarSenha(Guid idUsuario, string senha)
        {
            Usuario usuarioEncontrado = ctx.Usuarios.FirstOrDefault(x => x.IdUsuario == idUsuario);
            if (usuarioEncontrado != null)
            {
                usuarioEncontrado.Senha = Criptografia.GerarHash(senha);
                ctx.Update(usuarioEncontrado);

                ctx.SaveChanges();
            }
        }

        public void AlterarStatus(Guid idUsuario, bool status)
        {
            Usuario usuarioEncontrado = ctx.Usuarios.FirstOrDefault(x => x.IdUsuario == idUsuario);
            if (usuarioEncontrado != null)
            {
                usuarioEncontrado.Status = status; 
                ctx.Update(usuarioEncontrado);

                ctx.SaveChanges();
            }

        }

        public void AlterarTipo(Guid idUsuario, int idTipoUsuario)
        {
            Usuario usuarioEncontrado = ctx.Usuarios.FirstOrDefault(x => x.IdUsuario == idUsuario);
            if (usuarioEncontrado != null)
            {
                usuarioEncontrado.IdTipoUsuario = idTipoUsuario switch
                {
                    1 => 1,
                    2 => 2,
                    3 => 3,
                    _ => usuarioEncontrado.IdTipoUsuario,
                };
                ctx.Update(usuarioEncontrado);

                ctx.SaveChanges();
            }
        }

        public void Atualizar(Guid idUsuario, AtualizarViewModel usuarioAtualizado)
        {
            Usuario usuarioEncontrado = ctx.Usuarios.Find(idUsuario);

            if (usuarioEncontrado.Nome != null|| usuarioEncontrado.IdTipoUsuario != 0)
            {
                usuarioEncontrado.Nome = usuarioAtualizado.Nome;
                usuarioEncontrado.Email = usuarioAtualizado.Email;
                usuarioEncontrado.IdTipoUsuario = usuarioAtualizado.IdTipoUsuario;
                usuarioEncontrado.Status = usuarioAtualizado.Status;

                ctx.Update(usuarioEncontrado);

                ctx.SaveChanges();
            }
        }

        public void AtualizarGeral(Guid idUsuario, AtualizarGeralViewModel usuarioAtualizado)
        {
            Usuario usuarioEncontrado = ctx.Usuarios.Find(idUsuario);

            if (usuarioEncontrado.Nome != null || usuarioEncontrado.IdTipoUsuario != 0)
            {
                usuarioEncontrado.Nome = usuarioAtualizado.Nome;
                usuarioEncontrado.Email = usuarioAtualizado.Email;

                ctx.Update(usuarioEncontrado);

                ctx.SaveChanges();
            }
        }

        public Usuario BuscarPorId(Guid idUsuario)
        {
            return ctx.Usuarios.Include(x => x.TipoUsuario).FirstOrDefault(x => x.IdUsuario == idUsuario);

        }

        public Usuario Cadastrar(Usuario novoUsuario)
        {
            novoUsuario.Senha = Criptografia.GerarHash(novoUsuario.Senha);
            ctx.Usuarios.Add(novoUsuario);
            ctx.SaveChanges();
            return novoUsuario;
        }

        public void Deletar(Guid idUsuario)
        {
            ctx.Usuarios.Remove(BuscarPorId(idUsuario));
            ctx.SaveChanges();
        }

        public List<Usuario> ListarTodos()
        {
            return ctx.Usuarios.Include(x => x.TipoUsuario).ToList();
        }

        public Usuario Login(string email, string senha)
        {
            var usuarioBuscado = ctx.Usuarios.FirstOrDefault(u => u.Email == email);

            if (usuarioBuscado != null)
            {
                bool confere = Criptografia.Comparar(senha, usuarioBuscado.Senha);
                if (confere) return usuarioBuscado;
            }

            return null;
        }
    }
}
