import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css';
import Details from './Pages/Detalis/Details';
import FinishedForm from './Pages/FinishedForm/FinishedForm';
import Home from './Pages/Home/Home';
import SignUpOrSignIn from './Pages/SignUp/SignUpOrSignIn';

function App() {


  return (
    <Router>
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/signuporsignin" element={<SignUpOrSignIn />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/account" element={<FinishedForm />} />
      </Routes >
    </Router>
  )
}

export default App;
