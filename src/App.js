import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css';
import Details from './Pages/Detalis/Details';

import Home from './Pages/Home/Home';
import SignUpOrSignIn from './Pages/SignUp/SignUpOrSignIn';

function App() {
  const [embroideryForm, setEmbroideryForm] = useState([])

  return (
    <Router>
      <Routes >
        <Route path="/" element={<Home embroideryForm={embroideryForm} setEmbroideryForm={setEmbroideryForm} />} />
        <Route path="/signup" element={<SignUpOrSignIn />} />
        <Route path="/details/:id" element={<Details embroideryForm={embroideryForm} setEmbroideryForm={setEmbroideryForm} />} />
      </Routes >
    </Router>
  )
}

export default App;
