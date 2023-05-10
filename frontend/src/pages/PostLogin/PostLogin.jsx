import { useEffect, useState } from 'react';
import useAuth from '../../services/useAuth';

export const PostLogin = () => {
  const access_token = useAuth();
  const [perfilInfo, setPerfilInfo] = useState([]);

  useEffect(() => {
    async function fetchProfile(access_token) {
      const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${access_token}` }
      });
      const data = await result.json();
      setPerfilInfo(data);
      localStorage.setItem('perfil_info', JSON.stringify(data));
      window.location.href = "/home";
    }
    if (access_token !== undefined) {
      fetchProfile(access_token);
      localStorage.setItem('access_token', access_token);
    }
  }, [access_token]);

}