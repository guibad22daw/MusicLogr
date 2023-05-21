import React, { useState } from 'react'
import { PerfilPageHeader } from './PerfilPageHeader'
import { useParams } from 'react-router-dom';

export const PerfilPage = () => {
    const { opcioPerfil } = useParams();
    const [arrayAlbums, setArrayAlbums] = useState([])
    console.log('opcioPerfil', opcioPerfil);
    const albumsUser = JSON.parse(localStorage.getItem('albums_user'));
    console.log('albumsUser', albumsUser);

    if (opcioPerfil === 'escoltats') {
        setArrayAlbums(albumsUser.escoltats);
    } else if (opcioPerfil === 'favorits') {
        setArrayAlbums(albumsUser.favorits);
    } else if (opcioPerfil === 'pendents') {
        setArrayAlbums(albumsUser.pendents);
    } else if (opcioPerfil === 'enpropietat') {
        setArrayAlbums(albumsUser.emPropietat);
    }

    return (
        <>
            <PerfilPageHeader />
            <div className="container-xxl perfilContainer">
                <div className='albumsContainer'>
                    {
                        arrayAlbums.map((album) => {
                            return (
                                <div className="album" key={album.id}>
                                    <div className="albumImage">
                                        <img src={album.images[0].url} alt="Album image" className='albumImage-img' />
                                    </div>
                                    <div className="albumName">
                                        <h1>{album.name}</h1>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}
