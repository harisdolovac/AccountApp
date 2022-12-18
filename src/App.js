import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css';
import Details from './Pages/Detalis/Details';

import Home from './Pages/Home/Home';
import SignIn from './Pages/SignIn/SignIn';
import SignUp from './Pages/SignUp/SignUp';

function App() {
  const [embroideryForm, setEmbroideryForm] = useState([])

  return (
    <Router>
      <Routes >
        <Route path="/" element={<Home embroideryForm={embroideryForm} setEmbroideryForm={setEmbroideryForm} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/details/:id" element={<Details embroideryForm={embroideryForm} setEmbroideryForm={setEmbroideryForm} />} />
      </Routes >
    </Router>
  )
}

export default App;
