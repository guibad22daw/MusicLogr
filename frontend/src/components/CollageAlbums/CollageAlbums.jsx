import React from 'react'
import './CollageAlbums.css'

export const CollageAlbums = (props) => {
    const { arrayAlbums } = props;

    return (
        <div className='perfil-albumsContainer'>
            {
                arrayAlbums.length === 0 ? <h2 className='noAlbums'>No tens cap àlbum en aquesta categoria.</h2> :
                    // Renderitza la llista d'àlbums
                    <div className='userAlbums'>
                        {
                            // Itera a través de cada àlbum de l'arrayAlbums
                            arrayAlbums.map((album) => {
                                console.log('album', album);
                                return (
                                    // Renderitza l'element per a cada àlbum
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
