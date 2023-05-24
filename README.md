# Projecte de React - MusicLogr

## Dependències necessàries

Cal tenir instal·lat <a href="https://nodejs.org/en">Node.js</a>, <a href=" https://es.reactjs.org/">React</a>, i <a href="https://www.mongodb.com/">Mongo</a>, amb una versió recent i compatible.

## Consideracions prèvies
Cal donar-se d'alta a <a href="https://developer.spotify.com/">L'API d'Spotify</a>.
1. Crear-se un compte o iniciar sessió amb la teva conta d'Spotify. <br><br>
2. Crear una App al teu Dashboard de desenvolupador. <br><br>
3. Obtindras un ClientId i un Client Secret. <br><br>
4. Anar a Settings de l'app i configurar les rutes. <br><br>
5. Website: `http://localhost:3000`. <br><br>
6. Redirect URIs: `http://localhost:3000` i `http://localhost:3000/postLogin`. <br><br>
7. Guarda la teva app. <br><br>

## Descarregar i configurar el projecte

1.  Obrir un terminal i executar `git clone https://github.com/guibad22daw/MusicLogr.git` .<br><br>
2.  Un cop dins de la carpeta, navega al directori /backend executar `npm install`.<br><br>
3.  Dins de /backend, haurás de crear un fitxer de nom `.env`, pots copiar el contigut del fitxer `.env.example` i modificar els valors per les teves credencials, obtingudes a l'API d'Spotify al pas anterior.
4.  Navega al directori /frontend executar `npm install`.<br><br>
5.  Dins de /frontend, haurás de crear un fitxer de nom `.env`, pots copiar el contigut del fitxer `.env.example` i modificar els valors per les teves credencials, obtingudes a l'API d'Spotify al pas anterior.

## Fent funcionar el projecte
El projecte conté backend i frontend, per tant, haurem d'iniciar les dues bandes. <br><br> Des del directori `/backend` executa `node index.js`. Hauria de sortir a la terminal un missatge d'avís "listening on port 3001"
<br><br> Des del directori `/frontend` executa `npm run dev`. Hauria de sortir un avís on es mostra el missatge "Local:   http://localhost:3000/" <br><br>
Fem click a l'enllaç o bé busquem al navegador http://localhost:3000 i ja estarem dins l'aplicació.
