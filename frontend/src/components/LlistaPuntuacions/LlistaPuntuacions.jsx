import React, { useEffect, useState } from 'react'
import './LlistaPuntuacions.css'
import { Rating } from 'react-simple-star-rating';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { BotoFiltrar } from '../BotoFiltrar/BotoFiltrar';

// Component Llistat de puntuacions
export const LlistaPuntuacions = () => {
    // Defineix variables d'estat
    const perfilInfo = JSON.parse(localStorage.getItem('perfil_info'));
    const [loading, setLoading] = useState(true)
    const [userRatings, setUserRatings] = useState([])
    const [showDropdown, setShowDropdown] = useState(false);
    const [artistAlbumsSort, setArtistAlbumsSort] = useState("desc");

    // useEffect per obtenir les puntuacions de l'usuari quan perfilInfo canvia
    useEffect(() => {
        const fetchUserRatings = async () => {
            const result = await fetch(`${import.meta.env.VITE_BACKEND_URL}/getRatings`, {
                method: "GET",
                headers: { 'x-email': perfilInfo.email }
            });
            const data = await result.json();

            setUserRatings(data);
            setLoading(false);
        };
        fetchUserRatings();
    }, [])

    const ordenarHandler = (string) => {
        setShowDropdown(false);
        if (string === 'asc') {
            if (artistAlbumsSort === 'desc') {
                setArtistAlbumsSort('asc');
                setUserRatings(userRatings.reverse())
            }
        } else if (string === 'desc') {
            if (artistAlbumsSort === 'asc') {
                setArtistAlbumsSort('desc');
                setUserRatings(userRatings.reverse())
            }
        }
    }

    // Renderitza el component
    return (
        <>
            <div className='botoFiltrarComponent'>
                <BotoFiltrar showDropdown={showDropdown} setShowDropdown={setShowDropdown} ordenarHandler={ordenarHandler} />
            </div>
            <div className='perfil-puntuacionsContainer'>
                {
                    loading ? "" : (
                        userRatings.length === 0 ? (
                            <div className='puntuacio-container woAlbums shadow-sm'>
                                <h2 className='noAlbums'>Encara no has puntuat cap àlbum.</h2>
                            </div>
                        ) : (
                            userRatings.map((rating) => {
                                return (
                                    <div className='puntuacio-container shadow-sm' key={rating.albumId} onClick={() => window.location.href = `/album/${rating.albumId}`}>
                                        <div className='puntuacioImg-Info'>
                                            <div className='puntuacioImg'>
                                                <img src={rating.albumImage} alt="Album image" className='puntuacioImg-img' />
                                            </div>
                                            <div className='puntuacioInfo'>
                                                <h5 className='puntuacioName'>{rating.albumName}</h5>
                                                <h5 className='puntuacioArtist'>{rating.albumArtist}</h5>
                                                <h5 className='puntuacioYear'>{rating.albumYear.length > 4 ? rating.albumYear.substring(0, 4) : rating.albumYear}</h5>
                                            </div>
                                        </div>
                                        <div className='AlbumRating-container'>
                                            <p>PUNTUACIÓ</p>
                                            <Rating initialValue={rating.rating} fillColor='#24d863' emptyColor='#6E6E6E' titleSeparator='sobre' showTooltip readonly allowFraction
                                                fillIcon={<AiFillStar className='icon-rating-user'/>}
                                                emptyIcon={<AiOutlineStar className='icon-rating-user' />} />
                                        </div>
                                    </div>
                                )
                            })
                        )
                    )
                }
            </div>
        </>
    )
}
