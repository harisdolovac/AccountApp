import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css';
import Details from './Pages/Detalis/Details';
import Home from './Pages/Home/Home';
import SignUpOrSignIn from './Pages/SignUp/SignUpOrSignIn';

function App() {
  const initialValues = {
    nameEmbroidery: "",
    nameCompany: "",
    selectCompany: "",
    numberOfEmbroidery: 0,
    price: 0,
    id: null,
    message: []
  }
  const [embroideryForm, setEmbroideryForm] = useState([])

  const [embroideryNames, setEmbroideryNames] = useState(initialValues)



  return (
    <Router>
      <Routes >
        <Route path="/" element={<Home embroideryForm={embroideryForm} setEmbroideryForm={setEmbroideryForm} embroideryNames={embroideryNames} setEmbroideryNames={setEmbroideryNames} initialValues={initialValues} />} />
        <Route path="/signuporsignin" element={<SignUpOrSignIn />} />
        <Route path="/details/:id" element={<Details embroideryForm={embroideryForm} setEmbroideryForm={setEmbroideryForm} embroideryNames={embroideryNames} />} />
      </Routes >
    </Router>
  )
}

export default App;
