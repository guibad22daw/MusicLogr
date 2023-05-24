import React from 'react'
import { TbReload } from 'react-icons/tb';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { Rating } from 'react-simple-star-rating'
import './AlbumInfo.css'

export const AlbumInfo = (props) => {
    const { album, rating, setRating, perfilInfo } = props.data;

    // Funció per gestionar la puntuació de l'àlbum
    const handleRating = (rate) => {
        setRating(rate)
        fetch(`${import.meta.env.VITE_BACKEND_URL}/addRating`, {
            method: "POST",
            headers: { 'x-email': perfilInfo.email, 'Content-Type': 'application/json' },
            body: JSON.stringify({ albumId: album.id, rating: rate, albumName: album.name, albumArtist: album.artists[0].name, albumYear: album.release_date, albumImage: album.images[0].url })
        }).then((response) => {
            if (response.status === 200) {
                console.log('Rating afegit');
            } else {
                console.log('Error afegint rating');
            }
        });
    }

    return (
        <div className="songImageandInfo">
            <div className="songImage">
                <img src={album.images[0].url} alt="Song image" />
            </div>
            <div className='albumInfo-rating-container'>
                <div className="albumInfo">
                    <h1 className='albumName'>{album.name}</h1>
                    <h2 className='albumArtist' onClick={() => window.location.href = `/artist/${album.artists[0].id}`}>{album.artists[0].name}</h2>
                    <h4 className='albumYear'>{album.release_date.length > 4 ? album.release_date.substring(0, 4) : album.release_date}</h4>
                </div>
                <div className='rating-container'>
                    <div className='rating-column'>
                        <div className='rating-text'>
                            <h5>PUNTUACIÓ</h5>
                            <TbReload color='#929292' size="1.5em" className='reload-icon' onClick={() => handleRating(0)} />
                        </div>
                        <Rating
                            onClick={handleRating}
                            initialValue={rating}
                            allowFraction={true}
                            titleSeparator='sobre'
                            transition={true}
                            fillColor='#24d863'
                            emptyColor='#6E6E6E'
                            showTooltip={true}
                            tooltipDefaultText='0'
                            fillIcon={<AiFillStar className='rating-icon' />}
                            emptyIcon={<AiOutlineStar className='rating-icon' />}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
