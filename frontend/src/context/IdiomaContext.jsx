import React, { createContext, useState, useEffect } from 'react';

export const IdiomaContext = createContext();

export const IdiomaContextProvider = ({ children }) => {
    const [idioma, setIdioma] = useState("ca");

    useEffect(() => {
        let lang = navigator.language;

        switch (lang) {
            case "ca":
                setIdioma("ca");
                break;
            case "es-ES":
                setIdioma("es");
                break;
            case "en-US":
                setIdioma("en");
                break;
            default:
                setIdioma("en");
                break;
        }
    }, []);

    return (
        <IdiomaContext.Provider value={{ idioma, setIdioma }} >
            {children}
        </IdiomaContext.Provider >
    );
}