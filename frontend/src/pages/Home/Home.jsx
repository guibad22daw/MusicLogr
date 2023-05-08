import React, { useEffect, useState } from 'react';
import useAuth from '../../services/useAuth';
import './Home.css';

export const Home = () => {
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'));
  const [topSongs, setTopSongs] = useState([]);
  const [recommendedSongs, setRecommendedSongs] = useState([]);

  const fetchTopSongs = async (accessToken) => {
    const result = await fetch("https://api.spotify.com/v1/me/top/tracks?limit=5", {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    const data = await result.json();
    setTopSongs(data.items);
    const topSongIds = data.items.map((song) => song.id).join(',');
    const recommendedResult = await fetch(`https://api.spotify.com/v1/recommendations?limit=5&seed_tracks=${topSongIds}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    const recommendedData = await recommendedResult.json();
    setRecommendedSongs(recommendedData.tracks);
    setLoading(false);
  };

  useEffect(() => {
    fetchTopSongs(accessToken);
  }, [accessToken]);

  return (
    loading ? <h1>Loading...</h1> : (
      <div className='homeContainer'>
        <div className='top-songs'>
          <h2 className='titol'>Cançons més escoltades últimament</h2>
          <div className='songs-container'>
            {
              topSongs.map((song, index) => {
                return (
                  <div className='song' key={index}>
                    <div className='song-details'>
                      <img className='song-img' src={song.album.images[0].url} alt='Song' />
                      <div className='song-info'>
                        <h3 className='song-name'>{song.name}</h3>
                        <h4 className='song-artist'>{song.artists[0].name}</h4>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className='recommended-songs'>
          <h2 className='titol'>Cançons recomanades</h2>
          <div className='songs-container'>
            {
              recommendedSongs.map((song, index) => {
                return (
                  <div className='song' key={index}>
                    <div className='song-details'>
                      <img className='song-img' src={song.album.images[0].url} alt='Song' />
                      <div className='song-info'>
                        <h3 className='song-name'>{song.name}</h3>
                        <h4 className='song-artist'>{song.artists[0].name}</h4>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    )
  );
};
