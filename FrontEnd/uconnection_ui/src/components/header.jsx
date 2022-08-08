import { parseJwt } from "../services/auth";
import { Link } from 'react-router-dom'
import api from "../services/api";
import { useEffect, useState } from "react";

export default function Header() {
    const [tipoUsuario, setTipoUsuario] = useState('');

    function buscarTipoUsuario() {
        api('Usuarios/' + parseJwt().jti, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login')
            }
        }).then(resposta => {
            if (resposta.status === 200) {
                setTipoUsuario(resposta.data.tipoUsuario.tipo)
            }
        })
    }

    useEffect(buscarTipoUsuario, [])

    return (
        <header>
            <div className="container header__conteudo">
                <Link to='/Perfil'><span>{parseJwt().family_name + ' - ' + tipoUsuario}</span></Link>
            </div>
        </header>
    )
}