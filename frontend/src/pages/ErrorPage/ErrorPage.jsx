import React, { useContext } from 'react';
import './ErrorPage.css';
import { useNavigate } from 'react-router-dom';
import idiomas from '../../config/language.json';
import { IdiomaContext } from '../../context/IdiomaContext';

// Pàgina d'error per quan algo ha sortit malament
const ErrorPage = () => {
    const navigate = useNavigate();
    const { idioma } = useContext(IdiomaContext);

    return (
        <div class="errorPage">
            <div>
                <img alt="Logo" src="/assets/img/logo.png" />
            </div>
            <div class="errorContainer">
                <h1>{idiomas[idioma].ErrorPage.titol}</h1>
                <p>{idiomas[idioma].ErrorPage.subtitol}</p>
                <div className='boto shadow'>
                    <button onClick={() => navigate('/home')}>{idiomas[idioma].ErrorPage.textBoto}</button>
                </div>
            </div>
        </div>
    )
}

export default ErrorPage;