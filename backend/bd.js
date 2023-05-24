import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/MusicLogr", { useNewUrlParser: true });
mongoose.set("strictQuery", false);

// Esquema per la col·lecció "usuaris"
const userSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        favorits: { type: Array, required: false },
        pendents: { type: Array, required: false },
        escoltats: { type: Array, required: false },
        enPropietat: { type: Array, required: false },
        ratings: { type: Array, required: false },
    },
    { versionKey: false }
);

// Definició del model d'usuari utilitzant l'esquema definit anteriorment
const Usuari = mongoose.model("usuaris", userSchema);

// Funció asíncrona per desar un usuari a la base de dades
export const desaUsuariBD = async function (req, res) {
    // Obtenció de les dades del cos de la petició
    const data = await req.body;
    const email = await data.email;

    // Creació d'una instància d'Usuari utilitzant l'email rebut
    if (email !== null) {
        const nouUsuari = new Usuari({ email });

        // Comprovació si l'usuari ja existeix a la base de dades
        const existeix = await Usuari.exists({ email: email });
        if (existeix) {
            // L'usuari ja existeix, es mostra un missatge de console i es retorna un estat 200 OK
            console.log("Usuari ja existeix.");
            res.sendStatus(200);
        } else {
            try {
                // L'usuari no existeix, es guarda a la base de dades
                await nouUsuari.save()
                console.log(`Usuari afegit correctament`);
                res.sendStatus(200);
            } catch (err) {
                // S'ha produït un error en desar l'usuari, es mostra un missatge de console i es retorna un estat 500 Internal Server Error
                console.log(err);
                res.sendStatus(500);
            }
        }
    }
};

// Funció per desar un àlbum a la base de dades
export const desaAlbumDB = async function (req, res) {
    // Obtenció de les dades del cos de la petició
    const data = await req.body;
    let existeix;

    // Cerca de l'usuari corresponent a l'email rebut
    const usuari = await Usuari.findOne({ email: data.email });
    if (!usuari) {
        // Si l'usuari no existeix, es mostra un missatge de console, es retorna un estat 500 Internal Server Error i es finalitza la funció
        console.log('Usuari no existeix');
        res.sendStatus(500);
        return
    }

    // Selecció de l'acció a realitzar en funció del tipus rebut
    switch (data.tipus) {
        case 'pendents':
            // Verificació si l'àlbum ja existeix als pendents de l'usuari
            existeix = existeixAlbum(usuari.pendents, data);
            if (existeix !== -1) {
                // Si l'àlbum ja existeix, s'elimina dels pendents
                usuari.pendents.splice(existeix, 1);
            } else {
                // Si l'àlbum no existeix, s'afegeix als pendents
                usuari.pendents.push({ albumId: data.albumId, albumName: data.albumName, albumImage: data.albumImage, albumArtist: data.albumArtist });
            }
            break;

        case 'favorits':
            // Verificació si l'àlbum ja existeix als favorits de l'usuari
            existeix = existeixAlbum(usuari.favorits, data);
            if (existeix !== -1) {
                // Si l'àlbum ja existeix, s'elimina dels favorits
                console.log('existeix', existeix);
                usuari.favorits.splice(existeix, 1);
                console.log('usuari.favorits', usuari.favorits);
            } else {
                // Si l'àlbum no existeix, s'afegeix als favorits
                usuari.favorits.push({ albumId: data.albumId, albumName: data.albumName, albumImage: data.albumImage, albumArtist: data.albumArtist });
            }
            break;

        case 'escoltats':
            // Verificació si l'àlbum ja existeix als escoltats de l'usuari
            existeix = existeixAlbum(usuari.escoltats, data);
            if (existeix !== -1) {
                // Si l'àlbum ja existeix, s'elimina dels escoltats
                usuari.escoltats.splice(existeix, 1);
            } else {
                // Si l'àlbum no existeix, s'afegeix als escoltats
                usuari.escoltats.push({ albumId: data.albumId, albumName: data.albumName, albumImage: data.albumImage, albumArtist: data.albumArtist });
            }
            break;

        case 'enPropietat':
            // Verificació si l'àlbum ja existeix als enPropietat de l'usuari
            existeix = existeixAlbum(usuari.enPropietat, data);
            if (existeix !== -1) {
                // Si l'àlbum ja existeix, s'elimina dels enPropietat
                usuari.enPropietat.splice(existeix, 1);
            } else {
                // Si l'àlbum no existeix, s'afegeix als escoltats
                usuari.enPropietat.push({ albumId: data.albumId, albumName: data.albumName, albumImage: data.albumImage, albumArtist: data.albumArtist });
            }
            break;

        default:
            break;
    }

    try {
        // S'actualitza i desa l'usuari a la base de dades
        await usuari.save()
        res.sendStatus(200);
    } catch (err) {
        // S'ha produït un error en desar l'usuari, es mostra l'error a la console i es retorna un estat 500 Internal Server Error en la resposta HTTP
        console.log(err);
        res.sendStatus(500);
    }
};

// Funció per obtenir els àlbums d'un usuari des de la base de dades
export const obtenirAlbumsBD = async function (req, res) {
    // Obtenció de l'email de les capçaleres de la petició
    const email = req.headers['x-email'];

    // Cerca de l'usuari corresponent a l'email rebut
    const usuari = await Usuari.findOne({ email: email });
    if (!usuari) {
        // Si l'usuari no existeix, es mostra un missatge de console, es retorna un estat 500 Internal Server Error i es finalitza la funció
        console.log('Usuari no existeix');
        res.sendStatus(500);
        return
    }

    // Creació d'un objecte amb els àlbums de l'usuari
    const userAlbums = {
        favorits: usuari.favorits,
        pendents: usuari.pendents,
        escoltats: usuari.escoltats,
        enPropietat: usuari.enPropietat,
    };

    // S'envia l'objecte JSON amb els àlbums com a resposta HTTP
    res.json(userAlbums);
};

// Funció per desar una valoració d'àlbum a la base de dades
export const desaRatingBD = async function (req, res) {
    // Obtenció de l'email de les capçaleres de la petició i les dades del cos de la petició
    const email = req.headers['x-email'];
    const data = await req.body;

    const usuari = await Usuari.findOne({ email: email });
    if (!usuari) {
        // Si l'usuari no existeix, es mostra un missatge de console, es retorna un estat 500 Internal Server Error i es finalitza la funció
        console.log('Usuari no existeix');
        res.sendStatus(500);
        return
    }

    // Cerca de la valoració corresponent a l'àlbum rebut en els ratings de l'usuari
    const index = usuari.ratings.findIndex((rating) => rating.albumId === data.albumId);
    if (index !== -1) {
        // Si la valoració ja existeix, s'elimina de la llista utilitzant el mètode `splice()`
        usuari.ratings.splice(index, 1);
    }
    if (data.rating !== 0) {
        // Si la valoració és diferent de zero, s'afegeix a la llista utilitzant el mètode `push()`
        usuari.ratings.push({ albumId: data.albumId, rating: data.rating, albumName: data.albumName, albumImage: data.albumImage, albumArtist: data.albumArtist, albumYear: data.albumYear });
    }

    try {
        // S'actualitza i desa l'usuari a la base de dades utilitzant el mètode `save()`
        await usuari.save()
        console.log(`Rating afegit correctament`);
        res.sendStatus(200);
    } catch (err) {
        // S'ha produït un error en desar l'usuari, es mostra l'error a la console i es retorna un estat 500 Internal Server Error en la resposta HTTP
        console.log(err);
        res.sendStatus(500);
    }
};

export const obtenirRatingBD = async function (req, res) {
    // Obté l'email i l'ID de l'àlbum dels encapçalaments de la sol·licitud
    const email = req.headers['x-email'];
    const albumId = req.headers['x-albumid'];

    // Cerca l'usuari a la base de dades utilitzant l'email
    const usuari = await Usuari.findOne({ email: email });

    // Comprova si l'usuari existeix
    if (!usuari) {
        console.log('Usuari no existeix');
        res.sendStatus(500);
        return
    }

    let objecteARetornar;

    // Cerca el rating corresponent a l'àlbumId especificat a l'array de ratings de l'usuari
    usuari.ratings.forEach((rating) => {
        if (rating.albumId === albumId) {
            objecteARetornar = rating;
        }
    });

    // Retorna l'objecte de rating trobat o un objecte amb un rating de 0 si no es troba cap coincidència
    res.json(objecteARetornar || { rating: 0 });
};

export const obtenirRatingsBD = async function (req, res) {
    // Obté l'email dels encapçalaments de la sol·licitud
    const email = req.headers['x-email'];

    // Cerca l'usuari a la base de dades utilitzant l'email
    const usuari = await Usuari.findOne({ email: email });

    // Comprova si l'usuari existeix
    if (!usuari) {
        console.log('Usuari no existeix');
        res.sendStatus(500);
        return
    }

    // Retorna l'array de ratings de l'usuari o un array buit si no hi ha cap rating
    return res.json(usuari.ratings || []);
};

function existeixAlbum(array, data) {
    // Comprova si hi ha un àlbum amb l'albumId especificat a l'array donat
    return array.findIndex((album) => album.albumId === data.albumId);
}
