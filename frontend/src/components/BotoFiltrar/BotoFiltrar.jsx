import React from 'react'
import { BiFilter } from 'react-icons/bi';
import { HiSortAscending, HiSortDescending } from 'react-icons/hi';
import './BotoFiltrar.css';

export const BotoFiltrar = (props) => {
    const { showDropdown, setShowDropdown, ordenarHandler, idioma } = props;

  return (
    <div className='artist-filtrarContainer' onClick={() => setShowDropdown(!showDropdown)} style={showDropdown ? { backgroundColor: "white", color: "black" } : {}}>
    <BiFilter style={{ color: showDropdown ? "black" : "white" }} size="1.5em" />
    <h6 className='artist-albumsTitle'>{idioma.text}</h6>
    <div className="filtrar-div" style={showDropdown ? { visibility: "visible", opacity: 1, top: "2px" } : {}} >
        <ul>
            <li onClick={() => ordenarHandler("asc")}><HiSortAscending color='white' size="1.3em" />{idioma.asc}</li>
            <li onClick={() => ordenarHandler("desc")}><HiSortDescending color='white' size="1.3em" />{idioma.desc}</li>
        </ul>
    </div>
</div>
  )
}
