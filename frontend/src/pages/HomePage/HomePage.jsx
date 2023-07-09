import React, { useContext, useEffect, useState } from 'react';
import './HomePage.css';
import { LlistaCancons } from '../../components/LlistaCancons/LlistaCancons';
import { Separador } from '../../components/Separador/Separador';
import idiomas from '../../config/language.json';
import { IdiomaContext } from '../../context/IdiomaContext';

// Pàgina d'inici
const HomePage = () => {
  const perfilInfo = JSON.parse(localStorage.getItem('perfil_info'));
  const [greeting, setGreeting] = useState('');
  const { idioma } = useContext(IdiomaContext);

  // Funció perque segons el moment del dia, es mostri un missatge de benvinguda o un altre
  useEffect(() => {
    const currentHour = new Date().getHours();
    let greetingText = '';
    if (currentHour >= 6 && currentHour < 12) {
      greetingText = idiomas[idioma].HomePage.titol1;
    } else if (currentHour >= 12 && currentHour < 21) {
      greetingText = idiomas[idioma].HomePage.titol2;
    } else {
      greetingText = idiomas[idioma].HomePage.titol3;
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
      <LlistaCancons titol={idiomas[idioma].HomePage.mesEscoltades} llista="songsEscoltades" />
      <Separador />
      <LlistaCancons titol={idiomas[idioma].HomePage.recomenades} llista="songsRecomenades" />
      <Separador />
      <LlistaCancons titol={idiomas[idioma].HomePage.llencaments} llista="newReleases" />
      <Separador />
    </div>
  );
};

export default HomePage;
