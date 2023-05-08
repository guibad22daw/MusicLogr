import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from "react-router-dom";
import { Buscador } from '../Buscador/Buscador';
import './Navbar.css';

export const Navbar = () => {
    const location = useLocation();
    const [accesToken, setAccesToken] = useState(localStorage.getItem('access_token'));
    const [perfilInfo, setPerfilInfo] = useState([]);

    useEffect(() => {
        async function fetchProfile(accesToken) {
            const result = await fetch("https://api.spotify.com/v1/me", {
                method: "GET", headers: { Authorization: `Bearer ${accesToken}` }
            });
            setPerfilInfo(await result.json());
        }
        fetchProfile(accesToken);
    }, [accesToken]);

    return (
        <nav className="navbar">
            <Buscador />
            <div className='logo-container'>
                <img src='/assets/img/logo.png' className='logo' alt='Logo' />
            </div>
            <div className='perfil-usuari'>
                <h5 className='nom-perfil'>{perfilInfo.display_name}</h5>
                <img className='foto-perfil' src={perfilInfo.images != undefined ? perfilInfo.images[0].url : '/assets/img/logo.png'} alt='Foto de perfil' />
            </div>
        </nav>
    );
}