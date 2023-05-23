import React, { useState, useEffect } from 'react'
import './PerfilPageHeader.css'
import { NavLink, useNavigate } from 'react-router-dom';

export const PerfilPageHeader = (props) => {
    const { userAlbums } = props;
    const perfilInfo = JSON.parse(localStorage.getItem('perfil_info'));
    const navigate = useNavigate();

    return (
        <div className='perfilPage'>
            <div className="container-xxl perfilContainer">
                <div className="header-perfil shadow-sm">
                    <div className='perfil-imatge-nom'>
                        <div className="perfilImage">
                            <img src={perfilInfo.images[0].url} alt="Perfil image" className='perfilImage-img' />
                        </div>
                        <div className="perfilName">
                            <h1>{perfilInfo.display_name}</h1>
                        </div>
                    </div>
                    <div className='user-stats'>
                        <div className="counter favorits-counter">
                            <h5>Favorits</h5>
                            <h3 onClick={() => navigate('/perfil/favorits')}>{userAlbums.favorits.length}</h3>
                        </div>
                        <div className="counter escoltats-counter">
                            <h5>Escoltats</h5>
                            <h3 onClick={() => navigate('/perfil/escoltats')}>{userAlbums.escoltats.length}</h3>
                        </div>
                        <div className="counter pendents-counter">
                            <h5>Pendents</h5>
                            <h3 onClick={() => navigate('/perfil/pendents')}>{userAlbums.pendents.length}</h3>
                        </div>
                        <div className="counter enPropietat-counter">
                            <h5>En propietat</h5>
                            <h3 onClick={() => navigate('/perfil/enpropietat')}>{userAlbums.enPropietat.length}</h3>
                        </div>
                    </div>
                </div>
                <div className='menu-links shadow-sm'>
                    <NavLink to='/perfil/favorits' className={(link) => link.isActive ? "link_actiu" : "link "}>
                        <h5>Favorits</h5>
                    </NavLink>
                    <NavLink to='/perfil/escoltats' className={(link) => link.isActive ? "link_actiu" : "link"}>
                        <h5>Escoltats</h5>
                    </NavLink>
                    <NavLink to='/perfil/pendents' className={(link) => link.isActive ? "link_actiu" : "link"}>
                        <h5>Pendents</h5>
                    </NavLink>
                    <NavLink to='/perfil/enpropietat' className={(link) => link.isActive ? "link_actiu" : "link"}>
                        <h5>En propietat</h5>
                    </NavLink>
                    <NavLink to='/perfil/puntuacions' className={(link) => link.isActive ? "link_actiu" : "link"}>
                        <h5>Puntuacions</h5>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}
