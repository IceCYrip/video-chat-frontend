import React, { useState } from 'react'
import '../stylesheets/roomMenuControls.css'
import { IconButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useSocketContext } from '../context/SocketContext'
import { useRoomContext } from '../context/RoomContext'
import { useAuthContext } from '../context/AuthContext'
import {
  CallEnd,
  Mic,
  MicOff,
  Videocam,
  VideocamOff,
} from '@mui/icons-material'

const RoomMenuControls = () => {
  const routeTo = useNavigate()

  const { socket } = useSocketContext()

  const { authUser } = useAuthContext()
  const { room } = useRoomContext()

  const [toggleMic, setToggleMic] = useState(true)
  const [toggleVideo, setToggleVideo] = useState(true)

  return (
    <div className="room-menu-controls">
      <IconButton
        className="normal-button"
        onClick={() => setToggleVideo((prev) => !prev)}
      >
        {toggleVideo ? <Videocam /> : <VideocamOff />}
      </IconButton>
      <IconButton
        className="normal-button"
        onClick={() => setToggleMic((prev) => !prev)}
      >
        {toggleMic ? <Mic /> : <MicOff />}
      </IconButton>
      <IconButton
        className="end-call-button"
        onClick={() => {
          socket?.emit('leave-room', room?.room_id, authUser?.id)
          routeTo('/')
        }}
      >
        <CallEnd />
      </IconButton>
    </div>
  )
}

export default RoomMenuControls
