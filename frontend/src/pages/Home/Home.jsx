import React, { useEffect, useState } from 'react';
import useAuth from '../../services/useAuth';

export const Home = () => {
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState([]);
  const [resultatsBusqueda, setResultatsBusqueda] = useState([]);
  const code = new URLSearchParams(window.location.search).get('code');
  const access_token = useAuth(code);

  useEffect(() => {
    async function fetchProfile(access_token) {
      const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${access_token}` }
      });
      setProfile(await result.json());
      setLoading(false);
    }
    fetchProfile(access_token);
  }, [access_token]);

  const buscarAlbum = async () => {
    const result = await fetch("https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy", {
      method: "GET", headers: { Authorization: `Bearer ${access_token}` }
    });
    console.log('acess_token', access_token);
    setResultatsBusqueda(await result.json());
  }

  return (
    loading ? <h1>Loading...</h1> : (
      <div>
        <h1>Benvigut/da :D</h1>
        <h2>Acces token: {access_token}</h2>
        <h2>Id: {profile.id}</h2>
        <h2>Email: {profile.email}</h2>
        <button onClick={() => buscarAlbum()}>Buscar Album</button>
        <div>{JSON.stringify(resultatsBusqueda)}</div>
      </div>
    )
  );
}