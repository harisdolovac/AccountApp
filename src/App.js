import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import './App.css';

import Home from './Pages/Detalis/Home/Home';
import SignUp from './Pages/Detalis/SignUp/SignUp';


function App() {

  return (
    <Router>

      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />

      </Routes >


    </Router>
  )
}

export default App;
