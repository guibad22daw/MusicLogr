import { useEffect, useState } from 'react';
import useAuth from '../../services/useAuth';
import { useNavigate } from 'react-router-dom';

export const PostLoginPage = () => {
  const access_token = useAuth();
  const [perfilInfo, setPerfilInfo] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProfile(access_token) {
      const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${access_token}` }
      });
      const data = await result.json();
      setPerfilInfo(data);
      localStorage.setItem('perfil_info', JSON.stringify(data));

      fetch(`${import.meta.env.VITE_BACKEND_URL}/saveUser`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      }).then((response) => {
        if (response.ok) {
          navigate("/home")
        } else {
          navigate('/');
        }
      })

    }
    if (access_token !== undefined) {
      fetchProfile(access_token);
      localStorage.setItem('access_token', access_token);
    }
  }, [access_token]);

}