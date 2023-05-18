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

// export const obtenirDadesBD = async function (req, res, next) {
//     const all = await Event.find({});
//     if (all) {
//         res.send(JSON.stringify(all));
//     } else {
//         console.log("Error");
//     }
// };

// export const desaEsdevenimentBD = async function (req, res, next) {
//     const event = await req.body;
//     console.log(event);
//     const nouEsdeveniment = new Event(event);

//     try {
//         await nouEsdeveniment.save()
//         console.log(`Esdeveniment afegit correctament`);
//         res.sendStatus(200);
//     } catch (err) {
//         console.log(err);
//         res.sendStatus(500);
//     }
// };

// export const esborraEsdevenimentBD = async function (req, res, next) {
//     const event = await req.body;
//     try {
//         await Event.deleteOne({ _id: event._id });
//         console.log(`Esdeveniment amb id ${event._id} eliminat.`);
//         res.sendStatus(200);
//     } catch (err) {
//         console.log(err);
//         res.sendStatus(500);
//     }
// };