import React, { useEffect, useState } from 'react'
import './LlistaPuntuacions.css'
import { Rating } from 'react-simple-star-rating';

// Component Llistat de puntuacions
export const LlistaPuntuacions = () => {
    // Defineix variables d'estat
    const [perfilInfo, setPerfilInfo] = useState(JSON.parse(localStorage.getItem('perfil_info')));
    const [loading, setLoading] = useState(true)
    const [userRatings, setUserRatings] = useState([])

    // useEffect per obtenir les puntuacions de l'usuari quan perfilInfo canvia
    useEffect(() => {
        const fetchUserRatings = async () => {
            const result = await fetch(`${import.meta.env.VITE_BACKEND_URL}/getRatings`, {
                method: "GET",
                headers: { 'x-email': perfilInfo.email }
            });
            const data = await result.json();
            console.log('data', data);
            setUserRatings(data);
            setLoading(false);
        };
        fetchUserRatings();
    }, [perfilInfo])

    // Renderitza el component
    return (
        <div className='perfil-puntuacionsContainer'>
            {
                loading ? "" : (
                    userRatings.map((rating) => {
                        return (
                            <div className='puntuacio-container shadow-sm' key={rating.albumId} onClick={() => window.location.href = `/album/${rating.albumId}`}>
                                <div className='puntuacioImg-Info'>
                                    <div className='puntuacioImg'>
                                        <img src={rating.albumImage} alt="Album image" className='puntuacioImg-img'/>
                                    </div>
                                    <div className='puntuacioInfo'>
                                        <h5 className='puntuacioName'>{rating.albumName}</h5>
                                        <h5 className='puntuacioArtist'>{rating.albumArtist}</h5>
                                        <h5 className='puntuacioYear'>{rating.albumYear.length > 4 ? rating.albumYear.substring(0, 4) : rating.albumYear}</h5>
                                    </div>
                                </div>
                                <div className='AlbumRating-container'>
                                    <p>PUNTUACIÓ</p>
                                    <Rating initialValue={rating.rating} size={35} fillColor='#24d863' titleSeparator='sobre' showTooltip readonly allowFraction />
                                </div>
                            </div>
                        )
                    })
                )
            }
        </div>
    )
}
