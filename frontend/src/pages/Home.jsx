import Cookies from 'js-cookie';
import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Switch, Route, useNavigate} from 'react-router-dom';

export const Home = () => {
    const [token, setToken] = useState(Cookies.get('spotifyAuthToken') || '');

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