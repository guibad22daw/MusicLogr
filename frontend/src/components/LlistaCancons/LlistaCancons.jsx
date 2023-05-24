import React, { useEffect, useState } from 'react';
import './LlistaCancons.css';
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from 'react-router-dom';
import { Carregant } from '../Carregant/Carregant';

export const LlistaCancons = (props) => {
    const navigate = useNavigate();
    const { titol, llista } = props;
    const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'));
    const [loading, setLoading] = useState(true);
    const [albumMap, setAlbumMap] = useState([]);
    const [noResultsText, setNoResultsText] = useState('')

    // Recupera les cançons més escoltades de l'usuari
    const fetchTopUserSongs = async () => {
        const result = await fetch("https://api.spotify.com/v1/me/top/tracks?limit=5", {
            method: "GET",
            headers: { Authorization: `Bearer ${accessToken}` }
        });

        if(result.status == 401) {
            window.location.href = `/login?message=${encodeURIComponent("error")}`;
            return;
        }

        const data = await result.json();

        if (llista == 'songsEscoltades') {
            setAlbumMap(data.items);
            setLoading(false);
            setNoResultsText('No hi ha cançons escoltades');
        } else if (llista == 'songsRecomenades') {
            fetchRecommendedSongs(data.items);
            setNoResultsText('No hi ha cançons per recomanar');
        } else if (llista == 'newReleases') {
            setNoResultsText('No hi ha nous llançaments');
            fetchNewReleases();
        }
    };

    const fetchRecommendedSongs = async (data) => {
        const topSongIds = data.map((song) => song.id).join(',');
        const recommendedResult = await fetch(`https://api.spotify.com/v1/recommendations?limit=5&seed_tracks=${topSongIds}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        const recommendedData = await recommendedResult.json();
        setAlbumMap(recommendedData.tracks);
        setLoading(false);
    };

    const fetchNewReleases = async () => {
        const recommendedResult = await fetch(`https://api.spotify.com/v1/browse/new-releases?country=ES&limit=5`, {
            method: "GET",
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        const recommendedData = await recommendedResult.json();
        setAlbumMap(recommendedData.albums.items);
        setLoading(false);
    };

    useEffect(() => {
        setLoading(true);
        fetchTopUserSongs();
    }, [accessToken, llista])


    return (
        <div className='top-songs'>
            <div className='top-songs-header'>
                <h2 className='titol'>{titol}</h2>
            </div>
            {
                loading ? <Carregant height="340px" /> : (
                    <div className='songs-container'>
                        {
                            albumMap.length == 0 ? <h2>{noResultsText}</h2> : (
                                albumMap.map((song, index) => {
                                    return (
                                        <div className='song shadow-sm' key={index}>
                                            <div className='song-details' onClick={() => navigate(`/album/${song.album == undefined ? song.id : song.album.id}`)}>
                                                <LazyLoadImage src={song.album == undefined ? song.images[0].url : song.album.images[0].url} className='song-img' alt="Song" effect="blur" />
                                                <div className='song-info'>
                                                    <h3 className='song-name'>{song.name}</h3>
                                                    <h4 className='song-artist'>{song.artists[0].name}</h4>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            )
                        }
                    </div>
                )
            }
        </div>
    )
}
