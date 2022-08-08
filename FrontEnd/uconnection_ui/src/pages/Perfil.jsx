import { useEffect, useState } from "react";
import Notiflix from 'notiflix';

import Header from "../components/header";
import MenuLateral from "../components/menuLateral";

import api from "../services/api";
import { parseJwt } from "../services/auth";

export default function Perfil() {
    const [idTipo, setIdTipo] = useState(0);
    const [idAlterado, setIdAlterado] = useState(0);
    const [tipo, setTipo] = useState(0);
    const [nomeUsuario, setNomeUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [senhaAntiga, setSenhaAntiga] = useState('');
    const [senhaNova, setSenhaNova] = useState('');
    const [fotoPerfil, setFotoPerfil] = useState('')
    const [status, setStatus] = useState(true);
    const [erroMensagem, setErroMensagem] = useState('');

    function abrirModal() {
        var modal = document.getElementById("myModal");

        modal.style.display = "block";

        window.onclick = function (event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        }
    }

    function buscarUsuario() {
        api('Usuarios/' + parseJwt().jti, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            }
        }).then(resposta => {
            if (resposta.status === 200) {
                setNomeUsuario(resposta.data.nome)
                setEmail(resposta.data.email)
                setStatus(resposta.data.status)
                setIdTipo(resposta.data.idTipoUsuario)
                setTipo(resposta.data.tipoUsuario.tipo)
                setFotoPerfil(resposta.data.imagem)
                setSenha(resposta.data.senha)
            }
        }).catch(erro => {
            Notiflix.Notify.failure('Ocorreu um erro, tente novamente mais tarde!')
            console.log(erro)
        })
    }

    function atualizarUsuario(e) {
        e.preventDefault();

        let usuarioAtualizado = {
            "idTipoUsuario": idTipo,
            "nome": nomeUsuario,
            "email": email,
            "senha": senha,
            "status": status
        }

        console.log(usuarioAtualizado)

        api.put('Usuarios/' + parseJwt().jti, usuarioAtualizado, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login')
            }
        }).then(resposta => {
            if (resposta.status === 200) {
                console.log('Atualizado')
                buscarUsuario()
                Notiflix.Notify.info('Informações atualizadas com sucesso!');
            }
        }).catch(erro => {
            Notiflix.Notify.failure('Ocorreu um erro, tente novamente mais tarde!')
            console.log(erro)
        })
    }

    function atualizarUsuarioGeral(e) {
        e.preventDefault();

        let usuarioAtualizado = {
            "nome": nomeUsuario,
            "email": email,
        }

        console.log(usuarioAtualizado)

        api.patch('Usuarios/Geral/' + parseJwt().jti, usuarioAtualizado, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login')
            }
        }).then(resposta => {
            if (resposta.status === 200) {
                console.log('Atualizado')
                buscarUsuario()
                Notiflix.Notify.info('Informações atualizadas com sucesso!');
            }
        }).catch(erro => {
            Notiflix.Notify.failure('Ocorreu um erro, tente novamente mais tarde!')
            console.log(erro)
        })
    }

    function atualizarSenha(e) {
        e.preventDefault();

        api.patch('Usuarios/AlterarSenha/' + parseJwt().jti + '?senhaNova=' + senhaNova + '&senhaAntiga=' + senhaAntiga, {
            senhaNova: senhaNova,
            senhaAntiga: senhaAntiga
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login')
            }
        }).then(resposta => {
            if (resposta.status === 200) {
                console.log('Atualizado')
                buscarUsuario()
                Notiflix.Notify.info('Informações atualizadas com sucesso!');
            }
        }).catch(erro => {
            console.log(erro);
            if (erro.toJSON().status === 400) {
                setErroMensagem("Erro! Verifique se a senha antiga foi inserida corretamente")
            }
        });

    }

    useEffect(buscarUsuario, [])

    return (
        <>
            <Header />
            <MenuLateral />
            <section className="container__listaUsuarios container">
                <section className="box__listaUsuarios">
                    <h1>Perfil</h1>
                    <img src={'http://localhost:5000/StaticFiles/Images/' + fotoPerfil} alt='Foto de perfil do usuário' className="perfil__img" />

                    {
                        parseJwt().role === '1' ?
                            <form onSubmit={atualizarUsuarioGeral} className='modal__boxCadastro'>
                                <label>
                                    Nome do Usuário
                                    <input
                                        className="input__form"
                                        type='text'
                                        value={nomeUsuario}
                                        name='nomeUsuario'
                                        placeholder="Nome"
                                        autoComplete='off'
                                        onChange={(e) => {
                                            setIdAlterado(1)
                                            setNomeUsuario(e.target.value)
                                        }}
                                    />
                                </label>
                                <label>
                                    Email
                                    <input
                                        className="input__form"
                                        type='text'
                                        value={email}
                                        placeholder='Email'
                                        name='email'
                                        autoComplete='off'
                                        onChange={(e) => {
                                            setIdAlterado(1)
                                            setEmail(e.target.value)
                                        }}
                                    />
                                </label>

                                <div className="div__btn">
                                    <button className="btn__atuzSenha" type='button' onClick={abrirModal}>Atualizar senha</button>

                                    {
                                        idAlterado === 1 ? <button className="btn__atuzUsuario">Atualizar</button> : ''
                                    }
                                </div>
                            </form>


                            :
                            <form onSubmit={atualizarUsuario} className='modal__boxCadastro'>
                                <label>
                                    Nome do Usuário
                                    <input
                                        className="input__form"
                                        type='text'
                                        value={nomeUsuario}
                                        name='nomeUsuario'
                                        placeholder="Nome"
                                        autoComplete='off'
                                        onChange={(e) => {
                                            setIdAlterado(1)
                                            setNomeUsuario(e.target.value)
                                        }}
                                    />
                                </label>
                                <label>
                                    Email
                                    <input
                                        className="input__form"
                                        type='text'
                                        value={email}
                                        placeholder='Email'
                                        name='email'
                                        autoComplete='off'
                                        onChange={(e) => {
                                            setIdAlterado(1)
                                            setEmail(e.target.value)
                                        }}
                                    />
                                </label>

                                <label className="checkbox__form">
                                    Usuário ativo?
                                    <input
                                        type='checkbox'
                                        value={status}
                                        checked={status === true}
                                        name='status'
                                        onChange={(e) => {
                                            setIdAlterado(1)
                                            setStatus(e.target.checked)
                                        }}
                                    />
                                </label>

                                <label>
                                    Tipo de usuário
                                    <select onChange={(e) => {
                                        setIdAlterado(1)
                                        setIdTipo(e.target.value)
                                    }}>
                                        <option value={idTipo} disabled selected>{tipo}</option>
                                        <option value='1'>Geral</option>
                                        <option value='2'>Admin</option>
                                        <option value='3'>Root</option>
                                    </select>
                                </label>
                                <div className="div__btn">
                                    <button type='button' onClick={abrirModal} className='btn__atuzSenha'>Atualizar senha</button>
                                    {
                                        idAlterado === 1 ? <button className="btn__atuzUsuario">Atualizar</button> : ''
                                    }
                                </div>
                            </form>
                    }
                    <div id="myModal" className="modalSenha">
                        <div className="modal-contentSenha">
                            <form onSubmit={atualizarSenha} className='modal__boxCadastro'>
                                <label>
                                    Digite sua senha antiga
                                    <input
                                        className="input__form"
                                        type='password'
                                        value={senhaAntiga}
                                        placeholder='Senha'
                                        name='senha'
                                        autoComplete='off'
                                        onChange={(e) => {
                                            setSenhaAntiga(e.target.value)
                                        }}
                                    />
                                </label>

                                <label>
                                    Digite sua nova senha
                                    <input
                                        className="input__form"
                                        type='password'
                                        value={senhaNova}
                                        placeholder='SenhaNova'
                                        name='senhaNova'
                                        autoComplete='off'
                                        onChange={(e) => {
                                            setSenhaNova(e.target.value)
                                        }}
                                    />
                                </label>

                                <p className="error_message">{erroMensagem}</p>

                                <button className="btn__atuzSenha btn__senhaForm">Atualizar Senha</button>
                            </form>
                        </div>
                    </div>
                </section>
            </section>
        </>
    )
}