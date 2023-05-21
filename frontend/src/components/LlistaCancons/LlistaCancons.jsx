import React from 'react';
import './LlistaCancons.css';
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from 'react-router-dom';

export const LlistaCancons = (props) => {
    const navigate = useNavigate();

    return (
        <div className='top-songs'>
            <div className='top-songs-header'>
                <h2 className='titol'>{props.titol}</h2>
            </div>
            <div className='songs-container'>
                {
                    props.dades == undefined || props.length == 0 ? <h2>No hi ha cançons per recomanar</h2> : (
                        props.dades.map((song, index) => {
                            return (
                                <div className='song' key={index}>
                                    <div className='song-details' onClick={() => navigate(`/album/${song.album.id}`)}>
                                        <LazyLoadImage src={song.album.images[0].url} className='song-img' alt="Song" effect="blur"/>
                                        <div className='song-info'>
                                            <h3 className='song-name'>{song.name}</h3>
                                            <h4 className='song-artist'>{song.artists[0].name}</h4>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    )
                }
            </div>
        </div>
    )
}
