import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/MusicLogr", { useNewUrlParser: true });
mongoose.set("strictQuery", false);

const userSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        favorits: { type: Array, required: false },
        pendents: { type: Array, required: false },
        escoltats: { type: Array, required: false },
        enPropietat: { type: Array, required: false },
    },
    { versionKey: false }
);

const Usuari = mongoose.model("usuaris", userSchema);

export const desaUsuariBD = async function (req, res) {
    const data = await req.body;
    const email = await data.email;

    const nouUsuari = new Usuari({ email });

    const existeix = await Usuari.exists({ email: email });
    if (existeix) {
        console.log("Usuari ja existeix.");
        res.sendStatus(200);
    } else {
        try {
            await nouUsuari.save()
            console.log(`Usuari afegit correctament`);
            res.sendStatus(200);
        } catch (err) {
            console.log(err);
            res.sendStatus(500);
        }
    }
};

export const desaAlbumDB = async function (req, res) {
    const data = await req.body;
    console.log('data', data);
    let existeix;
    const usuari = await Usuari.findOne({ email: data.email });

    switch (data.tipus) {
        case 'pendents':
            existeix = existeixAlbum(usuari.pendents, data);
            if (existeix !== -1) {
                usuari.pendents.splice(existeix, 1);
            } else {
                usuari.pendents.push({ albumId: data.albumId, albumName: data.albumName });
            }
            break;

        case 'favorits':
            existeix = existeixAlbum(usuari.favorits, data);
            if (existeix !== -1) {
                console.log('existeix', existeix);
                usuari.favorits.splice(existeix, 1);
                console.log('usuari.favorits', usuari.favorits);
            } else {
                usuari.favorits.push({ albumId: data.albumId, albumName: data.albumName });
            }
            break;

        case 'escoltats':
            existeix = existeixAlbum(usuari.escoltats, data);
            if (existeix !== -1) {
                usuari.escoltats.splice(existeix, 1);
            } else {
                usuari.escoltats.push({ albumId: data.albumId, albumName: data.albumName });
            }
            break;

        case 'enPropietat':
            existeix = existeixAlbum(usuari.enPropietat, data);
            if (existeix !== -1) {
                usuari.enPropietat.splice(existeix, 1);
            } else {
                usuari.enPropietat.push({ albumId: data.albumId, albumName: data.albumName });
            }
            break;

        default:
            break;
    }
 
    try {
        await usuari.save()
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};

function existeixAlbum(array, data) {
    return array.findIndex((album) => album.albumId === data.albumId);
}
