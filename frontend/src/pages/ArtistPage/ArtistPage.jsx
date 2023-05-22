import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './ArtistPage.css'
import { Carregant } from '../../components/Carregant/Carregant';

export const ArtistPage = () => {
    const { artistId } = useParams();
    const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'));
    const [loading1, setLoading1] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [artist, setArtist] = useState([]);
    const [artistAlbums, setArtistAlbums] = useState([]);

    const fetchArtist = async () => {
        const result = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        const data = await result.json();
        console.log('artist', data);
        setArtist(data);
        setLoading1(false);
    };

    const fetchArtistAlbums = async () => {
        const result = await fetch(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
            method: "GET",
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        const data = await result.json();
        console.log('album', data);
        setArtistAlbums(data)
        setLoading2(false);
    };

    useEffect(() => {
        fetchArtist();
        fetchArtistAlbums();
    }, [artistId])

    return (
        <div className='artistPage'>
            {
                loading1 || loading2 ? <Carregant /> : (
                    <div className="container-xxl artistContainer">
                        <div className='header'>
                            <div className="bg-header" style={{ backgroundImage: `url("${artist.images[0].url}")` }}></div>
                            <div className="artistInfo-container">
                                <div className='artistImage'>
                                    <img src={artist.images[0].url} alt="" />
                                </div>
                                <div className='artist-info'>
                                    <h1>{artist.name}</h1>
                                    <h4>{artist.followers.total} <label style={{ fontSize: "17px" }}>SEGUIDORS</label></h4>
                                </div>
                            </div>
                        </div>
                        <div className='artist-albumsContainer'>

                        </div>
                    </div>
                )

            }
        </div>
    )
}
