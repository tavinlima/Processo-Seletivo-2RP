using System;
using System.Collections.Generic;
using UConnection_webAPI.Domains;

namespace UConnection_webAPI.Interfaces
{
    public interface IUsuarioRepository
    {
        Usuario Cadastrar(Usuario novoUsuario);
        void Deletar(Guid idUsuario);
        void Atualizar(Guid idUsuario, Usuario usuarioAtualizado);
        List<Usuario> ListarTodos();
        Usuario BuscarPorId(Guid idUsuario);
        void AlterarStatus(Guid idUsuario, bool status);
        Usuario Login(string email, string senha);
        void AlterarTipo(Guid idUsuario, int idTipoUsuario);
    }
}
