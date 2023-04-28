import React, {useEffect, useState} from 'react';
import useAuth from '../../services/useAuth';

export const Home = () => {
    const code = new URLSearchParams(window.location.search).get('code');
    const access_token = useAuth(code);
    
    return (
      <div>
        <h1>Benvigut/da :D</h1>
        <h2>Acces token: {access_token}</h2>
      </div>
    );
}