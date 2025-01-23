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
import Dashboard from './Components/Dashboard.jsx';
import { UnAuthorized } from './Components/uicomponents/UnAuthorized.jsx';
import  RouteProtected  from './Components/ProtectedRoutes/PretectedRoutes.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/SignUP" element={<Signup />} />
        <Route path="/Pred" element={<Predection_Page />} />
        <Route
        path="/adminpage"
        element={
          <RouteProtected allowedRoles={['ROLE_admin']}>
            <Dashboard />
          </RouteProtected>
        }
      />
        <Route path="/UnAuthorized" element={<UnAuthorized />}></Route>
      </Routes>
    </Router>
  </React.StrictMode>
)
