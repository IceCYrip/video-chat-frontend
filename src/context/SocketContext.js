import { createContext, useContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { useAuthContext } from './AuthContext'
export const SocketContext = createContext()

export const useSocketContext = () => useContext(SocketContext)

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocketDetails] = useState(null)
  const [connectedUsers, setConnectedUsers] = useState([])

  const { authUser } = useAuthContext()

  useEffect(() => {
    if (authUser) {
      const socket = io('http://localhost:5000', {
        query: {
          userId: authUser?.id,
        },
      })
      console.log('socket: ', socket)

      setSocketDetails(socket)

      socket.on('getConnectedUsers', (users) => {
        setConnectedUsers(users)
      })

      return () => socket.close()
    } else {
      if (socket) {
        socket.close()
        setSocketDetails(null)
      }
    }

    console.log('authUser: ', authUser)
  }, [authUser])

  return (
    <SocketContext.Provider value={{ socket, connectedUsers }}>
      {children}
    </SocketContext.Provider>
  )
}
