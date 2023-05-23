import React from "react";
import "./LoginPage.css";

export const LoginPage = () => {
  const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${import.meta.env.VITE_CLIENT_ID}&response_type=code&redirect_uri=${import.meta.env.VITE_REDIRECT_URI}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-top-read`;

  return (
    <div className="login-page">
      <div className="login-contingut">
        <div className="title-container">
          <img src="/assets/img/logo.png" />
          <h1 className="titol">Benvingut a MusicLogr</h1>
          <h5 className="subtitol">Tingues el control de la teva música</h5>
        </div>
        <div className="spotify-btn" onClick={() => window.location.href=AUTH_URL}>
          <div className="spotify-icon-wrapper">
            <img className="spotify-icon-svg" src="/assets/img/spotify-logo.png" />
          </div>
          <p className="btn-text"><b>Inicia sessió amb Spotify</b></p>
        </div>
      </div>
    </div>
  );
};