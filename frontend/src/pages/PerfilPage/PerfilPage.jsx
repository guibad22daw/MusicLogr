import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './PerfilPage.css'
import { UserAlbums } from '../../components/UserAlbums/UserAlbums';
import { LlistaPuntuacions } from '../../components/LlistaPuntuacions/LlistaPuntuacions';
import { Carregant } from '../../components/Carregant/Carregant';
import { PerfilPageHeader } from '../../components/PerfilPageHeader/PerfilPageHeader';
import { BotoFiltrar } from '../../components/BotoFiltrar/BotoFiltrar';
import idiomas from '../../config/language.json';
import { IdiomaContext } from '../../context/IdiomaContext';

const PerfilPage = () => {
    const { opcioPerfil } = useParams();
    const perfilInfo = JSON.parse(localStorage.getItem('perfil_info'));
    const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'));
    const [loading, setLoading] = useState(true)
    const [artistAlbumsSort, setArtistAlbumsSort] = useState("desc");
    const [arrayAlbums, setArrayAlbums] = useState([])
    const [userAlbums, setUserAlbums] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const { idioma } = useContext(IdiomaContext);

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

    const ordenarHandler = (string) => {
        setShowDropdown(false);
        if (string === 'asc') {
            if (artistAlbumsSort === 'desc') {
                setArtistAlbumsSort('asc');
                setArrayAlbums(arrayAlbums.reverse())
            }
        } else if (string === 'desc') {
            if (artistAlbumsSort === 'asc') {
                setArtistAlbumsSort('desc');
                setArrayAlbums(arrayAlbums.reverse())
            }
        }
    }


    return (
        <>
            {
                loading ? "" : (
                    <PerfilPageHeader userAlbums={userAlbums} idioma={idiomas[idioma].PerfilPage}/>
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
                                        <LlistaPuntuacions idioma={idiomas[idioma]}/>
                                    ) : (
                                        <div className='userAlbums-filtrar'>
                                            <div className='botoFiltrarComponent'>
                                                <BotoFiltrar showDropdown={showDropdown} setShowDropdown={setShowDropdown} ordenarHandler={ordenarHandler} idioma={idiomas[idioma].BotoFiltrar}/>
                                            </div>
                                            <UserAlbums arrayAlbums={arrayAlbums} idioma={idiomas[idioma].PerfilPage}/>
                                        </div>
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
