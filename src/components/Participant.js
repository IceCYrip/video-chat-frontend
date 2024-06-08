import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../context/AuthContext'
import { useParams } from 'react-router-dom'
import '../stylesheets/participants.css'
import PersonIcon from '@mui/icons-material/Person'
import ParticipantCard from './ParticipantCard'
import RoomMenuControls from './RoomMenuControls'
import { useSocketContext } from '../context/SocketContext'

const Participant = () => {
  const { room_id } = useParams()
  const { authUser } = useAuthContext()

  const { socket } = useSocketContext()

  const [allParticipants, setAllParticipants] = useState([])

  useEffect(() => {
    if (!!socket) {
      socket?.on('get-room-participants', (participants) => {
        setAllParticipants(participants)
      })

      return () => {
        socket?.emit('leave-room', room_id, authUser?.id)
        // socket?.off('leave-room')
        socket?.off('get-room-participants')
      }
    }
  }, [socket, authUser, room_id])

  return (
    <div className="participants-wrapper">
      <div className="participants-side">
        {allParticipants?.map((participantName, index) => {
          return (
            index < 4 && (
              <ParticipantCard key={index} fullName={participantName} />
            )
          )
        })}
        {allParticipants?.length > 4 && `+${allParticipants?.length - 4} more`}
      </div>
      <div className="host-side">
        <PersonIcon className="host" />
        <RoomMenuControls />
      </div>
    </div>
  )
}

export default Participant
