import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import axios from 'axios'
import Host from '../components/Host'
import Participant from '../components/Participant'
import { useRoomContext } from '../context/RoomContext'
import { useSocketContext } from '../context/SocketContext'

const Room = () => {
  const { room_id } = useParams()
  const { authUser } = useAuthContext()
  const { socket } = useSocketContext()
  const [isHost, setIsHost] = useState(false)

  const { setRoom } = useRoomContext()

  useEffect(() => {
    if (!!socket && room_id) {
      axios
        .post(`http://localhost:5000/checkRoomHost`, {
          room_id: +room_id,
          user_id: authUser?.id,
        })
        .then((res) => {
          if (res?.data?.isHost) {
            setIsHost(true)
          } else {
            setIsHost(false)
            socket?.emit('join-room', room_id, authUser?.id)
          }
        })
        .catch((err) => {
          window.alert(err.response.data.error)
        })
      socket?.on('room-joined', (roomDetails) => setRoom(roomDetails))

      return () => {
        socket?.off('join-room')
        socket?.off('room-joined')
        socket?.off('get-room-participants')
      }
    }
  }, [socket, room_id, authUser?.id])

  return isHost ? <Host /> : <Participant />
}

export default Room
