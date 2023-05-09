import React from 'react';
import './LlistaCancons.css';
import { LazyLoadImage } from "react-lazy-load-image-component";

export const LlistaCancons = (props) => {
    return (
        <div className='top-songs'>
            <div className='top-songs-header'>
                <h2 className='titol'>{props.titol}</h2>
            </div>
            <div className='songs-container'>
                {
                    props.dades.map((song, index) => {
                        return (
                            <div className='song' key={index}>
                                <div className='song-details'>
                                    <LazyLoadImage src={song.album.images[0].url} className='song-img' alt="Song" effect="blur"/>
                                    <div className='song-info'>
                                        <h3 className='song-name'>{song.name}</h3>
                                        <h4 className='song-artist'>{song.artists[0].name}</h4>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
