import React, { useEffect, useState } from 'react'
import { PerfilPageHeader } from './PerfilPageHeader'
import { useParams } from 'react-router-dom';
import './PerfilPage.css'

export const PerfilPage = () => {
    const { opcioPerfil } = useParams();
    const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'));
    const [perfilInfo, setPerfilInfo] = useState(JSON.parse(localStorage.getItem('perfil_info')));
    const [loading1, setLoading1] = useState(true)
    const [loading2, setLoading2] = useState(true)
    const [arrayAlbums, setArrayAlbums] = useState([])
    const [userAlbums, setUserAlbums] = useState([]);

    const fetchUserAlbums = async () => {
        const result = await fetch(`${import.meta.env.VITE_BACKEND_URL}/getUserAlbums`, {
            method: "GET",
            headers: { 'x-email': perfilInfo.email }
        });
        const data = await result.json();
        setUserAlbums(data);
        setLoading1(false);
    };

    useEffect(() => {
        fetchUserAlbums();
        if (opcioPerfil != undefined && userAlbums.length != 0) {
            console.log('userAlbums', userAlbums);
            if (opcioPerfil === 'escoltats') {
                setArrayAlbums(userAlbums.escoltats);
            } else if (opcioPerfil === 'favorits') {
                setArrayAlbums(userAlbums.favorits);
            } else if (opcioPerfil === 'pendents') {
                setArrayAlbums(userAlbums.pendents);
            } else if (opcioPerfil === 'enpropietat') {
                setArrayAlbums(userAlbums.enPropietat);
            }
            setLoading2(false);
        }
    }, [accessToken, perfilInfo, opcioPerfil]);

    return (
        <>
            {
                loading1 ? "" : (

                    <PerfilPageHeader userAlbums={userAlbums} />
                )
            }
            <div className='perfilPage'>
                {
                    loading2 && opcioPerfil ? "" : (
                        <div className="container-xxl perfilContainer">
                            <div className='perfil-albumsContainer'>
                                <div className='userAlbums'>
                                    {
                                        arrayAlbums.map((album) => {
                                            console.log('album', album);
                                            return (
                                                <div className="album" key={album.albumId}>
                                                    <div className="albumImage">
                                                        <img src={album.albumImage} alt="Album image" className='albumImage-img' />
                                                    </div>
                                                    <div className="albumInfo">
                                                        <h6 className='albumName'>{album.albumName}</h6>
                                                        <h7 className='albumArtist'>{album.albumArtist}</h7>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    )
}
