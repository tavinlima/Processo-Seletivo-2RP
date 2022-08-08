using System;
using System.Collections.Generic;
using UConnection_webAPI.Domains;
using UConnection_webAPI.ViewModels;

namespace UConnection_webAPI.Interfaces
{
    public interface IUsuarioRepository
    {
        /// <summary>
        /// Método para cadastrar um novo usuário
        /// </summary>
        /// <param name="novoUsuario">Objeto Usuário que será cadastrado</param>
        /// <returns></returns>
        Usuario Cadastrar(Usuario novoUsuario);
        /// <summary>
        /// Método para deletar um usuário cadastrado
        /// </summary>
        /// <param name="idUsuario">Id do usuário que será deletado</param>
        void Deletar(Guid idUsuario);
        /// <summary>
        /// Método para atualizar um usuário
        /// </summary>
        /// <param name="idUsuario">Id do usuário que será atualizado</param>
        /// <param name="usuarioAtualizado">Informações que serão atualizadas</param>
        void Atualizar(Guid idUsuario, AtualizarViewModel usuarioAtualizado);
        List<Usuario> ListarTodos();
        /// <summary>
        /// Método para buscar um usuário específico
        /// </summary>
        /// <param name="idUsuario">Id do usuário que será buscado</param>
        /// <returns></returns>
        Usuario BuscarPorId(Guid idUsuario);
        /// <summary>
        /// Método para atualizar o status de inativo ou ativo
        /// </summary>
        /// <param name="idUsuario">Id do usuário que terá seu tipo atualizado</param>
        /// <param name="status">Status ativo ou inativo</param>
        void AlterarStatus(Guid idUsuario, bool status);
        /// <summary>
        /// Método para fazer login
        /// </summary>
        /// <param name="email"></param>
        /// <param name="senha"></param>
        /// <returns></returns>
        Usuario Login(string email, string senha);
        /// <summary>
        /// Método para atualizar o tipo do usuário
        /// </summary>
        /// <param name="idUsuario">Id do usuário que terá seu tipo atualizado</param>
        /// <param name="idTipoUsuario">Id do tipo de usuário</param>
        void AlterarTipo(Guid idUsuario, int idTipoUsuario);
        /// <summary>
        /// Método para atualizar as informações do usuário do tipo 'geral'
        /// </summary>
        /// <param name="idUsuario">Id do usuário a ser atualizado</param>
        /// <param name="usuarioAtualizado">Informações que serão atualizadas</param>
        void AtualizarGeral(Guid idUsuario, AtualizarGeralViewModel usuarioAtualizado);

        /// <summary>
        /// Método para atualizar a senha do usuário
        /// </summary>
        /// <param name="idUsuario">Id do usuário que terá sua senha atualizada</param>
        /// <param name="senha">Nova senha a ser cadastrada</param>
        void AlterarSenha(Guid idUsuario, string senha);
    }
}
