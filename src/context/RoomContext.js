import { createContext, useContext, useState } from 'react'

export const RoomContext = createContext()

export const useRoomContext = () => useContext(RoomContext)

export const RoomContextProvider = ({ children }) => {
  const [room, setRoom] = useState({
    room_id: null,
    host_id: null,
    participants: '',
  })

  return (
    <RoomContext.Provider value={{ room, setRoom }}>
      {children}
    </RoomContext.Provider>
  )
}
