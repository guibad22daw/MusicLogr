import React from 'react'
import './CollageAlbums.css'

// Component Collage d'albums
export const CollageAlbums = (props) => {
    // Obté l'array d'àlbums passat com a propietat
    const { arrayAlbums } = props;

    return (
        <div className='perfil-albumsContainer'>
            {
                // Comprova si l'array d'àlbums està buit
                arrayAlbums.length === 0 ? <h2 className='noAlbums'>No tens cap àlbum en aquesta categoria.</h2> :
                    <div className='userAlbums'>
                        {
                            // Mapeja l'array d'àlbums i mostra cada àlbum
                            arrayAlbums.map((album) => {
                                console.log('album', album);
                                return (
                                    <div className="album" key={album.albumId}>
                                        <div className="albumImage">
                                            <img src={album.albumImage} alt="Album image" className='albumImage-img' onClick={() => window.location.href = `/album/${album.albumId}`} />
                                        </div>
                                        <div className="albumInfo">
                                            <h6 className='albumName'>{album.albumName}</h6>
                                            <h6 className='albumArtist'>{album.albumArtist}</h6>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
            }
        </div>
    )
}