import React from 'react'
import { io } from 'socket.io-client'

import { UserContext } from './userContext'


  const socketContext = React.createContext()


const SocketContextProvider = (props) => {

  const {userData, } = React.useContext(UserContext)

  const [exex, setexex] = React.useState();

  
const socket = io( 'http://localhost:5024/', {
  autoConnect: false
});



React.useEffect(() => {

  if(userData){
    socket.connect()

    socket.on('me', (id) => {
      console.log(id, 'socketid')
    })

    socket.emit('jam', '33x')

  
  }

}, [userData]);


// React.useEffect(() => {
//   if(exex){
//     console.log('run ttjor')
//     socket.emit('xroom', 'zezezzzexzeezez')
//   }

// }, [exex]);

const emitToRoom = (value) => {
  socket.open()

  socket.emit('textprosedata', {value, socketRooms})
}

const joinRoom = (id) => {
  // console.log(id, 'room')

  socket.open()

  socket.emit('joinroom', id)

  socket.on('roomsdata', (rooms) => {
    setsocketRooms(rooms[1])
    console.log(rooms, 'socketroom')
  })

  // setexex('exex')

  // setTimeout(() => {

  // }, 10);


      // socketClient.emit('joinroom', id)

  
}

const [socketRooms, setsocketRooms] = React.useState();


// React.useEffect(() => {

// }, []);


  return (
    <socketContext.Provider value={{
      socket, setsocketRooms, socketRooms,joinRoom, emitToRoom
    }}>
      {props.children}
    </socketContext.Provider>
  )

}

  

export {socketContext, SocketContextProvider}