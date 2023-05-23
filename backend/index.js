import express from "express"
import cors from "cors"
//import lyricsFinder from "lyrics-finder"
import SpotifyWebApi from "spotify-web-api-node"
import dotenv from "dotenv"
import * as bd from "./bd.js";

const app = express()
dotenv.config()

app.use(cors()) // Habilita el CORS per a les sol·licituds HTTP
app.use(express.json()) // Permet analitzar el cos de les sol·licituds com a JSON
app.use(express.urlencoded({ extended: true })) 

const PORT = 3001 // Port en el qual s'escoltarà el servidor

// Endpoint per a la sol·licitud de login
app.post("/login", async (req, res) => {
  // Obté el codi d'autorització de la sol·licitud
  const { code } = req.body

  // Crea una nova instància de SpotifyWebApi amb les credencials necessàries
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  })

  try {
    // Realitza una sol·licitud d'autorització a l'API de Spotify utilitzant el codi d'autorització rebut
    const {
      body: { access_token, refresh_token, expires_in },
    } = await spotifyApi.authorizationCodeGrant(code)

    // Retorna l'access token, el refresh token i el temps d'expiració com a resposta en format JSON
    res.json({ access_token, refresh_token, expires_in })
  } catch (err) {
    console.log(err)
    res.sendStatus(400) // Retorna un codi d'estat de 400 (Sol·licitud incorrecta) en cas d'error
  }
})

// Endpoint per a la sol·licitud de refresc de l'access token
app.post("/refresh", async (req, res) => {
  // Obté el refresh token de la sol·licitud
  const { refreshToken } = req.body

  // Crea una nova instància de SpotifyWebApi amb les credencials necessàries i el refresh token
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken,
  })

  try {
    // Refresca l'access token utilitzant el refresh token
    const {
      body: { access_token, expires_in },
    } = await spotifyApi.refreshAccessToken()

    // Retorna l'access token i el temps d'expiració com a resposta en format JSON
    res.json({ access_token, expires_in })
  } catch (err) {
    console.log(err)
    res.sendStatus(400)
  }
})

// Endpoint per desar un usuari a la base de dades
app.post("/saveUser", async (req, res) => {
  bd.desaUsuariBD(req, res);
})

// Endpoint per desar un àlbum a la base de dades
app.post("/saveAlbum", async (req, res) => {
  bd.desaAlbumDB(req, res);
})

// Endpoint per obtenir els àlbums d'un usuari de la base de dades
app.get("/getUserAlbums", async (req, res) => {
  bd.obtenirAlbumsBD(req, res);
})

// Endpoint per afegir un rating a un àlbum a la base de dades
app.post("/addRating", async (req, res) => {
  bd.desaRatingBD(req, res);
})

// Endpoint per obtenir tots els ratings de la base de dades
app.get("/getRatings", async (req, res) => {
  bd.obtenirRatingsBD(req, res);
})

// Endpoint per obtenir el rating d'un àlbum per a un usuari de la base de dades
app.get("/getRating", async (req, res) => {
  bd.obtenirRatingBD(req, res);
})

// Escolta les sol·licituds en el port especificat
app.listen(PORT, err => {
  if (err) console.log(err)
  console.log("listening on port", PORT)
})