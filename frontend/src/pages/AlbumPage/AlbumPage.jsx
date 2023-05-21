import React, { useEffect, useState } from 'react';
import './AlbumPage.css';
import { useParams } from 'react-router-dom';
import { AiFillCustomerService, AiFillHeart, AiOutlineHeart, AiOutlineSmile, AiOutlineHistory } from 'react-icons/ai';
import { Separador } from '../../components/Separador';

export const AlbumPage = () => {
    const albumId = useParams();
    const [album, setAlbum] = useState([]);
    const [userAlbums, setUserAlbums] = useState([]);
    const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'));
    const [perfilInfo, setPerfilInfo] = useState(JSON.parse(localStorage.getItem('perfil_info')));
    const [loading1, setLoading1] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [favorits, setFavorits] = useState(false);
    const [pendents, setPendents] = useState(false);
    const [escoltats, setEscoltats] = useState(false);
    const [enPropietat, setEnPropietat] = useState(false);

    const fetchAlbum = async () => {
        const result = await fetch(`https://api.spotify.com/v1/albums/${albumId.id}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        const data = await result.json();
        console.log('data', data);
        setAlbum(data);
        setLoading1(false);
    };

    const fetchUserAlbums = async () => {
        const result = await fetch(`${import.meta.env.VITE_BACKEND_URL}/getUserAlbums`, {
            method: "GET",
            headers: { 'x-email': perfilInfo.email }
        });
        const data = await result.json();
        setUserAlbums(data);
        Object.entries(data).forEach(([propietat, valor]) => {
            valor.forEach(element => {
                if (propietat === "favorits") {
                    if (element.albumId === albumId.id) setFavorits(true);
                } else if (propietat === "pendents") {
                    if (element.albumId === albumId.id) setPendents(true);
                } else if (propietat === "escoltats") {
                    if (element.albumId === albumId.id) setEscoltats(true);
                } else if (propietat === "enPropietat") {
                    if (element.albumId === albumId.id) setEnPropietat(true);
                }
            });
        });
        setLoading2(false);
    };

    const botoHandler = (opcio) => {
        const info = {
            email: perfilInfo.email,
            albumId: album.id,
            albumName: album.name,
            albumImage: album.images[0].url,
            albumArtist: album.artists[0].name,
            tipus: opcio
        }
        fetch(`${import.meta.env.VITE_BACKEND_URL}/saveAlbum`, {
            method: "POST",
            body: JSON.stringify(info),
            headers: { "Content-Type": "application/json" },
        }).then((response) => {
            if (response.ok) {
                if (opcio === "favorits") setFavorits(!favorits)
                else if (opcio === "pendents") setPendents(!pendents)
                else if (opcio === "escoltats") setEscoltats(!escoltats)
                else if (opcio === "enPropietat") setEnPropietat(!enPropietat)
                console.log("Dades desades correctament");
            } else {
                throw new Error("Something went wrong");
            }
        })
    }

    useEffect(() => {
        fetchAlbum();
        fetchUserAlbums();
    }, [accessToken, albumId]);

    return (
        <div className='songPage'>
            <div className="container-xxl songContainer">
                {
                    loading1 || loading2 ? <h1>Loading...</h1> : (
                        <>
                            <div className='header'>
                                <div className="bg-header" style={{ backgroundImage: `url("${album.images[0].url}")` }}></div>
                                <div className="bg-header-overlay"></div>
                            </div>
                            <div className="content">
                                <div className="songImageandInfo">
                                    <div className="songImage">
                                        <img src={album.images[0].url} alt="Song image" />
                                    </div>
                                    <div className="songInfo">
                                        <h1>{album.name}</h1>
                                        <h2 className='albumArtist'>{album.artists[0].name}</h2>
                                        <h4 className='albumYear'>{album.release_date.length > 4 ? album.release_date.substring(0,4) : album.release_date}</h4>
                                    </div>
                                </div>
                                <Separador />
                                <div className='botons-funcions'>
                                    <div className='opcio-container'>
                                        <div className='botoOpcio boto-favorits' onClick={() => botoHandler("favorits")}>
                                            {
                                                favorits ? (
                                                    <ion-icon name="heart-dislike-outline" style={{ color: "black", fontSize: "35px" }}></ion-icon>
                                                ) : (
                                                    <ion-icon name="heart-outline" style={{ color: "black", fontSize: "35px" }}></ion-icon>
                                                )
                                            }
                                        </div>
                                        <label>Favorit</label>
                                    </div>
                                    <div className='opcio-container'>
                                        <div className='botoOpcio boto-escoltats' onClick={() => botoHandler("escoltats")}>
                                            {
                                                escoltats ? (
                                                    <img src={'/assets/img/icons/headset-outline-slash.png'} alt='auriculars' style={{ width: "30px" }} />
                                                ) : (
                                                    <img src={'/assets/img/icons/headset-outline.png'} alt='auriculars' style={{ width: "30px" }} />
                                                )
                                            }

                                        </div>
                                        <label>Escoltat</label>
                                    </div>
                                    <div className='opcio-container'>
                                        <div className='botoOpcio boto-pendent' onClick={() => botoHandler("pendents")}>
                                            {
                                                pendents ? (
                                                    <img src={'/assets/img/icons/pending-outline-slash.png'} alt='auriculars' style={{ width: "30px" }} />
                                                ) : (
                                                    <img src={'/assets/img/icons/pending-outline.png'} alt='auriculars' style={{ width: "30px" }} />
                                                )
                                            }
                                        </div>
                                        <label>Pendent</label>
                                    </div>
                                    <div className='opcio-container'>
                                        <div className='botoOpcio boto-enPropietat' onClick={() => botoHandler("enPropietat")}>
                                            {
                                                enPropietat ? (
                                                    <img src={'/assets/img/icons/disc-outline-slash.png'} alt='auriculars' style={{ width: "30px" }} />
                                                ) : (
                                                    <img src={'/assets/img/icons/disc-outline.png'} alt='auriculars' style={{ width: "30px" }} />
                                                )
                                            }
                                        </div>
                                        <label>En propietat</label>
                                    </div>
                                </div>
                                <Separador />
                                <div className="songPlayer">
                                    <iframe src={`https://open.spotify.com/embed/album/${albumId.id}`} width="100%" height="600" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                                </div>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    )
}
