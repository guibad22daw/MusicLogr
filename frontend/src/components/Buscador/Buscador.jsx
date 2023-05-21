import React, { useState } from 'react';
import './Buscador.css';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { useNavigate } from 'react-router-dom';

export const Buscador = () => {
    const accessToken = localStorage.getItem('access_token');
    const [sugestions, setSugestions] = useState([]);
    const navigate = useNavigate();

    const estilsBuscador = {
        backgroundColor: "rgb(45, 45, 45)", lineColor: "grey", color: "white", border: "none", hoverBackgroundColor: "rgb(60, 60, 60)"
    }

    const handleOnSearch = async (string, results) => {
        const result = await fetch(`https://api.spotify.com/v1/search?q=${string}&type=album&limit=10`, {
            method: "GET",
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        const data = await result.json();
        let sugestionsFetch = [];
        data.albums.items.forEach((item, index) => {
            console.log('item', item);
            sugestionsFetch.push({ id: index, name: item.name, artist: item.artists[0].name, albumId: item.id})
        })
        setSugestions(sugestionsFetch);
    }

    const handleOnHover = (result) => {
        // the item hovered
        console.log(result)
    }

    const handleOnSelect = (item) => {
        window.location.href = `/album/${item.albumId}`;
    }

    const handleOnFocus = () => {

    }

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
            <div style={{ width: 280 }}>
                <ReactSearchAutocomplete
                    items={sugestions}
                    onSearch={handleOnSearch}
                    onHover={handleOnHover}
                    onSelect={handleOnSelect}
                    onFocus={handleOnFocus}
                    autoFocus
                    formatResult={formatResult}
                    styling={estilsBuscador}
                    placeholder='Cercar àlbums...'
                    fuseOptions={{shouldSort:false, findAllMatches:true, distance: 1000, threshold: 100, keys: ["name"]}}
                />
            </div>
        </div>
    )


}
