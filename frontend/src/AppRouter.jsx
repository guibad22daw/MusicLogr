import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/Login/Login';
import {PostLogin } from './pages/PostLogin/PostLogin';
import { Home } from './pages/Home/Home';
import { Navbar } from './components/Navbar/Navbar';
import { Song } from './pages/Song/Song';

function AppRouter() {
    return (
      <Router>
        <Routes>
          <Route exact path='/' element={<Login/>}/>
          <Route exact path='/postLogin' element={<PostLogin/>}/>
          <Route exact path='/home' element={<><Navbar /><Home/></>}/>
          <Route exact path='/song/:id' element={<><Navbar /><Song/></>}/>
          <Route path='/'>
          </Route>
        </Routes>
      </Router>
    );
  }
  
  export default AppRouter;