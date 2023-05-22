import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { Navbar } from './components/Navbar/Navbar';
import { PostLoginPage } from './pages/PostLoginPage/PostLoginPage';
import { HomePage } from './pages/HomePage/HomePage';
import { AlbumPage } from './pages/AlbumPage/AlbumPage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import PrivateRoutes from './utils/PrivateRoutes';
import { PerfilPage } from './pages/PerfilPage/PerfilPage';
import { ArtistPage } from './pages/ArtistPage/ArtistPage';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route exact path='/home' element={<><Navbar /><HomePage /></>} />
          <Route exact path='/album/:id' element={<><Navbar /><AlbumPage /></>} />
          <Route exact path='/artist/:artistId' element={<><Navbar /><ArtistPage /></>} />
          <Route exact path='/perfil' element={<><Navbar /><PerfilPage /></>} />
          <Route exact path='/perfil/:opcioPerfil' element={<><Navbar /><PerfilPage /></>} />
        </Route>
        <Route exact path='/' element={<LoginPage />} />
        <Route exact path='/postLogin' element={<PostLoginPage />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;