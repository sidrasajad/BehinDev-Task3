import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import React from "react";
import { BrowserRouter, Routes, Route, Navigate  } from "react-router-dom";
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext.jsx'

function App() {

  const {currentUser} = useContext(AuthContext)
  
const ProtectedRoute = ({children}) => {
  if(!currentUser){
    return <Navigate to = "/"/>
  }

  return children

};

  // const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element = {<ProtectedRoute>
            <Home />
          </ProtectedRoute>} />
          <Route path='login' element = {<Login />} />
          <Route path='register' element = {<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
