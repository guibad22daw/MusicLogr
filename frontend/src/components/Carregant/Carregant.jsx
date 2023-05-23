import React from 'react'
import { Ring } from '@uiball/loaders'
import './Carregant.css'

// Component que mostra un cercle mentre es carreguen les dades
export const Carregant = (props) => {
    return (
        <div className="carregant" style={{height: props.height || "150px"}}>
            <Ring
                size={100}
                lineWeight={4}
                speed={2}
                color="#24d863"
            />
        </div>
    )
}
