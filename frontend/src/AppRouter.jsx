import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/Login/Login';
import {PostLogin } from './pages/PostLogin/PostLogin';
import { Home } from './pages/Home/Home';
import { Navbar } from './components/Navbar/Navbar';

function AppRouter() {
    return (
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Login/>}/>
          <Route exact path='/home' element={<Home/>}/>
          <Route exact path='/postLogin' element={<PostLogin/>}/>
          <Route path='/'>
          </Route>
        </Routes>
      </Router>
    );
  }
  
  export default AppRouter;