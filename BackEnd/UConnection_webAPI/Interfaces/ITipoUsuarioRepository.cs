using System;
using UConnection_webAPI.Domains;

namespace UConnection_webAPI.Interfaces
{
    public interface ITipoUsuarioRepository
    {
        public void Cadastrar(TipoUsuario novoTipo);
        public void Excluir(int idTipo);
    }
}
