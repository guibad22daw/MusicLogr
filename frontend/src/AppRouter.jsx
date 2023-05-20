import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { Navbar } from './components/Navbar/Navbar';
import { PostLoginPage } from './pages/PostLoginPage/PostLoginPage';
import { HomePage } from './pages/HomePage/HomePage';
import { AlbumPage } from './pages/AlbumPage/AlbumPage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { BuscarPage } from './pages/BuscarPage/BuscarPage';

function AppRouter() {
    return (
      <Router>
        <Routes>
          <Route exact path='/' element={<LoginPage/>}/>
          <Route exact path='/postLogin' element={<PostLoginPage/>}/>
          <Route exact path='/home' element={<><Navbar /><HomePage/></>}/>
          <Route exact path='/album/:id' element={<><Navbar /><AlbumPage/></>}/>
          <Route exact path='/buscar/:album' element={<><Navbar /><BuscarPage/></>}/>
          <Route path='/'>
          </Route>
        </Routes>
      </Router>
    );
  }
  
  export default AppRouter;