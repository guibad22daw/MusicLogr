import React from "react";
import "./loginPage.css";
import SpotifyLogo from "./spotifyLogo.png"; // Importa el logotipo de Spotify

export const LoginPage = () => {
  const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${import.meta.env.VITE_CLIENT_ID}&response_type=code&redirect_uri=${import.meta.env.VITE_REDIRECT_URI}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-top-read`;

  return (
    <div className="login-page">
      <div className="title-container">
        <h2>MusicLogr</h2>
      </div>
      <div className="login-container">
        <img src={SpotifyLogo} alt="Spotify Logo" className="spotify-logo" />
        <a href={AUTH_URL} className="login-link">
          Login with Spotify
        </a>
      </div>
    </div>
  );
};