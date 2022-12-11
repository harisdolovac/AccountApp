import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import './App.css';
import Details from './Pages/Detalis/Details';

import Home from './Pages/Home/Home';
import SignIn from './Pages/SignIn/SignIn';
import SignUp from './Pages/SignUp/SignUp';


function App() {

  return (
    <Router>
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes >
    </Router>
  )
}

export default App;
