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

    const botoHandler = (e) => {
        const info = {
            email: perfilInfo.email,
            albumId: album.id,
            albumName: album.name,
            albumImage: album.images[0].url,
            albumArtist: album.artists[0].name,
            tipus: e.target.value
        }
        fetch(`${import.meta.env.VITE_BACKEND_URL}/saveAlbum`, {
            method: "POST",
            body: JSON.stringify(info),
            headers: { "Content-Type": "application/json" },
        }).then((response) => {
            if (response.ok) {
                if (e.target.value === "favorits") setFavorits(!favorits)
                else if (e.target.value === "pendents") setPendents(!pendents)
                else if (e.target.value === "escoltats") setEscoltats(!escoltats)
                else if (e.target.value === "enPropietat") setEnPropietat(!enPropietat)
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
                                        <h2>{album.artists[0].name}</h2>
                                        <h4>{album.release_date}</h4>
                                    </div>
                                </div>
                                <Separador />
                                <div className='botons-funcions'>
                                    <button
                                        className={`btn btn-spotify ${favorits ? "btn-remove" : ""} ${favorits && "btn-gray"}`}
                                        onClick={(e) => botoHandler(e)}
                                        value="favorits"
                                    >
                                        {favorits ? <AiOutlineHeart /> : <AiFillHeart />}{" "}
                                        {favorits ? "Treure de favorits" : "Afegir a favorits"}
                                    </button>
                                    <button className="btn btn-primary" onClick={(e) => botoHandler(e)} value="pendents"><AiOutlineHistory />{pendents ? "Treure de pendent d'escoltar" : "Afegir a pendent d'escoltar"}</button>
                                    <button className="btn btn-primary" onClick={(e) => botoHandler(e)} value="escoltats">
                                        <AiFillCustomerService /> {escoltats ? "Treure d'escoltats" : "Afegir a escoltats"}
                                    </button>
                                    <button className="btn btn-primary" onClick={(e) => botoHandler(e)} value="enPropietat"><AiOutlineSmile />{enPropietat ? "Treure de en propietat" : "Afegir a en propietat"}</button>
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
