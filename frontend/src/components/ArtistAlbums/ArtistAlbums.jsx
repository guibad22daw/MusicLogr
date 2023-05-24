import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import './ArtistAlbums.css';

export const ArtistAlbums = (props) => {
    const { artistAlbums } = props;
    return (
        <div className='artist-albumsContainer shadow-sm'>
            {
                artistAlbums.length === 0 ? (<h2 className='noAlbums'>No tens cap àlbum en aquesta categoria.</h2>) : (

                    <div className='artistAlbums'>
                        {
                            artistAlbums.map((album) => {
                                return (
                                    <div className="album shadow-sm" key={album.id} onClick={() => window.location.href = `/album/${album.id}`}>
                                        <div className="albumImage">
                                            <LazyLoadImage
                                                src={album.images[1].url}
                                                alt={`album ${album.name} image`}
                                                effect="blur"
                                                className='albumImage-img'
                                            />
                                        </div>
                                        <div className="albumInfo">
                                            <h6 className='albumName'>{album.name}</h6>
                                            <h6 className='albumYear' style={{ fontSize: "14px" }}>{album.release_date.length > 4 ? album.release_date.substring(0, 4) : album.release_date}</h6>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            }
        </div>
    )
}
