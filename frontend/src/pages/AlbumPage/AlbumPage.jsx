import React, { useEffect, useState } from 'react';
import './AlbumPage.css';
import { useParams } from 'react-router-dom';
import { Separador } from '../../components/Separador';
import { BotonsAlbum } from '../../components/BotonsAlbum/BotonsAlbum';
import { Rating } from 'react-simple-star-rating'

export const AlbumPage = () => {
    const albumId = useParams();
    const [album, setAlbum] = useState([]);
    const [userAlbums, setUserAlbums] = useState([]);
    const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'));
    const [perfilInfo, setPerfilInfo] = useState(JSON.parse(localStorage.getItem('perfil_info')));
    const [loading1, setLoading1] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [favorits, setFavorits] = useState(false);
    const [pendents, setPendents] = useState(false);
    const [escoltats, setEscoltats] = useState(false);
    const [enPropietat, setEnPropietat] = useState(false);
    const [rating, setRating] = useState(0)

    const fetchAlbum = async () => {
        const result = await fetch(`https://api.spotify.com/v1/albums/${albumId.id}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        const data = await result.json();
        console.log('data', data);
        setAlbum(data);
        setLoading1(false);
    };

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

    useEffect(() => {
        fetchAlbum();
        fetchUserAlbums();
    }, [accessToken, albumId]);

    const handleRating = (rate) => {
        setRating(rate)
    }

    return (
        <div className='songPage'>
            <div className="container-xxl songContainer">
                {
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
                                    <div className='songInfo-rating-container'>
                                        <div className="songInfo">
                                            <h1>{album.name}</h1>
                                            <h2 className='albumArtist'>{album.artists[0].name}</h2>
                                            <h4 className='albumYear'>{album.release_date.length > 4 ? album.release_date.substring(0, 4) : album.release_date}</h4>
                                        </div>
                                        <div className='rating-container'>
                                            <div className='rating-column'>
                                                <Rating
                                                    onClick={handleRating}
                                                    transition={true}
                                                    allowFraction={true}
                                                    fillColor='#24d863'
                                                    size={50}
                                                />
                                                <h4 className='rating-text'>Puntuació</h4>
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
                        </>
                    )
                }
            </div>
        </div>
    )
}
