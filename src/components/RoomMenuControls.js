import React, { useEffect, useState } from 'react'
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
  BackHand,
} from '@mui/icons-material'

const RoomMenuControls = () => {
  const routeTo = useNavigate()

  const { socket } = useSocketContext()

  const { authUser } = useAuthContext()
  const { room, setRoom } = useRoomContext()

  const [toggleRaisingHand, setToggleRaisingHand] = useState(false)
  const [toggleMic, setToggleMic] = useState(true)
  const [toggleVideo, setToggleVideo] = useState(true)
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [changeTimerColor, setChangeTimerColor] = useState('white')

  useEffect(() => {
    let timer
    if (isRunning && time > 0) {
      setChangeTimerColor('yellow')
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1)
      }, 1000)
    } else if (time === 0 && isRunning) {
      setChangeTimerColor('white')
      console.log(`Time's up!`)
      setIsRunning(false)
    }

    return () => clearInterval(timer)
  }, [isRunning, time])

  useEffect(() => {
    if (!!socket) {
      socket?.on('start-timer', (duration) => {
        setTime(duration)
        setIsRunning(true)
      })

      return () => {
        socket.off('start-timer')
      }
    }
  }, [])

  const leaveRoom = () => {
    socket?.emit('leave-room', room?.room_id, authUser?.id)
    setRoom({ room_id: null, host_id: null, participants: '' })
    routeTo('/')
  }

  const startTimer = (duration) => {
    socket.emit('start-timer', duration)
  }

  const raiseHand = () => {
    setToggleRaisingHand(true)
    socket.emit('raise-hand', authUser?.id)
  }

  const lowerHand = () => {
    setToggleRaisingHand(false)
    socket.emit('lower-hand', authUser?.id)
  }

  return (
    <div className="room-menu-wrapper">
      <div className="countdown-timer">
        Time remaining:{' '}
        <span style={{ color: changeTimerColor }}>{time} sec</span>
      </div>
      <div className="room-menu-controls">
        <IconButton
          className={
            toggleRaisingHand ? 'raised-hand-button' : 'lowered-hand-button'
          }
          onClick={() => (toggleRaisingHand ? lowerHand() : raiseHand())}
        >
          <BackHand />
        </IconButton>
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
        <IconButton className="end-call-button" onClick={leaveRoom}>
          <CallEnd />
        </IconButton>

        {room?.host_id == authUser?.id &&
          [15, 30, 45, 60]?.map((duration) => (
            <IconButton
              className="timer-button"
              key={duration}
              onClick={() => startTimer(duration)}
            >
              {duration}s
            </IconButton>
          ))}
      </div>
    </div>
  )
}

export default RoomMenuControls
