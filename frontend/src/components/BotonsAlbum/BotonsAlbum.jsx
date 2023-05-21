import React, { useState } from 'react'

export const BotonsAlbum = (props) => {
    const [perfilInfo, setPerfilInfo] = useState(JSON.parse(localStorage.getItem('perfil_info')));
    const { favorits, setFavorits ,pendents, setPendents, escoltats, setEscoltats, enPropietat, setEnPropietat, album } = props.data;
    console.log('props', props);

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

    return (
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
    )
}