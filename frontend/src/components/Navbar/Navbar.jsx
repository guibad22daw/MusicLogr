import React, { useEffect, useState } from 'react';
import { Buscador } from '../Buscador/Buscador';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
    const [perfilInfo, setPerfilInfo] = useState(JSON.parse(localStorage.getItem('perfil_info')));
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const logoutClickHandler = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('perfil_info');
        window.location.href = '/';
    }

    const perfilUsuariClickHandler = () => {
        navigate('/perfil');
    }

    return (
        <nav className="navbar">
            <Buscador />
            <div className='logo-container'>
                <img src='/assets/img/logo.png' className='logo' alt='Logo' onClick={() => navigate('/home')} />
            </div>

            <div className='perfil-usuari'>
                {
                    loading && perfilInfo.length == 0 ? "" : (
                        <>
                            <h5 className='nom-perfil'>{perfilInfo.display_name}</h5>
                            <img className='foto-perfil' src={perfilInfo.images[0] ? perfilInfo.images[0].url : '/assets/img/userAlt.png'} alt='Foto de perfil' />
                            <div className="user-nav">
                                <ul>
                                    <li onClick={perfilUsuariClickHandler}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>El meu perfil</li>
                                    <li onClick={logoutClickHandler}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1DB954" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3"/></svg>Logout</li>
                                </ul>
                            </div>
                        </>
                    )
                }
            </div>
        </nav>
    );
}