import React, { useContext, useEffect, useState } from 'react';
import { Buscador } from '../Buscador/Buscador';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import { RiArrowDropDownLine, RiArrowDropLeftLine } from 'react-icons/ri';
import idiomas from '../../config/language.json';
import { IdiomaContext } from '../../context/IdiomaContext';

// Component Navbar
export const Navbar = () => {
    // Defineix variables d'estat
    const perfilInfo = JSON.parse(localStorage.getItem('perfil_info'));
    const [loading, setLoading] = useState(true);
    const [showDropdown, setShowDropdown] = useState(false)
    const { idioma } = useContext(IdiomaContext);
    const navigate = useNavigate();

    // Funció per gestionar el clic de logout
    const logoutClickHandler = () => {
        setShowDropdown(false);
        localStorage.removeItem('access_token');
        localStorage.removeItem('perfil_info');
        window.location.href = '/';
    }

    // Funció per gestionar el clic del perfil d'usuari
    const perfilUsuariClickHandler = () => {
        setShowDropdown(false);
        navigate('/perfil');
    }

    // Funció per mostrar o amagar el desplegable del perfil d'usuari
    const showDropdownHandler = () => {
        setShowDropdown(!showDropdown);
    }

    // Renderitza el component
    return (
        <nav className="container navbar">
            <div className='buscador'>
                <Buscador textPlaceholder={idiomas[idioma].Navbar.buscador}/>
            </div>
            <div className='logo-container flex-grow basis-0'>
                <img src='/assets/img/logo.png' className='logo' alt='Logo' onClick={() => {
                    navigate('/home');
                    setShowDropdown(false);
                }} />
            </div>

            <div className='perfil-usuari'>
                {
                    // Comprova l'estat de càrrega i la informació del perfil
                    loading && perfilInfo.length == 0 ? "" : (
                        <>
                            <h5 className='nom-perfil'>{perfilInfo.display_name}</h5>
                            <img className='foto-perfil' src={perfilInfo.images[0] ? perfilInfo.images[0].url : '/assets/img/userAlt.png'} alt='Foto de perfil' onClick={perfilUsuariClickHandler} />
                            <div className="user-nav" style={showDropdown ? { visibility: "visible", opacity: 1, top: "2px" } : {}}>
                                <ul>
                                    <li onClick={perfilUsuariClickHandler}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>{idiomas[idioma].Navbar.perfil}</li>
                                    <li onClick={logoutClickHandler}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1DB954" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3" /></svg>{idiomas[idioma].Navbar.tancarSessio}</li>
                                </ul>
                            </div>
                            {
                                showDropdown ? (
                                    <RiArrowDropLeftLine color='white' size="1.65em" className='dropdown-arrow' onClick={showDropdownHandler} />
                                ) : (
                                    <RiArrowDropDownLine color='white' size="1.65em" className='dropdown-arrow' onClick={showDropdownHandler} />
                                )
                            }
                        </>
                    )
                }
            </div>
        </nav>
    );
}