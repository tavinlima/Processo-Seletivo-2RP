import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Route, BrowserRouter as Router, Routes, Outlet, Navigate } from 'react-router-dom';
import { parseJwt, usuarioAutenticado } from './services/auth';

import './index.css';

import ListaUsuarios from './pages/ListaUsuarios';
import Login from './pages/Login.jsx'
import Perfil from './pages/Perfil.jsx'

const PermissaoAdminRoot = () => {
  return (
    usuarioAutenticado() && (parseJwt().role === '2' || parseJwt().role === '3') ?
      <Outlet /> : <Navigate to='/' />
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route element={<PermissaoAdminRoot />}>
          <Route path='/ListaUsuarios' element={<ListaUsuarios />} />
        </Route>

        <Route path='/Perfil' element={<Perfil />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
