import React, { useEffect, useState } from 'react';
import './AlbumPage.css';
import { useParams } from 'react-router-dom';
import { Separador } from '../../components/Separador';

export const AlbumPage = () => {
    const albumId = useParams();
    const [album, setAlbum] = useState([]);
    const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'));
    const [loading, setLoading] = useState(true);

    const fetchSong = async (albumId) => {
        const result = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        const data = await result.json();
        console.log('data', data)
        setAlbum(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchSong(albumId.id);
    }, [accessToken]);


    return (
        <div className='songPage'>
            <div className="container-xxl songContainer">
                {
                    loading ? <h1>Loading...</h1> : (
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
                                    <button className="btn btn-danger">Favorits</button>
                                    <button className="btn btn-primary">Escoltar després</button>
                                    <button className="btn btn-primary">Escoltats</button>
                                    <button className="btn btn-primary">En propietat</button>
                                </div>
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
