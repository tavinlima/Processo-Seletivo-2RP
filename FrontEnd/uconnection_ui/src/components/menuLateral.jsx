import '../assets/css/menuLateral.css'

import { Link, useNavigate } from "react-router-dom"
import { parseJwt } from '../services/auth';

export default function MenuLateral() {
    let navigate = useNavigate();

    function realizarLogout() {
        localStorage.removeItem('usuario-login')
        navigate('/')
    }

    return (
        <ul className="menuLateral">
            {
                parseJwt().role === '1' ? '' :
                    <Link to='/listaUsuarios'><li className='menuLateral__indice'>Lista de usuários</li></Link>
            }
            <Link to='/Perfil'><li className='menuLateral__indice'>Perfil</li></Link>
            <li onClick={realizarLogout} className='menuLateral__sair'>Sair</li>
        </ul>
    )
}