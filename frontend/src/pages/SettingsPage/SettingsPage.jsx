import React, { useContext, useEffect, useState } from 'react';
import './SettingsPage.css';
import idiomas from '../../config/language.json';
import { IdiomaContext } from '../../context/IdiomaContext';
import { RiArrowDropDownLine, RiArrowDropLeftLine, RiDeleteBin6Line } from 'react-icons/ri';

const SettingsPage = () => {
  const perfilInfo = JSON.parse(localStorage.getItem('perfil_info'));
  const { idioma, setIdioma } = useContext(IdiomaContext);
  const [textDropdown, setTextDropdown] = useState('')
  const [showDropdown, setShowDropdown] = useState(false);

  const selectIdiomaHandler = (lang) => {
    console.log('lang', lang)
    setIdioma(lang);
  }

  const deleteAccountHandler = () => {
    fetch('http://localhost:8888/deleteAccount', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        headers: { 'x-email': perfilInfo.email }
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.status === 200) {
          logOutHandler();
        }
      }
      )
      .catch(err => {
        console.log(err);
        alert(idiomas[idioma].SettingsPage.errorEsborrant);
      })
  }

  const logOutHandler = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('perfil_info');
    window.location.href = '/';
  }

  useEffect(() => {
    if (idioma === 'es') {
      setTextDropdown('Español');
    } else if (idioma === 'en') {
      setTextDropdown('English');
    } else if (idioma === 'ca') {
      setTextDropdown('Català');
    }
  }, [idioma])

  return (
    <div className='container settingsContainer'>
      <div className='header'>
        <h1>{idiomas[idioma].SettingsPage.titol}</h1>
        <h6 className='mt-1'>{idiomas[idioma].SettingsPage.subtitol}</h6>
      </div>
      <div className='content content1 mt-4'>
        <div className='opcio opcio1'>
          <h5>{idiomas[idioma].SettingsPage.opcio1}</h5>

          <div className='artist-filtrarContainer' onClick={() => setShowDropdown(!showDropdown)} style={showDropdown ? { backgroundColor: "white", color: "black" } : {}}>
            <h6 className='artist-albumsTitle'>{textDropdown}</h6>
            {
              showDropdown ? <RiArrowDropLeftLine style={{ color: showDropdown ? "black" : "white" }} size="1.5em" /> : <RiArrowDropDownLine style={{ color: showDropdown ? "black" : "white" }} size="1.5em" />
            }
            <div className="filtrar-div" style={showDropdown ? { visibility: "visible", opacity: 1, top: "2px" } : {}} >
              <ul>
                <li onClick={() => selectIdiomaHandler("ca")}>Català</li>
                <li onClick={() => selectIdiomaHandler("es")}>Español</li>
                <li onClick={() => selectIdiomaHandler("en")}>English</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className='content content2 mt-5'>
        <div className='opcio opcio2' onClick={deleteAccountHandler}>
          <RiDeleteBin6Line size="1.3em" />
          <h6>{idiomas[idioma].SettingsPage.opcio2}</h6>
        </div>
      </div>
      <div className='content content2 mt-2'>
        <div className='opcio opcio3' onClick={logOutHandler}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1DB954" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3" /></svg>
          <h6>{idiomas[idioma].SettingsPage.tancarSessio}</h6>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage