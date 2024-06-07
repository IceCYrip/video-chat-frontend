import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const routeTo = useNavigate()
  return (
    <div>
      This is home screen
      <Button variant="contained" onClick={() => routeTo('/login')}>
        Login
      </Button>
      <Button variant="contained" onClick={() => routeTo('/sign-up')}>
        Sign Up
      </Button>
    </div>
  )
}

export default Home
