import React from 'react';
import { NavLink, useLocation } from "react-router-dom";
import './Navbar.css';

export const Navbar = () => {
    const location = useLocation();

    return (
        <nav className="navbar">
            <a className="navbar-brand" href='/'>
                <img src={'/assets/img/logo.png'} alt="Imagen de ciudad" />
            </a>
            <h2 className='titulo'>MusicLogr</h2>
            <div className="links-container">
                <NavLink exact to="/" className={(link) => link.isActive || location.pathname.includes("buscar") ? "link_activo" : "link"}>Buscar</NavLink>
                <NavLink to="/historial" className={(link) => link.isActive ? "link_activo" : "link"}>Historial</NavLink>
            </div>
        </nav>
    );
}