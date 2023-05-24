import React, { useEffect, useState } from 'react';
import './AlbumPage.css';
import { useParams } from 'react-router-dom';
import { Separador } from '../../components/Separador';
import { BotonsAlbum } from '../../components/BotonsAlbum/BotonsAlbum';
import { Rating } from 'react-simple-star-rating'
import { Carregant } from '../../components/Carregant/Carregant';
import { TbReload } from 'react-icons/tb';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';

// Mostrar informació de cada àlbum
const AlbumPage = () => {
    // Obtenir l'id de l'àlbum des de la URL i la informació de l'usuari des del localStorage
    const albumId = useParams();
    const perfilInfo = JSON.parse(localStorage.getItem('perfil_info'));

    // Estats per gestionar la informació de l'àlbum, els àlbums de l'usuari, l'access token, l'estat de càrrega i altres
    const [album, setAlbum] = useState([]);
    const [userAlbums, setUserAlbums] = useState([]);
    const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'));
    const [loading1, setLoading1] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [loading3, setLoading3] = useState(true);
    const [favorits, setFavorits] = useState(false);
    const [pendents, setPendents] = useState(false);
    const [escoltats, setEscoltats] = useState(false);
    const [enPropietat, setEnPropietat] = useState(false);
    const [rating, setRating] = useState(0)

    // Funció per obtenir les dades de l'àlbum mitjançant una crida a l'API de Spotify
    const fetchAlbum = async () => {
        const result = await fetch(`https://api.spotify.com/v1/albums/${albumId.id}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${accessToken}` }
        });

        if(result.status == 401) {
            window.location.href = `/login?message=${encodeURIComponent("error")}`;
            return;
        }
    
        const data = await result.json();
        setAlbum(data);
        setLoading1(false);
    };

    // Funció per obtenir els àlbums de l'usuari mitjançant una crida a l'API del backend
    const fetchUserAlbums = async () => {
        const result = await fetch(`${import.meta.env.VITE_BACKEND_URL}/getUserAlbums`, {
            method: "GET",
            headers: { 'x-email': perfilInfo.email }
        });
        const data = await result.json();
        setUserAlbums(data);
        Object.entries(data).forEach(([propietat, valor]) => {
            valor.forEach(element => {
                if (propietat === "favorits") {
                    if (element.albumId === albumId.id) setFavorits(true);
                } else if (propietat === "pendents") {
                    if (element.albumId === albumId.id) setPendents(true);
                } else if (propietat === "escoltats") {
                    if (element.albumId === albumId.id) setEscoltats(true);
                } else if (propietat === "enPropietat") {
                    if (element.albumId === albumId.id) setEnPropietat(true);
                }
            });
        });
        setLoading2(false);
    };

    // Funció per obtenir les puntuacions de l'àlbum
    const fetchRatings = async () => {
        const result = await fetch(`${import.meta.env.VITE_BACKEND_URL}/getRating`, {
            method: "GET",
            headers: { 'x-email': perfilInfo.email, 'x-albumid': albumId.id }
        });
        const data = await result.json();
        setRating(data.rating);
        setLoading3(false);
    };

    // S'executa al carregar el component o quan canvia l'access token o l'id de l'àlbum
    useEffect(() => {
        fetchAlbum();
        fetchUserAlbums();
        fetchRatings();
    }, [accessToken, albumId]);

    // Funció per gestionar la puntuació de l'àlbum
    const handleRating = (rate) => {
        setRating(rate)
        fetch(`${import.meta.env.VITE_BACKEND_URL}/addRating`, {
            method: "POST",
            headers: { 'x-email': perfilInfo.email, 'Content-Type': 'application/json' },
            body: JSON.stringify({ albumId: albumId.id, rating: rate, albumName: album.name, albumArtist: album.artists[0].name, albumYear: album.release_date, albumImage: album.images[0].url })
        }).then((response) => {
            if (response.status === 200) {
                console.log('Rating afegit');
            } else {
                console.log('Error afegint rating');
            }
        });
    }

    // Renderització d'AlbumPage
    return (
        <div className='songPage'>
            {
                loading1 || loading2 || loading3 ? <Carregant height="700px" /> : (
                    <div className="container-xxl songContainer">
                        <div className='header'>
                            <div className="bg-header" style={{ backgroundImage: `url("${album.images[0].url}")` }}></div>
                            <div className="bg-header-overlay"></div>
                        </div>
                        <div className="content">
                            <div className="songImageandInfo">
                                <div className="songImage">
                                    <img src={album.images[0].url} alt="Song image" />
                                </div>
                                <div className='albumInfo-rating-container'>
                                    <div className="albumInfo">
                                        <h1 className='albumName'>{album.name}</h1>
                                        <h2 className='albumArtist' onClick={() => window.location.href = `/artist/${album.artists[0].id}`}>{album.artists[0].name}</h2>
                                        <h4 className='albumYear'>{album.release_date.length > 4 ? album.release_date.substring(0, 4) : album.release_date}</h4>
                                    </div>
                                    <div className='rating-container'>
                                        <div className='rating-column'>
                                            <div className='rating-text'>
                                                <h5>PUNTUACIÓ</h5>
                                                <TbReload color='#929292' size="1.5em" className='reload-icon' onClick={() => handleRating(0)} />
                                            </div>
                                            <Rating
                                                onClick={handleRating}
                                                initialValue={rating}
                                                allowFraction={true}
                                                titleSeparator='sobre'
                                                transition={true}
                                                fillColor='#24d863'
                                                size={50}
                                                emptyColor='#6E6E6E'
                                                showTooltip={true}
                                                tooltipDefaultText='0'
                                                fillIcon={<AiFillStar size={50}/>}
                                                emptyIcon={<AiOutlineStar size={50}/>}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Separador />
                            <BotonsAlbum data={{ favorits, setFavorits, pendents, setPendents, escoltats, setEscoltats, enPropietat, setEnPropietat, album }} />
                            <Separador />
                            <div className="songPlayer">
                                <iframe src={`https://open.spotify.com/embed/album/${albumId.id}`} width="100%" height="600" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                            </div>
                        </div>
                    </div>
                )
            }
            <Separador />
        </div>
    )
}

export default AlbumPage;
