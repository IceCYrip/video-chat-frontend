import React, { useState } from 'react'
import '../stylesheets/login.css'
import axios from 'axios'
import { useAuthContext } from '../context/AuthContext'
import { Button, IconButton, InputAdornment, TextField } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { Visibility, VisibilityOff } from '@mui/icons-material'
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const routeTo = useNavigate()

  const { authUser, setAuthUser } = useAuthContext()

  const submit = (e) => {
    e.preventDefault()
    if (!email || !password) {
      alert('Please fill all the fields')
    } else {
      const bodyForAPI = {
        email,
        password,
      }
      axios
        .post('http://localhost:5000/login', bodyForAPI)
        .then((res) => {
          setAuthUser(res?.data)
          localStorage.setItem('loggedInUser', JSON.stringify(res?.data))
          routeTo('/')
        })
        .catch((err) => {
          console.log('error: ', err)
          window.alert(err.response.data.error)
        })
    }
  }

  const logout = () => {
    localStorage.removeItem('loggedInUser')
    setAuthUser(null)
  }

  return (
    <div className={'loginWrapper'}>
      <form className={'loginContainer'} onSubmit={submit}>
        <h1 style={{ marginTop: 0, marginBottom: '20px' }}>LOGIN</h1>

        <TextField
          sx={{ width: '95%', marginTop: '10px' }}
          label="Email"
          // variant="standard"
          type="text"
          value={email}
          placeholder="Enter email"
          InputLabelProps={{ shrink: !!email }}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          sx={{ width: '95%', marginTop: '10px' }}
          label="Password"
          // variant="standard"
          type={showPassword ? 'text' : 'password'}
          value={password}
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          InputLabelProps={{ shrink: !!password }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  // sx={{ color: '#1976D2' }}
                  onClick={() => setShowPassword((show) => !show)}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="contained"
          color="success"
          sx={{ marginTop: '25px', width: '95%' }}
          type="submit"
        >
          Login
        </Button>

        <span
          style={{
            marginTop: '10px',
          }}
        >
          Don't have an account? <Link to="/sign-up">Create an account</Link>
        </span>
      </form>
    </div>
  )
}

export default Login
