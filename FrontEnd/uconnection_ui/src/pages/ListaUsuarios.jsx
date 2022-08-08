import { useEffect, useState } from "react";
import Header from "../components/header";
import MenuLateral from "../components/menuLateral";
import api from "../services/api";
import Notiflix from 'notiflix';

import '../assets/css/listaUsuarios.css'
import { parseJwt } from "../services/auth";

export default function Index() {
    const [listaUsuarios, setListaUsuarios] = useState([]);
    const [userSelecionado, setUserSelecionado] = useState(0);
    const [idAlterado, setIdAlterado] = useState(0);
    const [idTipo, setIdTipo] = useState(0);
    const [tipo, setTipo] = useState('');
    const [nomeUsuario, setNomeUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [status, setStatus] = useState(true);
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [filtroSelecionado, setFiltroSelecionado] = useState(0);

    // Funções sem chamada para API

    const searchItems = (searchValue) => {
        setSearchInput(searchValue)
        if (searchInput !== '') {
            const filteredData = listaUsuarios.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilteredResults(filteredData)
        }
        else {
            setFilteredResults(listaUsuarios)
        }
    }

    function limparCampos() {
        setNomeUsuario('');
        setEmail('');
        setSenha('');
        setStatus(false);
        setIdTipo(1)
    }

    function abrirModal() {
        var modal = document.getElementById("myModal");

        modal.style.display = "block";

        window.onclick = function (event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        }
    }

    function abrirPerfil(users) {
        var modal = document.getElementById("meuPerfil");

        modal.style.display = "block";

        window.onclick = function (event) {
            if (event.target === modal) {
                modal.style.display = "none";
                setNomeUsuario('')
                setEmail('')
                setStatus('')
                setIdTipo('')
            }
        }

        buscarUsuario(users.idUsuario)
        setUserSelecionado(users.idUsuario)
    }

    // Funções com chamada para API

    function listarUsuarios() {
        api('Usuarios', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            }
        }).then(resposta => {
            if (resposta.status === 200) {
                setListaUsuarios(resposta.data)
            }
        }).catch(erro => console.log(erro))
    }

    function listarAtivos() {
        api("Usuarios", {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            }
        }).then(resposta => {
            if (resposta.status === 200) {

                let listaAtivos = resposta.data.filter((user) => {
                    return user.status === true
                })
                setListaUsuarios(listaAtivos)
            }
        })
            .catch(erro => console.log(erro));
    }

    function listarInativos() {
        api("Usuarios", {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            }
        }).then(resposta => {
            if (resposta.status === 200) {

                let listaInativos = resposta.data.filter((user) => {
                    return user.status === false
                })
                setListaUsuarios(listaInativos)
            }
        })
            .catch(erro => console.log(erro));
    }

    function buscarUsuario(idUsuario) {
        api('Usuarios/' + idUsuario, {
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
            }
        })
    }

    function cadastrarUsuario(e) {
        e.preventDefault()

        var formData = new FormData();

        const target = document.getElementById('arquivo')
        const file = target.files[0]

        formData.append('idTipoUsuario', idTipo);
        formData.append('nome', nomeUsuario);
        formData.append('email', email);
        formData.append('senha', senha);
        formData.append('status', status);
        formData.append('arquivo', file, file.name);

        api.post('Usuarios', formData, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
                "Content-Type": "multipart/form-data"
            }
        }).then(resposta => {
            if (resposta.status === 201) {
                var modal = document.getElementById("myModal");
                modal.style.display = 'none';
                listarUsuarios()
                limparCampos()
                document.location.reload(true);
                Notiflix.Notify.success('Usuário cadastrado com sucesso!');
            }
        }).catch(erro => console.log(erro))
    }

    function atualizarUsuario(e) {
        e.preventDefault();

        let usuarioAtualizado = {
            "idTipoUsuario": idTipo,
            "nome": nomeUsuario,
            "email": email,
            "status": status
        }

        console.log(usuarioAtualizado)

        api.put('Usuarios/' + userSelecionado, usuarioAtualizado, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login')
            }
        }).then(resposta => {
            if (resposta.status === 200) {
                Notiflix.Notify.info('Informações atualizadas com sucesso!');
                buscarUsuario()
                listarUsuarios()
                var modal = document.getElementById("meuPerfil");
                modal.style.display = 'none';
                setIdAlterado(0)
            }
        })
    }

    function excluirUsuario() {
        Notiflix.Confirm.show(
            'Excluir usuário',
            'Deseja mesmo excluir esse usuário? Essa ação não poderá ser desfeita',
            'Sim',
            'Não',
            function okCb() {
                api.delete('Usuarios/' + userSelecionado, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('usuario-login')
                    }
                }).then(resposta => {
                    if (resposta.status === 200) {
                        var modal = document.getElementById("meuPerfil");
                        console.log('Usuario deletado com sucesso')
                        listarUsuarios()
                        modal.style.display = 'none';
                    }
                })
            },
            function cancelCb() {
            },
            {
                width: '320px',
                borderRadius: '8px',
                titleColor: '#082640',
                okButtonColor: '#fff',
                okButtonBackground: '#082640'
            },
        );

    }

    // UseEffect
    // useEffect(listarUsuarios, [])
    useEffect(() => {
        if (filtroSelecionado === '1') {
            listarAtivos()
        } else if (filtroSelecionado === '2') {
            listarInativos()
        } else {
            listarUsuarios()
        }
    })
    return (
        <>
            <Header />
            <MenuLateral />
            <section className="container__listaUsuarios container">
                <section className="box__listaUsuarios">
                    <h1>Lista de usuários</h1>
                    <div className="box__infAdicionais">
                        <input
                            className="input__busca"
                            type="search"
                            id='usuarios'
                            name='usuario'
                            autoComplete='off'
                            list='usuarios'
                            onChange={(e) => searchItems(e.target.value)}
                            placeholder="Digite o nome de um usuário" />
                        <button className='btn__addUsers' onClick={() => abrirModal()}>Cadastrar usuário</button>
                        <div id="myModal" className="modal">
                            <div className="modal-contentAdd">
                                <div className="modal_container">
                                    <form onSubmit={cadastrarUsuario} className='modal__boxCadastro'>
                                        <label>
                                            Nome do Usuário
                                            <input
                                                className="input__form"
                                                type='text'
                                                value={nomeUsuario}
                                                name='nomeUsuario'
                                                placeholder="Nome"
                                                autoComplete='off'
                                                onChange={(e) => setNomeUsuario(e.target.value)}
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
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </label>
                                        <label>
                                            Senha
                                            <input
                                                className="input__form"
                                                type='password'
                                                value={senha}
                                                name='senha'
                                                autoComplete='off'
                                                placeholder="Senha"
                                                onChange={(e) => setSenha(e.target.value)}
                                            />
                                        </label>
                                        <label className="checkbox__form">
                                            Usuário ativo?
                                            <input
                                                className="input__form"
                                                type='checkbox'
                                                value={status}
                                                name='status'
                                                onChange={(e) => setStatus(e.target.checked)}
                                            />
                                        </label>
                                        <label>
                                            Foto de perfil do usuário
                                            <input
                                                type='file'
                                                id='arquivo'
                                                accept="image/png, image/jpeg"
                                            />
                                        </label>
                                        <label>
                                            Tipo de usuário
                                            <select onChange={(e) => setIdTipo(e.target.value)}>
                                                <option value='0' disabled selected>Escolha uma opção abaixo</option>
                                                <option value='1'>Geral</option>
                                                <option value='2'>Admin</option>
                                                <option value='3'>Root</option>
                                            </select>
                                        </label>
                                        <button className='btn__addUsers'>Cadastrar</button>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>

                    <select className='select__filterProjects' onChange={(e) => setFiltroSelecionado(e.target.value)} value={filtroSelecionado}>
                        <option value='0'>Todos os usuários</option>
                        <option value='1'>Usuários ativos</option>
                        <option value='2'>Usuários inativos</option>
                    </select>
                    {
                        searchInput.length > 0 ?
                            filteredResults.map((users) => {
                                return (
                                    <button className="buttton__abrirPerfil" key={users.idUsuario} onClick={() => { abrirPerfil(users) }}>
                                        <div className='list'>
                                            <img src={'http://localhost:5000/StaticFiles/Images/' + users.imagem} alt='Foto de perfil do usuário' className="list__img" />
                                            <div className="list__div">
                                                <span className="list__title">{users.nome}</span>
                                                <span className="list__subtext">{users.email}</span>
                                            </div>
                                            <div className="list__div">
                                                <span className="list__title">Usuário</span>
                                                <span className="list__subtext">{users.tipoUsuario.tipo}</span>
                                            </div>
                                            <div className="list__div">
                                                <span className="list__title">Status</span>
                                                <span className="list__subtext">{users.status === true ? 'Ativo' : 'Inativo'}</span>
                                            </div>
                                        </div>
                                    </button>
                                )
                            })

                            :

                            listaUsuarios.map((users) => {
                                return (
                                    <button className="buttton__abrirPerfil" key={users.idUsuario} onClick={() => { abrirPerfil(users) }}>
                                        <div className='list'>
                                            <img src={'http://localhost:5000/StaticFiles/Images/' + users.imagem} alt='Foto de perfil do usuário' className="list__img" />
                                            <div className="list__div">
                                                <span className="list__title">{users.nome}</span>
                                                <span className="list__subtext">{users.email}</span>
                                            </div>
                                            <div className="list__div">
                                                <span className="list__title">Usuário</span>
                                                <span className="list__subtext">{users.tipoUsuario.tipo}</span>
                                            </div>
                                            <div className="list__div">
                                                <span className="list__title">Status</span>
                                                <span className="list__subtext" >{users.status === true ? 'Ativo' : 'Inativo'}</span>

                                            </div>
                                        </div>
                                    </button>
                                )
                            })
                    }
                    <div id='meuPerfil' className="modal">
                        <div className="modal-contentAdd">
                            <div className="modal_container">

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
                                        {
                                            parseJwt().role === '3' ?
                                                <button className="btn__deletUsuario" onClick={() => excluirUsuario()}>Excluir usuário</button>
                                                : ''
                                        }
                                        {
                                            idAlterado === 1 ? <button className="btn__atuzUsuario">Atualizar</button> : ''
                                        }
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>

                </section>
            </section>
        </>
    )
}