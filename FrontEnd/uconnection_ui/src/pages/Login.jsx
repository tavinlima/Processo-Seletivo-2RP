//Imports
import { useState } from "react";

import api from "../services/api";

import '../assets/css/login.css'
import logo from '../assets/img/Vectorlogoucon.png'
import redePessoas from '../assets/img/undraw_grades_re_j7d6.svg'
import { useNavigate } from "react-router-dom";
import { parseJwt } from "../services/auth";

export default function Index() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [erroMensagem, setErroMensagem] = useState('');

    let navigate = useNavigate();

    function efetuarLogin(event) {

        event.preventDefault();

        setErroMensagem('')
        setIsLoading(true)
        api.post("Login", {
            email: email,
            senha: senha
        })
            .then((resposta) => {
                if (resposta.status === 200) {
                    console.log(resposta)
                    localStorage.setItem('usuario-login', resposta.data.tokenGerado)

                    setSenha('')

                    setEmail('')

                    setIsLoading(false)

                    if (parseJwt().role === '1') {
                        navigate('/Perfil')
                    } else {
                        navigate('/listaUsuarios')
                    }

                }
            })
            .catch(erro => {
                console.log(erro);
                setIsLoading(false)
                if (erro.toJSON().status === 404) {
                    setIsLoading(false)
                    setErroMensagem("E-mail e/ou Senha inválidos")
                }
            });
    }

    return (
        <>
            <div className="conteudo_principal_login">
                <section className="box_input">
                    <span>Login </span>
                    <div className="linha_login"></div>

                    <form onSubmit={efetuarLogin}>
                        <div className="input_login">
                            <input
                                type="email"
                                name="email"
                                placeholder="e-mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />

                            <input
                                type="password"
                                name="senha"
                                placeholder="senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)} />
                            <p className="error_message">{erroMensagem}</p>
                            {
                                !isLoading ? <button type="submit" className="btn_login" disabled={email === '' || senha === ''}>entrar</button> : <button type="submit" className="btn_login" disabled>Carregando...</button>
                            }
                        </div>
                    </form>
                </section>
                <div>
                    <div className="banner_login">
                        <img src={logo} alt="Logo UConnection" className='logo_login'></img>
                        <img src={redePessoas} alt=" " className='img_login'></img>
                    </div>
                </div>
            </div>
        </>
    )
}