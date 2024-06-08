import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { SocketContextProvider } from './context/SocketContext'
import { AuthContextProvider } from './context/AuthContext'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import Room from './pages/Room'
import { RoomContextProvider } from './context/RoomContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <RoomContextProvider>
          <SocketContextProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/room/:room_id" element={<Room />} />
            </Routes>
          </SocketContextProvider>
        </RoomContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
)
