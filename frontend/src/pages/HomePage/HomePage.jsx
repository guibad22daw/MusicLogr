import React, { useEffect, useState } from 'react';
import './HomePage.css';
import { LlistaCancons } from '../../components/LlistaCancons/LlistaCancons';
import { Separador } from '../../components/Separador';
import { Carregant } from '../../components/Carregant/Carregant';

export const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [perfilInfo, setPerfilInfo] = useState(JSON.parse(localStorage.getItem('perfil_info')));
  const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'));
  const [topUserSongs, setTopUserSongs] = useState([]);
  const [recommendedSongs, setRecommendedSongs] = useState([]);
  const [greeting, setGreeting] = useState('');

  const fetchTopUserSongs = async (accessToken) => {
    const result = await fetch("https://api.spotify.com/v1/me/top/tracks?limit=5", {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    const data = await result.json();
    setTopUserSongs(data.items);
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
    fetchTopUserSongs(accessToken);

    const currentHour = new Date().getHours();
    let greetingText = '';
    if (currentHour >= 6 && currentHour < 12) {
      greetingText = 'Bon dia';
    } else if (currentHour >= 12 && currentHour < 21) {
      greetingText = 'Bona tarda';
    } else {
      greetingText = 'Bona nit';
    }
    setGreeting(greetingText);
  }, [accessToken]);

  return (
    <div className='container-xxl homeContainer'>
      {
        <>
          <Separador height="15px" />
          <div className='titolHome'>
            <h1>{greeting}, {perfilInfo.display_name}</h1>
          </div>
          <Separador />
          <LlistaCancons dades={topUserSongs} loading={loading} titol="Cançons més escoltades" />
          <Separador />
          <LlistaCancons dades={recommendedSongs} loading={loading} titol="Cançons recomanades" />
          <Separador />
        </>
      }
    </div>
  );
};
