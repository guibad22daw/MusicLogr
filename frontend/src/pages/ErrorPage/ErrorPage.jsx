import React from 'react';
import './ErrorPage.css';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <div class="errorPage">
            <div>
                <img alt="Logo" src="/assets/img/logo.png" />
            </div>
            <div class="errorContainer">
                <h1>Página no trobada</h1>
                <p>No hem trobat la pàgina que estàs buscant.</p>
                <div className='boto shadow'>
                    <button onClick={() => navigate('/')}>Tornar enrere</button>
                </div>
            </div>
        </div>
    )
}

export default ErrorPage;
