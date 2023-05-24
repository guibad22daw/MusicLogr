import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { Carregant } from '../../components/Carregant/Carregant';
import { Separador } from '../../components/Separador';
import { useFetchArtist } from '../../services/useFetchArtist';
import { ArtistAlbums } from '../../components/ArtistAlbums/ArtistAlbums';
import './ArtistPage.css'
import { BotoFiltrar } from '../../components/BotoFiltrar/BotoFiltrar';

const ArtistPage = () => {
    const { artistId } = useParams();
    const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'));
    const [artistAlbumsSort, setArtistAlbumsSort] = useState("desc");
    const [showDropdown, setShowDropdown] = useState(false);
    const { loading, artist, artistAlbums, setArtistAlbums } = useFetchArtist(artistId, accessToken);

    // Funció per ordenar els àlbums de l'artista
    const ordenarHandler = (string) => {
        setShowDropdown(false);
        if (string === 'asc') {
            if (artistAlbumsSort === 'desc') {
                setArtistAlbumsSort('asc');
                setArtistAlbums(artistAlbums.reverse())
            }
        } else if (string === 'desc') {
            if (artistAlbumsSort === 'asc') {
                setArtistAlbumsSort('desc');
                setArtistAlbums(artistAlbums.reverse())
            }
        }
    }

    return (
        <div className='artistPage'>
            {
                loading ? <Carregant /> : (
                    <div className="container-xxl artistContainer">
                        <div className='artistHeader shadow-sm'>
                            <div className="bg-ArtistHeader" style={{ backgroundImage: `url("${artist.images[0].url}")` }}></div>
                            <div className="artistInfo-container">
                                <div className='artistImage'>
                                    <img src={artist.images[0].url} alt="" />
                                </div>
                                <div className='artist-info'>
                                    <h1>{artist.name}</h1>
                                    <h5>{artist.followers.total} <label>SEGUIDORS</label></h5>
                                </div>
                            </div>
                        </div>
                        <BotoFiltrar showDropdown={showDropdown} setShowDropdown={setShowDropdown} ordenarHandler={ordenarHandler} />
                        <ArtistAlbums artistAlbums={artistAlbums} />
                    </div>
                )

            }
            <Separador />
        </div>
    )
}

export default ArtistPage;
