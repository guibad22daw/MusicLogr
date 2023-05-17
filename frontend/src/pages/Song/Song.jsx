import React, { useEffect, useState } from 'react';
import './Song.css';
import { useParams } from 'react-router-dom';
import { Separador } from '../../components/Separador';

export const Song = () => {
    const songId = useParams();
    const [song, setSong] = useState([]);
    const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'));
    const [loading, setLoading] = useState(true);

    const fetchSong = async (songId) => {
        const result = await fetch(`https://api.spotify.com/v1/tracks/${songId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        const data = await result.json();
        console.log('data', data)
        setSong(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchSong(songId.id);
    }, [accessToken]);


    return (
        <div className='songPage'>
            <div className="container-xxl songContainer">
                {
                    loading ? <h1>Loading...</h1> : (
                        <>
                            <div className='header'>
                                <div className="bg-header" style={{ backgroundImage: `url("${song.album.images[0].url}")` }}></div>
                                <div className="bg-header-overlay"></div>
                            </div>
                            <div className="content">
                                <div className="songImageandInfo">
                                    <div className="songImage">
                                        <img src={song.album.images[0].url} alt="Song image" />
                                    </div>
                                    <div className="songInfo">
                                        <h1>{song.name}</h1>
                                        <h2>{song.artists[0].name}</h2>
                                        <h3>{song.album.name}</h3>
                                        <h4>{song.album.release_date}</h4>
                                    </div>
                                </div>
                                <Separador />
                                <div className="songPlayer">
                                    <iframe src={`https://open.spotify.com/embed/track/${songId.id}`} width="100%" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                                </div>
                                <Separador />
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    )
}
