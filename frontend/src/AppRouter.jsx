import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SpotifyAuth, Scopes } from 'react-spotify-auth';
import { useState } from 'react';
import Cookies from 'js-cookie';
import PostLogin from './PostLogin';
import { Home } from './Home';

function AppRouter() {
    const [token, setToken] = useState(Cookies.get('spotifyAuthToken'));
  
    //emmagatzemar el token a la cookie
    const storeToken = (token) => {
      Cookies.set('spotifyAuthToken', token, { expires: 7, secure: true });
      setToken(token);
    }
  
    // eliminar la cookie del token
    const clearToken = () => {
      Cookies.remove('spotifyAuthToken');
      setToken(null);
    }
  
    return (
      <Router>
        <Routes>
          <Route exact path='/postLogin' element={<PostLogin/>}/>
          <Route path='/'>
            <SpotifyAuth
              redirectUri='http://localhost:3000/postLogin'
              clientID='856bae41a6db44fbba96fc64c0053e3a'
              scopes={[Scopes.USER_READ_EMAIL, Scopes.USER_READ_PRIVATE]}
              onAccessToken={(token) => {
                console.log('token :>> ', token);
                storeToken(token)
              }}
            />
            {/* <button onClick={clearToken}>Clear Token</button> */}
          </Route>
        </Routes>
      </Router>
    );
  }
  
  export default AppRouter;