import React, { useEffect, useState } from 'react';
import { Buscador } from '../Buscador/Buscador';
import './Navbar.css';

export const Navbar = () => {
    const [perfilInfo, setPerfilInfo] = useState(JSON.parse(localStorage.getItem('perfil_info')));
    const [loading, setLoading] = useState(true);

    return (
        <nav className="navbar">
            <Buscador />
            <div className='logo-container'>
                <img src='/assets/img/logo.png' className='logo' alt='Logo' />
            </div>

            <div className='perfil-usuari'>
                {
                    loading && perfilInfo.length == 0 ? "" : (
                        <>
                            <h5 className='nom-perfil'>{perfilInfo.display_name}</h5>
                            <img className='foto-perfil' src={perfilInfo.images[0] ? perfilInfo.images[0].url : '/assets/img/userAlt.png'} alt='Foto de perfil' />
                        </>
                    )
                }
            </div>
        </nav>
    );
}