import React, { useEffect, useState } from 'react'
import './LlistaPuntuacions.css'
import { Rating } from 'react-simple-star-rating';

export const LlistaPuntuacions = () => {
    const [perfilInfo, setPerfilInfo] = useState(JSON.parse(localStorage.getItem('perfil_info')));
    const [loading, setLoading] = useState(true)
    const [userRatings, setUserRatings] = useState([])


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

    return (
        <div className='perfil-puntuacionsContainer'>
            {
                loading ? "" : (
                    userRatings.map((rating) => {
                        return (
                            <div className='puntuacio-container shadow-sm'>
                                <div className='puntuacioImg-Info'>
                                    <div className='puntuacioImg'>
                                        <img src={rating.albumImage} alt="Album image" className='puntuacioImg-img' onClick={() => window.location.href = `/album/${rating.albumId}`} />
                                    </div>
                                    <div className='puntuacioInfo'>
                                        <h5 className='puntuacioName'>{rating.albumName}</h5>
                                        <h5 className='puntuacioArtist'>{rating.albumArtist}</h5>
                                        <h5 className='puntuacioYear'>{rating.albumYear.length > 4 ? rating.albumYear.substring(0, 4) : rating.albumYear}</h5>
                                    </div>
                                </div>
                                <Rating initialValue={rating.rating} size={35} fillColor='#24d863' titleSeparator='sobre' showTooltip readonly allowFraction/>
                            </div>
                        )
                    })
                )
            }
        </div>
    )
}
