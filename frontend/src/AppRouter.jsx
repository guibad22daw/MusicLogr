import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { Navbar } from './components/Navbar/Navbar';
import { PostLoginPage } from './pages/PostLoginPage/PostLoginPage';
import { HomePage } from './pages/HomePage/HomePage';
import { AlbumPage } from './pages/AlbumPage/AlbumPage';

function AppRouter() {
    return (
      <Router>
        <Routes>
          <Route exact path='/' element={<PostLoginPage/>}/>
          <Route exact path='/postLogin' element={<PostLoginPage/>}/>
          <Route exact path='/home' element={<><Navbar /><HomePage/></>}/>
          <Route exact path='/album/:id' element={<><Navbar /><AlbumPage/></>}/>
          <Route path='/'>
          </Route>
        </Routes>
      </Router>
    );
  }
  
  export default AppRouter;