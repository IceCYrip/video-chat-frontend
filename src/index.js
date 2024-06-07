import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { SocketContextProvider } from './context/SocketContext'
import { AuthContextProvider } from './context/AuthContext'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Home from './components/Home'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <SocketContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </SocketContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
)
