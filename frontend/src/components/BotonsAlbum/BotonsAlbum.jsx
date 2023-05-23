import React, { useState } from 'react'
import './BotonsAlbum.css';
import { TbHeadphones, TbHeadphonesOff, TbDisc, TbDiscOff, TbHeartFilled, TbHeartOff } from 'react-icons/tb';
import {MdOutlineTimer, MdOutlineTimerOff } from 'react-icons/md';

export const BotonsAlbum = (props) => {
    // S'estableix l'estat inicial a partir de les dades guardades a localStorage
    const [perfilInfo, setPerfilInfo] = useState(JSON.parse(localStorage.getItem('perfil_info')));
    
    // Es desestructuren les propietats passades al component
    const { favorits, setFavorits, pendents, setPendents, escoltats, setEscoltats, enPropietat, setEnPropietat, album } = props.data;

    // Funció que gestiona les interaccions amb els botons
    const botoHandler = (opcio) => {
        const info = {
            email: perfilInfo.email,
            albumId: album.id,
            albumName: album.name,
            albumImage: album.images[0].url,
            albumArtist: album.artists[0].name,
            tipus: opcio
        }

        // Es fa una crida POST a l'API del backend per desar les dades
        fetch(`${import.meta.env.VITE_BACKEND_URL}/saveAlbum`, {
            method: "POST",
            body: JSON.stringify(info),
            headers: { "Content-Type": "application/json" },
        }).then((response) => {
            // S'actualitza l'estat local en funció de l'opció seleccionada
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

    return (
        <div className='botons-funcions'>
            <div className='opcio-container'>
                <div className='botoOpcio boto-favorits' onClick={() => botoHandler("favorits")}>
                    {
                        favorits ? (
                            <TbHeartOff color='#1db954' size="2em" />
                        ) : (
                            <TbHeartFilled color='#1db954' size="2em" />
                        )
                    }
                </div>
                <label>Favorit</label>
            </div>
            <div className='opcio-container'>
                <div className='botoOpcio boto-escoltats' onClick={() => botoHandler("escoltats")}>
                    {
                        escoltats ? (
                            <TbHeadphonesOff color='black' size="2em" />
                        ) : (
                            <TbHeadphones color='black' size="2em" />
                        )
                    }
                </div>
                <label>Escoltat</label>
            </div>

            <div className='opcio-container'>
                <div className='botoOpcio boto-pendent' onClick={() => botoHandler("pendents")}>
                    {
                        pendents ? (
                            <MdOutlineTimerOff color='black' size="2em" />
                        ) : (
                            <MdOutlineTimer color='black' size="2em" />
                        )
                    }
                </div>
                <label>Pendent</label>
            </div>
            <div className='opcio-container'>
                <div className='botoOpcio boto-enPropietat' onClick={() => botoHandler("enPropietat")}>
                    {
                        enPropietat ? (
                            <TbDiscOff color='black' size="2em" />
                        ) : (
                            <TbDisc color='black' size="2em" />
                        )
                    }
                </div>
                <label>En propietat</label>
            </div>
        </div>
    )
}
