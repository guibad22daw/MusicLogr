import React, { useEffect, useState } from 'react';
import './HomePage.css';
import { LlistaCancons } from '../../components/LlistaCancons/LlistaCancons';
import { Separador } from '../../components/Separador/Separador';

// Pàgina d'inici
const HomePage = () => {
  const perfilInfo = JSON.parse(localStorage.getItem('perfil_info'));
  const [greeting, setGreeting] = useState('');

  // Funció perque segons el moment del dia, es mostri un missatge de benvinguda o un altre
  useEffect(() => {
    const currentHour = new Date().getHours();
    let greetingText = '';
    if (currentHour >= 6 && currentHour < 12) {
      greetingText = 'Bon dia';
    } else if (currentHour >= 12 && currentHour < 21) {
      greetingText = 'Bona tarda';
    } else {
      greetingText = 'Bona nit';
    }
    setGreeting(greetingText);
  }, []);

  return (
    <div className='container homeContainer'>
      <Separador height="10px" />
      <div className='titolHome'>
        <h1>{greeting}, {perfilInfo.display_name}</h1>
      </div>
      <Separador height="35px" />
      <LlistaCancons titol="Cançons més escoltades" llista="songsEscoltades" />
      <Separador />
      <LlistaCancons titol="Cançons recomanades" llista="songsRecomenades" />
      <Separador />
      <LlistaCancons titol="Nous llançaments" llista="newReleases" />
      <Separador />
    </div>
  );
};

export default HomePage;
