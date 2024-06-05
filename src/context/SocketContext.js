import { createContext, useContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { useAuthContext } from './AuthContext'
export const SocketContext = createContext()

export const useSocketContext = () => useContext(SocketContext)

export const SocketContextProvider = ({ children }) => {
  const [socketDetails, setSocketDetails] = useState(null)
  const [connectedUsers, setConnectedUsers] = useState([])

  const { authUser } = useAuthContext

  useEffect(() => {
    if (authUser) {
      const socket = io('http://localhost:5000', {
        query: {
          userId: authUser?.id,
        },
      })

      setSocketDetails(socket)

      socket.on('getConnectedUsers', (users) => {
        setConnectedUsers(users)
      })

      return () => socketDetails.close()
    } else {
      if (socketDetails) {
        socketDetails.close()
        setSocketDetails(null)
      }
    }
  }, [authUser])

  return (
    <SocketContext.Provider value={{ socketDetails, connectedUsers }}>
      {children}
    </SocketContext.Provider>
  )
}
