import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './PerfilPage.css'
import { CollageAlbums } from '../../components/CollageAlbums/CollageAlbums';
import { LlistaPuntuacions } from '../../components/LlistaPuntuacions/LlistaPuntuacions';
import { Carregant } from '../../components/Carregant/Carregant';
import { PerfilPageHeader } from '../../components/PerfilPageHeader/PerfilPageHeader';

const PerfilPage = () => {
    const { opcioPerfil } = useParams();
    const perfilInfo = JSON.parse(localStorage.getItem('perfil_info'));
    const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'));
    const [loading, setLoading] = useState(true)
    const [arrayAlbums, setArrayAlbums] = useState([])
    const [userAlbums, setUserAlbums] = useState([]);

    const fetchUserAlbums = async () => {
        const result = await fetch(`${import.meta.env.VITE_BACKEND_URL}/getUserAlbums`, {
            method: "GET",
            headers: { 'x-email': perfilInfo.email }
        });
        const data = await result.json();
        setUserAlbums(data);
        if (opcioPerfil === 'escoltats') {
            setArrayAlbums(data.escoltats);
        } else if (opcioPerfil === 'favorits') {
            setArrayAlbums(data.favorits);
        } else if (opcioPerfil === 'pendents') {
            setArrayAlbums(data.pendents);
        } else if (opcioPerfil === 'enpropietat') {
            setArrayAlbums(data.enPropietat);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchUserAlbums();
    }, [accessToken, opcioPerfil]);


    return (
        <>
            {
                loading ? "" : (

                    <PerfilPageHeader userAlbums={userAlbums} />
                )
            }
            <div className='perfilPage'>
                {
                    opcioPerfil == undefined ? "" : (
                        <div className="container-xxl perfilContainer">
                            {
                                loading ? (
                                    <Carregant />
                                ) : (
                                    opcioPerfil === "puntuacions" ? (
                                        <LlistaPuntuacions />
                                    ) : (
                                        <CollageAlbums arrayAlbums={arrayAlbums} />
                                    )
                                )
                            }
                        </div>

                    )
                }
            </div>
        </>
    )
}

export default PerfilPage;
