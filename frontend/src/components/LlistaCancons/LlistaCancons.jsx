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
    const [topUserSongs, setTopUserSongs] = useState([]);
    const [recommendedSongs, setRecommendedSongs] = useState([]);
    const [newReleases, setNewReleases] = useState([]);
    const [albumMap, setAlbumMap] = useState([]);

    const fetchTopUserSongs = async () => {
        const result = await fetch("https://api.spotify.com/v1/me/top/tracks?limit=5", {
            method: "GET",
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        const data = await result.json();
        setTopUserSongs(data.items);

        if (llista == 'songsEscoltades') {
            setAlbumMap(data.items);
            setLoading(false);
        } else if (llista == 'songsRecomenades') {
            fetchRecommendedSongs(data.items);
        } else if (llista == 'newReleases') {
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
        setRecommendedSongs(recommendedData.tracks);
        setAlbumMap(recommendedData.tracks);
        setLoading(false);
    };

    const fetchNewReleases = async () => {
        const recommendedResult = await fetch(`https://api.spotify.com/v1/browse/new-releases?country=ES&limit=5`, {
            method: "GET",
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        const recommendedData = await recommendedResult.json();
        setNewReleases(recommendedData.albums.items);
        console.log('recommended :>> ', recommendedData.albums.items);
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
                            albumMap.length == 0 ? <h2>No hi ha cançons per recomanar</h2> : (
                                albumMap.map((song, index) => {
                                    console.log('song :>> ', song);
                                    return (
                                        <div className='song shadow-sm' key={index}>
                                            <div className='song-details' onClick={() => navigate(`/album/${song.album.id}`)}>
                                                <LazyLoadImage src={song.album == undefined ? song.images[0].url : song.album.images[0].url } width={200} className='song-img' alt="Song" effect="blur" />
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
