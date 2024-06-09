import React from 'react'
import PersonIcon from '@mui/icons-material/Person'
import { BackHand } from '@mui/icons-material'
import '../stylesheets/participants.css'

const UserCard = ({
  hostSide = false,
  loggedInUser = false,
  fullName,
  raisedHand = false,
}) => {
  return (
    <div
      className={
        hostSide
          ? 'participant-on-host-side'
          : loggedInUser
          ? 'logged-in-user-participant-card'
          : 'other-participant-card'
      }
    >
      {raisedHand && <BackHand className="raised-hand-icon" />}
      <PersonIcon className={hostSide ? 'participant1' : 'participant2'} />
      {fullName}
    </div>
  )
}

export default UserCard
