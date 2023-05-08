import React, { useEffect, useState } from 'react';
import useAuth from '../../services/useAuth';
import './Home.css';

export const Home = () => {
  const [loading, setLoading] = useState(true)
  const [accesToken, setAccesToken] = useState(localStorage.getItem('access_token'));
  const [topSongs, setTopSongs] = useState([]);

  const fetchTopSongs = async (accesToken) => {
    console.log('accesToken', accesToken)
    const result = await fetch("https://api.spotify.com/v1/me/top/artists?limit=5", {
      method: "GET", headers: { Authorization: `Bearer ${accesToken}` }
    });
    setTopSongs(await result.json());
    console.log('result.json()', result.json())
    setLoading(false);
  }

  useEffect(() => {
    fetchTopSongs(accesToken);
  }, [accesToken]);

  return (
    loading ? <h1>Loading...</h1> : (
      <p>{JSON.stringify(topSongs)}</p>
      // <div className='container'>
      //   <div className='top-songs'>
      //     <h1 className='titol'>Top Songs</h1>
      //     <div className='songs-container'>
      //       {
      //         topSongs.map((song, index) => {
      //           return (
      //             <div className='song' key={index}>
      //               <img className='song-img' src={song.album.images[0].url} alt='Song' />
      //               <div className='song-info'>
      //                 <h3 className='song-name'>{song.name}</h3>
      //                 <h4 className='song-artist'>{song.artists[0].name}</h4>
      //               </div>
      //             </div>
      //           )
      //         })
      //       }
      //     </div>
      //   </div>
      // </div>
    )
  );
}