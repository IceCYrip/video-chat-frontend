import React, { useState } from 'react'
import '../stylesheets/loginAndSignUp.css'
import axios from 'axios'
import { useAuthContext } from '../context/AuthContext'
import { Button, IconButton, InputAdornment, TextField } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { Visibility, VisibilityOff } from '@mui/icons-material'
const Login = () => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmpassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { setAuthUser } = useAuthContext()
  const routeTo = useNavigate()

  const submit = (e) => {
    e.preventDefault()
    if (!fullName || !email || !password || !confirmpassword) {
      alert('Please fill all the fields')
    } else {
      if (password !== confirmpassword) {
        alert('passwords do not match')
      } else {
        const bodyForAPI = {
          name: fullName,
          email,
          password,
        }
        axios
          .post('http://localhost:5000/createUser', bodyForAPI)
          .then((res) => {
            setAuthUser(res?.data)
            localStorage.setItem('loggedInUser', JSON.stringify(res?.data))
            window.alert('Account created successfully')
            routeTo('/')
          })
          .catch((err) => {
            console.error('error: ', err)
            window.alert(err.response.data.error)
          })
      }
    }
  }

  return (
    <div className={'loginWrapper'}>
      <form className={'loginContainer'} onSubmit={submit}>
        <h1 style={{ marginTop: 0, marginBottom: '10px' }}>SIGN UP</h1>
        <TextField
          sx={{ width: '95%', marginTop: '10px' }}
          label="Name"
          // variant="standard"
          type="text"
          value={fullName}
          placeholder="Enter name"
          InputLabelProps={{ shrink: !!fullName }}
          onChange={(e) => setFullName(e.target.value)}
        />
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
          InputLabelProps={{ shrink: !!password }}
          onChange={(e) => setPassword(e.target.value)}
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
        <TextField
          sx={{ width: '95%', marginTop: '10px' }}
          label="Confirm Password"
          // variant="standard"
          type={showConfirmPassword ? 'text' : 'password'}
          value={confirmpassword}
          placeholder="Confirm your password"
          InputLabelProps={{ shrink: !!confirmpassword }}
          onChange={(e) => setConfirmPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  // sx={{ color: '#1976D2' }}
                  onClick={() => setShowConfirmPassword((show) => !show)}
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="contained"
          sx={{ marginTop: '30px', width: '95%' }}
          type="submit"
        >
          Create account
        </Button>

        <span
          style={{
            marginTop: '15px',
          }}
        >
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  )
}

export default Login
