import React from 'react'
import PersonIcon from '@mui/icons-material/Person'
import { BackHand } from '@mui/icons-material'
import '../stylesheets/participants.css'

const ParticipantCard = ({
  loggedInUser = false,
  fullName,
  raisedHand = false,
}) => {
  return (
    <div
      className={
        loggedInUser
          ? 'logged-in-user-participant-card'
          : 'other-participant-card'
      }
    >
      {raisedHand && <BackHand className="raised-hand-icon" />}
      <PersonIcon className="participant" style={{ fontSize: 80 }} />
      {fullName}
    </div>
  )
}

export default ParticipantCard
