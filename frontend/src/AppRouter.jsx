import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import React, { useState } from 'react';
import { Navbar } from './components/Navbar/Navbar';
import { PostLoginPage } from './pages/PostLoginPage/PostLoginPage';
import PrivateRoutes from './utils/PrivateRoutes';
import loadable from '@loadable/component';

const HomePage = loadable(()=> import('./pages/HomePage/HomePage'));
const AlbumPage = loadable(() => import('./pages/AlbumPage/AlbumPage'));
const ArtistPage = loadable(() => import('./pages/ArtistPage/ArtistPage'));
const PerfilPage = loadable(() => import('./pages/PerfilPage/PerfilPage'));
const ErrorPage = loadable(() => import('./pages/ErrorPage/ErrorPage'));
const LoginPage = loadable(() => import('./pages/LoginPage/LoginPage'));

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Navigate to="/login" />} />
        <Route exact path='/login' element={<LoginPage />} />
        <Route exact path='/postLogin' element={<PostLoginPage />} />
        <Route element={<PrivateRoutes />}>
          <Route exact path='/home' element={<><Navbar /><HomePage /></>} />
          <Route exact path='/album/:id' element={<><Navbar /><AlbumPage /></>} />
          <Route exact path='/artist/:artistId' element={<><Navbar /><ArtistPage /></>} />
          <Route exact path='/perfil' element={<><Navbar /><PerfilPage /></>} />
          <Route exact path='/perfil/:opcioPerfil' element={<><Navbar /><PerfilPage /></>} />
        </Route>
        <Route path='*' element={<ErrorPage/>} />
      </Routes>
    </Router>
  );
}

export default AppRouter;