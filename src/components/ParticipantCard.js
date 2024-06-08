import React from 'react'
import PersonIcon from '@mui/icons-material/Person'

const ParticipantCard = ({ fullName }) => {
  return (
    <>
      <div
        style={{
          width: '10vw',
          height: '10vw',
          minWidth: '100px',
          minHeight: '100px',
          backgroundColor: '#171717',
          color: 'white',

          display: 'grid',
          placeItems: 'center',
        }}
      >
        <PersonIcon className="participant" style={{ fontSize: 80 }} />
        {fullName}
      </div>
    </>
  )
}

export default ParticipantCard
