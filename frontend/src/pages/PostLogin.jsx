import Cookies from 'js-cookie';
import React, {useEffect, useState} from 'react';

function PostLogin(props) {
  const navigate = useNavigate();

  useEffect(() => {
    async function getToken() {
      let userToken = await Cookies.get('spotifyAuthToken');
      setToken(userToken)
      console.log('token :>> ', token);
    }
    getToken();
  }, [token])
  

  return (
    <div>
      <h1>Benvigut/da :D</h1>
      <p>Hola {props.displayName}!</p>
      <p>Tu token de Spotify es: {token}</p>
    </div>
  );
}

export default PostLogin;