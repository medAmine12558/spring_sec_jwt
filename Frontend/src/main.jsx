import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './Components/Home.jsx';
import { Signin } from './Components/Signin.jsx';
import { Signup } from './Components/Signup.jsx';
import { Predection_Page } from './Components/Prediction_page.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/SignUP" element={<Signup />} />
        <Route path="/Pred" element={<Predection_Page />} />
      </Routes>
    </Router>
  </React.StrictMode>
)
