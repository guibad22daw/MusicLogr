import React, { useState } from 'react';
import './Buscador.css';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { useNavigate } from 'react-router-dom';

// Component Buscador
export const Buscador = (props) => {
    // Obté l'access token emmagatzemat al local storage
    const accessToken = localStorage.getItem('access_token');

    // Estat local per emmagatzemar les suggerències de cerca
    const [sugestions, setSugestions] = useState([]);

    // Utilitza el hook useNavigate per a la navegació a la pàgina de l'àlbum
    const navigate = useNavigate();

    // Estils personalitzats per al component de cerca
    const estilsBuscador = {
        backgroundColor: "rgb(45, 45, 45)", lineColor: "grey", color: "white", border: "none", hoverBackgroundColor: "rgb(60, 60, 60)"
    }

    // Funció que s'executa en realitzar una cerca
    const handleOnSearch = async (string, results) => {
        // Realitza una crida a l'API de Spotify per obtenir els àlbums corresponents a la cerca
        const result = await fetch(`https://api.spotify.com/v1/search?q=${string}&type=album&limit=10`, {
            method: "GET",
            headers: { Authorization: `Bearer ${accessToken}` }
        });

        if(result.status == 401) {
            window.location.href = `/login?message=${encodeURIComponent("error")}`;
            return;
        }
        
        // Processa les dades rebudes i actualitza les suggerències de cerca
        const data = await result.json();
        let sugestionsFetch = [];
        data.albums.items.forEach((item, index) => {
            sugestionsFetch.push({ id: index, name: item.name, artist: item.artists[0].name, albumId: item.id})
        })
        setSugestions(sugestionsFetch);
    }

    // Funció que s'executa en seleccionar una suggerència de cerca
    const handleOnSelect = (item) => {
        window.location.href = `/album/${item.albumId}`; 
    }

    // Funció per a formatar el resultat de les suggerències de cerca
    const formatResult = (item) => {
        let albumName = item.name.length > 25 ? item.name.substring(0, 25) + "..." : item.name;

        return (
            <>
                <span style={{ display: 'block', textAlign: 'left' }}>{albumName}</span>
                <span style={{ display: 'block', textAlign: 'left', color: "rgb(120, 120, 120)"}}>{item.artist}</span>
            </>
        )
    }

    return (
        <div className='buscador-container'>
            <div className='buscador-input'>
                <ReactSearchAutocomplete
                    items={sugestions}
                    onSearch={handleOnSearch}
                    onSelect={handleOnSelect}
                    formatResult={formatResult}
                    styling={estilsBuscador}
                    placeholder={props.textPlaceholder}
                    fuseOptions={{shouldSort:false, findAllMatches:true, distance: 1000, threshold: 100, keys: ["name"]}}
                    showNoResultsText="Sense resultats"
                    onSubmit={() => navigate('/')}
                />
            </div>
        </div>
    )


}
