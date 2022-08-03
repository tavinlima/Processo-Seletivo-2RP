﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using UConnection_webAPI.Domains;
using UConnection_webAPI.Interfaces;
using UConnection_webAPI.Utils;

namespace UConnection_webAPI.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private IUsuarioRepository _usuarioRepository { get; set; }
        public UsuariosController(IUsuarioRepository repo)
        {
            _usuarioRepository = repo;
        }

        [HttpGet]
        public IActionResult Listar()
        {
            try
            {
                return Ok(_usuarioRepository.ListarTodos());
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
            }
        }

        [Authorize(Roles = "2, 3")]
        [HttpPost]
        public IActionResult Cadastrar([FromForm] Usuario usuario, IFormFile arquivo)
        {
            try
            {
                if (usuario.Email == null || usuario.Senha == null || usuario.IdTipoUsuario == 0 || usuario.Nome == null)
                {
                    return BadRequest("Não foi possível cadastrar");
                };

                #region Upload da Imagem com extensões permitidas apenas
                string[] extensoesPermitidas = { "jpg", "png", "jpeg", "gif" };
                string uploadResultado = Upload.UploadFile(arquivo, extensoesPermitidas);

                if (uploadResultado == "")
                {
                    return BadRequest("Arquivo não encontrado");
                }

                if (uploadResultado == "Extensão não permitida")
                {
                    return BadRequest("Extensão de arquivo não permitida");
                }

                usuario.Imagem = uploadResultado;
                #endregion

                
                _usuarioRepository.Cadastrar(usuario);
                return StatusCode(201);
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
            }
        }

        [Authorize(Roles = "3")]
        [HttpDelete]
        public IActionResult Deletar(Guid idUsuario)
        {
            try
            {
                if (idUsuario == Guid.Empty)
                {
                    return BadRequest("Não foi possível deletar!");
                }
                else
                {
                    _usuarioRepository.Deletar(idUsuario);
                    return Ok();
                }
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
            }
        }

        [Authorize(Roles = "2,3")]
        [HttpPatch]
        public IActionResult AlterarStatus(Guid idUsuario, bool status)
        {
            try
            {
                _usuarioRepository.AlterarStatus(idUsuario, status);
                return Ok();
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
            }
        }

        [Authorize(Roles = "2,3")]
        [HttpPatch("AlterarTipoUsuario")]
        public IActionResult AlterarTipo(Guid idUsuario, int idTipoUsuario)
        {
            try
            {
                _usuarioRepository.AlterarTipo(idUsuario, idTipoUsuario);
                return Ok();
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
            }
        }
        [HttpGet("{idUsuario}")]
        public IActionResult BuscarPorId(Guid idUsuario)
        {
            try
            {
                return Ok(_usuarioRepository.BuscarPorId(idUsuario));
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
            }
        }
    }
}
