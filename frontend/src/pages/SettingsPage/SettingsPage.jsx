import React, { useContext, useEffect, useState } from 'react';
import './SettingsPage.css';
import idiomas from '../../config/language.json';
import { IdiomaContext } from '../../context/IdiomaContext';
import { HiSortAscending, HiSortDescending } from 'react-icons/hi';
import { RiArrowDropDownLine, RiArrowDropLeftLine } from 'react-icons/ri';

const SettingsPage = () => {
  const { idioma, setIdioma } = useContext(IdiomaContext);
  const [textDropdown, setTextDropdown] = useState('')
  const [showDropdown, setShowDropdown] = useState(false);

  const selectIdiomaHandler = (lang) => {
    console.log('lang', lang)
    setIdioma(lang);
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
      <div className='content1 mt-4'>
        <div className='opcio'>
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
    </div>
  )
}

export default SettingsPage