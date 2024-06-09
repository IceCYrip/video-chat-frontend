import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import '../stylesheets/navbar.css'
import { Button, IconButton } from '@mui/material'
import { ExitToAppOutlined } from '@mui/icons-material'

const Navbar = () => {
  const routeTo = useNavigate()
  const { authUser, setAuthUser } = useAuthContext()

  const logout = () => {
    localStorage.removeItem('loggedInUser')
    setAuthUser(null)
    routeTo('/')
  }

  return (
    <div className="navbar-wrapper">
      <div>WeCall - Unite Over Distance</div>

      {authUser?.id ? (
        <div className="right-side" style={{ zIndex: 10 }}>
          <span className="welcome-text">Welcome, {authUser?.name}</span>
          <IconButton onClick={logout}>
            <ExitToAppOutlined className="logout-button" />
          </IconButton>
        </div>
      ) : (
        <Button
          className="login-button"
          variant="outlined"
          onClick={() => routeTo('/login')}
        >
          Login
        </Button>
      )}
    </div>
  )
}

export default Navbar
