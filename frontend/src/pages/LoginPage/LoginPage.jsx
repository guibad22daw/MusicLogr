import React, { useContext, useEffect } from "react";
import "./LoginPage.css";
import idiomas from '../../config/language.json';
import { IdiomaContext } from '../../context/IdiomaContext';

const LoginPage = () => {
  const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${import.meta.env.VITE_CLIENT_ID}&response_type=code&redirect_uri=${import.meta.env.VITE_REDIRECT_URI}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-top-read`;
  const urlParams = new URLSearchParams(window.location.search);
  const errorMessage = urlParams.get('message');
  const { idioma } = useContext(IdiomaContext);

  useEffect(() => {
    setTimeout(() => {
      if (errorMessage) {
        alert(idiomas[idioma].LoginPage.alert);
      }
    }, 500);
  }, []);

  return (
    <div className="login-page">
      <div className="login-contingut">
        <div className="title-container">
          <img src="/assets/img/logo.png" />
          <h1 className="titol">{idiomas[idioma].LoginPage.titol}</h1>
          <h5 className="subtitol">{idiomas[idioma].LoginPage.subtitol}</h5>
        </div>
        <div className="spotify-btn" onClick={() => window.location.href = AUTH_URL}>
          <div className="spotify-icon-wrapper">
            <img className="spotify-icon-svg" src="/assets/img/spotify-logo.png" />
          </div>
          <p className="btn-text"><b>{idiomas[idioma].LoginPage.login}</b></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;