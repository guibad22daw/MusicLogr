import React, { useEffect, useState } from 'react';
import './HomePage.css';
import { LlistaCancons } from '../../components/LlistaCancons/LlistaCancons';
import { Separador } from '../../components/Separador';
import { Carregant } from '../../components/Carregant/Carregant';

const HomePage = () => {
  const [perfilInfo, setPerfilInfo] = useState(JSON.parse(localStorage.getItem('perfil_info')));
  const [greeting, setGreeting] = useState('');

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
    <div className='container-xxl homeContainer'>
      <Separador height="15px" />
      <div className='titolHome'>
        <h1>{greeting}, {perfilInfo.display_name}</h1>
      </div>
      <Separador />
      <LlistaCancons titol="Cançons més escoltades" llista="songsEscoltades" />
      <Separador />
      <LlistaCancons titol="Cançons recomanades" llista="songsRecomenades" />
      <Separador />
      <LlistaCancons titol="Artistes recomanats" llista="newReleases" />
      <Separador />
    </div>
  );
};

export default HomePage;
