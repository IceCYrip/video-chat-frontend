import { Button, Divider, InputAdornment, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import '../stylesheets/home.css'
import Navbar from '../components/Navbar'
import { Keyboard, VideoCall } from '@mui/icons-material'
import axios from 'axios'
import { useSocketContext } from '../context/SocketContext'

const Home = () => {
  const routeTo = useNavigate()
  const { authUser } = useAuthContext()
  const { socket } = useSocketContext()
  const [roomId, setRoomId] = useState(null)

  useEffect(() => {
    if (!!socket) {
      socket?.on('room-created', (roomId) => {
        routeTo(`/room/${roomId}`)
      })

      return () => {
        socket?.off('room-created')
      }
    }
  }, [socket, routeTo])

  const joinRoom = () => {
    if (!!authUser?.id) {
      axios
        .post(`http://localhost:5000/roomExists`, {
          room_id: roomId,
        })
        .then((res) => {
          if (res.data?.exists) {
            routeTo(`/room/${roomId}`)
          } else {
            alert('Invalid room id')
          }
        })
        .catch((err) => {
          window.alert(err.response.data.error)
        })
    } else {
      routeTo('/login')
    }
  }

  return (
    <div className="home-wrapper">
      <Navbar />
      <div className="home-body">
        <div className="container">
          <h1>Video calls and meetings for everyone</h1>
          <h3>Connect, collaborate and celebrate from anywhere</h3>
          <div className="action-group">
            <Button
              className="create-room-button"
              variant="contained"
              startIcon={<VideoCall />}
              onClick={() => {
                if (!!authUser?.id) {
                  socket?.emit('create-room', authUser?.id)
                } else {
                  routeTo('/login')
                }
              }}
            >
              Create Room
            </Button>
            <div className="search-room-group">
              <TextField
                placeholder="Enter Room ID"
                onChange={(e) => setRoomId(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Keyboard />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                className="join-room-button"
                disabled={!roomId}
                onClick={joinRoom}
              >
                Join
              </Button>
            </div>
          </div>
          <Divider />

          <h3 className="developer-desc">
            Learn more about the developer{' '}
            <a
              href="https://www.linkedin.com/in/karansable/"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>
          </h3>
        </div>
      </div>
    </div>
  )
}

export default Home
