import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/Login/Login';
import { Home } from './pages/Home/Home';

function AppRouter() {
  
    return (
      <Router>
        <Routes>
          <Route exact path='/' element={<Login/>}/>
          <Route exact path='/home' element={<Home/>}/>
          <Route path='/'>
          </Route>
        </Routes>
      </Router>
    );
  }
  
  export default AppRouter;