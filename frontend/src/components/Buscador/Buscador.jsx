import React from 'react';
import './Buscador.css';

export const Buscador = () => {
    return (
        <div className='buscador-container'>
            <div className='buscador'>
                <img src='/assets/img/lupa.png' className='lupa' alt='Logo' />
                <input className='buscador-input' type='text' placeholder='Buscar' />
            </div>
        </div>
    )
}
