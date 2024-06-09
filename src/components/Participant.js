import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../context/AuthContext'
import { useParams } from 'react-router-dom'
import '../stylesheets/participants.css'
import PersonIcon from '@mui/icons-material/Person'
import UserCard from './UserCard'
import RoomMenuControls from './RoomMenuControls'
import { useSocketContext } from '../context/SocketContext'

const Participant = () => {
  const { room_id } = useParams()
  const { authUser } = useAuthContext()

  const { socket } = useSocketContext()

  const [allParticipants, setAllParticipants] = useState([])
  const [raisedHandParticipants, setRaisedHandParticipants] = useState([])

  useEffect(() => {
    if (!!socket) {
      socket?.on('get-room-participants', (participants) => {
        setAllParticipants(
          participants?.filter((details) => details?.id != authUser?.id)
        )
      })

      socket?.on('hand-raised', (participantId) => {
        setRaisedHandParticipants((prev) => [...prev, participantId])
      })

      socket?.on('hand-lowered', (participantId) => {
        setRaisedHandParticipants((prev) =>
          prev?.filter((j) => j !== participantId)
        )
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
        <span className="participants-title">
          PARTICIPANTS: {allParticipants?.length + 1}
        </span>
        {allParticipants?.map((details) => (
          <UserCard
            key={details?.id}
            fullName={details?.name}
            raisedHand={raisedHandParticipants?.includes(details?.id)}
          />
        ))}
      </div>
      <div className="host-side">
        <UserCard
          loggedInUser
          fullName={`${authUser?.name} (You)`}
          raisedHand={raisedHandParticipants?.includes(authUser?.id)}
        />
        <PersonIcon className="host" />
        <RoomMenuControls />
      </div>
    </div>
  )
}

export default Participant
