import { createContext, useContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { useAuthContext } from './AuthContext'
export const SocketContext = createContext()

export const useSocketContext = () => useContext(SocketContext)

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocketDetails] = useState(null)

  const { authUser } = useAuthContext()

  useEffect(() => {
    if (!!authUser?.id) {
      const newSocket = io('http://localhost:5000', {
        query: {
          userId: authUser?.id,
        },
      })

      setSocketDetails(newSocket)
    }
  }, [authUser])

  useEffect(() => {
    if (!!socket) {
      return () => socket.close()
    } else {
      if (socket) {
        socket.close()
        setSocketDetails(null)
      }
    }
  }, [socket])

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  )
}
