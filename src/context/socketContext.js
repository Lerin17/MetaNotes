import React from 'react'
import { io } from 'socket.io-client'

import { UserContext } from './userContext'


  const socketContext = React.createContext()

    
const socket = io( 'http://localhost:5024');


const SocketContextProvider = (props) => {

  const {userData, } = React.useContext(UserContext)

  
const [socketRooms, setsocketRooms] = React.useState();

  const [exex, setexex] = React.useState();



// React.useEffect(() => {
//   socket.on('me', (id) => {
//     console.log(id, 'socketid')
//   })

//   socket.on('connect', () => {
//     console.log('...connecting')
//   })


//   socket.emit('jam', '33x')  
// }, []);


React.useEffect(() => {

  if(userData){
    // socket.connect()

  

    socket.on('me', (id) => {
      console.log(id, 'socketid')
    })

    socket.on('connect', () => {
      console.log('...connecting')
    })

    
    socket.on('getprosedata', (data) => {

      // console.log('tezxz')
      console.log(data, 'textprosedata')
    })


    socket.emit('jam', '33x')  
  }

}, [userData]);


// React.useEffect(() => {
//   console.log('socket change')
//   console.log(socket.id, 'socket id')
// }, [socket]);


// React.useEffect(() => {
//   if(exex){
//     console.log('run ttjor')
//     socket.emit('xroom', 'zezezzzexzeezez')
//   }

// }, [exex]);

const emitToRoom = (operations) => {
  
  // console.log('...emmitting')
  
  const operation = operations[0]

  console.log([...operations, 'oparate'], '...operations')

  // console.log(operations, '...operations')

  console.log(operation, '...emmitting')



  socket.emit('textprosedata', {operation, socketRooms})

}

const joinRoom = (id) => {
  // console.log(id, 'room')



  // socket.open()

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