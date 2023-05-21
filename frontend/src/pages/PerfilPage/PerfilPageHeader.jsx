import React, { useState, useEffect } from 'react'
import './PerfilPageHeader.css'
import { useNavigate } from 'react-router-dom';

export const PerfilPageHeader = () => {
    const [userAlbums, setUserAlbums] = useState([]);
    const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'));
    const [perfilInfo, setPerfilInfo] = useState(JSON.parse(localStorage.getItem('perfil_info')));
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchUserAlbums = async () => {
        const result = await fetch(`${import.meta.env.VITE_BACKEND_URL}/getUserAlbums`, {
            method: "GET",
            headers: { 'x-email': perfilInfo.email }
        });
        const data = await result.json();
        setUserAlbums(data);
        localStorage.setItem('albums_user', JSON.stringify(data));
        setLoading(false);
    };

    useEffect(() => {
        fetchUserAlbums();
    }, [accessToken, perfilInfo]);

    return (
        <div className='perfilPage'>
            <div className="container-xxl perfilContainer">
                <div className="header">
                    <div className='perfil-imatge-nom'>
                        <div className="perfilImage">
                            <img src={perfilInfo.images[0].url} alt="Perfil image" className='perfilImage-img' />
                        </div>
                        <div className="perfilName">
                            <h1>{perfilInfo.display_name}</h1>
                        </div>
                    </div>
                    <div className='user-stats'>
                        {loading ? "" :
                            (
                                <>
                                    <div className="escoltats-counter">
                                        <h5>Escoltats</h5>
                                        <h3>{userAlbums.escoltats.length}</h3>
                                    </div>
                                    <div className="favorits-counter">
                                        <h5>Favorits</h5>
                                        <h3>{userAlbums.favorits.length}</h3>
                                    </div>
                                    <div className="pendents-counter">
                                        <h5>Pendents</h5>
                                        <h3>{userAlbums.pendents.length}</h3>
                                    </div>
                                    <div className="enPropietat-counter">
                                        <h5>En propietat</h5>
                                        <h3>{userAlbums.enPropietat.length}</h3>
                                    </div>
                                </>
                            )
                        }
                    </div>
                </div>
                <div className='menu-links'>
                    <div className="link" onClick={() => navigate('/perfil/escoltats')}>
                        <h5>Escoltats</h5>
                    </div>
                    <div className="link" onClick={() => navigate('/perfil/favorits')}>
                        <h5>Favorits</h5>
                    </div>
                    <div className="link" onClick={() => navigate('/perfil/pendents')}>
                        <h5>Pendents</h5>
                    </div>
                    <div className="link" onClick={() => navigate('/perfil/enpropietat')}>
                        <h5>En propietat</h5>
                    </div>
                </div>
            </div>
        </div>
    )
    /* {
loading1 || loading2 ? <h1>Loading...</h1> : (
    <>
        <div className='header'>
            <div className="bg-header" style={{ backgroundImage: `url("${album.images[0].url}")` }}></div>
            <div className="bg-header-overlay"></div>
        </div>
        <div className="content">
            <div className="songImageandInfo">
                <div className="songImage">
                    <img src={album.images[0].url} alt="Song image" />
                </div>
                <div className="songInfo">
                    <h1>{album.name}</h1>
                    <h2>{album.artists[0].name}</h2>
                    <h4>{album.release_date}</h4>
                </div>
            </div>
            <Separador />
            <div className='botons-funcions'>
                <button className="btn btn-danger" onClick={(e) => botoHandler(e)} value="favorits">{favorits ? "Treure de favorits" : "Afegir a favorits"}</button>
                <button className="btn btn-primary" onClick={(e) => botoHandler(e)} value="pendents">{pendents ? "Treure de pendent d'escoltar" : "Afegir a pendent d'escoltar"}</button>
                <button className="btn btn-primary" onClick={(e) => botoHandler(e)} value="escoltats">{escoltats ? "Treure d'escoltats" : "Afegir a escoltats"}</button>
                <button className="btn btn-primary" onClick={(e) => botoHandler(e)} value="enPropietat">{enPropietat ? "Treure de en propietat" : "Afegir a en propietat"}</button>
            </div>
            <Separador />
            <div className="songPlayer">
                <iframe src={`https://open.spotify.com/embed/album/${albumId.id}`} width="100%" height="600" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
            </div>
        </div>
    </>
)
} */
}
