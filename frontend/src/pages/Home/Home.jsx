import React, { useEffect, useState } from 'react';
import useAuth from '../../services/useAuth';

export const Home = () => {
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState([]);
  const [accesToken, setAccesToken] = useState(localStorage.getItem('access_token'));
  const [resultatsBusqueda, setResultatsBusqueda] = useState([]);

  useEffect(() => {
    async function fetchProfile(accesToken) {
      const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${accesToken}` }
      });
      setProfile(await result.json());
      setLoading(false);
    }
    fetchProfile(accesToken);
  }, [accesToken]);

  const buscarAlbum = async () => {
    const result = await fetch("https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy", {
      method: "GET", headers: { Authorization: `Bearer ${accesToken}` }
    });
    console.log('acess_token', accesToken);
    setResultatsBusqueda(await result.json());
  }

  return (
    loading ? <h1>Loading...</h1> : (
      <div>
        <h1>Benvigut/da :D</h1>
        <h2>Acces token: {accesToken}</h2>
        <h2>Id: {profile.id}</h2>
        <h2>Email: {profile.email}</h2>
        <button onClick={() => buscarAlbum()}>Buscar Album</button>
        <div>{JSON.stringify(resultatsBusqueda)}</div>
      </div>
    )
  );
}