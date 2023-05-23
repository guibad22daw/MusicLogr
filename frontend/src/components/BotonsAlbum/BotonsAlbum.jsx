import React, { useState } from 'react'
import './BotonsAlbum.css';
import { TbHeadphones, TbHeadphonesOff, TbDisc, TbDiscOff, TbHeartFilled, TbHeartOff } from 'react-icons/tb';
import {MdOutlineTimer, MdOutlineTimerOff } from 'react-icons/md';

// Component de botons d'àlbum
export const BotonsAlbum = (props) => {
    // Constant local per emmagatzemar la informació del perfil (obtinguda del local storage)
    const perfilInfo = JSON.parse(localStorage.getItem('perfil_info'));
    
    // Desestructuració de les propietats passades com a paràmetre
    const { favorits, setFavorits, pendents, setPendents, escoltats, setEscoltats, enPropietat, setEnPropietat, album } = props.data;

    // Gestiona el clic en un botó d'opció
    const botoHandler = (opcio) => {
        const info = {
            email: perfilInfo.email,
            albumId: album.id,
            albumName: album.name,
            albumImage: album.images[0].url,
            albumArtist: album.artists[0].name,
            tipus: opcio
        }

        // Envia una sol·licitud POST al backend per desar l'àlbum amb la informació seleccionada
        fetch(`${import.meta.env.VITE_BACKEND_URL}/saveAlbum`, {
            method: "POST",
            body: JSON.stringify(info),
            headers: { "Content-Type": "application/json" },
        }).then((response) => {
            // Actualitza l'estat de les propietats corresponents en base a l'opció seleccionada
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

    // Botons per les diferents accions sobre els albums
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
