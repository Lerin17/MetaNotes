import React from 'react'
import { io } from 'socket.io-client'

import { UserContext } from './userContext'


  const socketContext = React.createContext()

    
const socket = io( 'http://localhost:5024');


const SocketContextProvider = (props) => {

  const {userData, } = React.useContext(UserContext)

  
const [socketRooms, setsocketRooms] = React.useState();

const [socketID, setsocketID] = React.useState();

const [senderSocketID, setsenderSocketID] = React.useState();

const [roomMembersIDs, setroomMembersIDs] = React.useState([]);

  const [exex, setexex] = React.useState();

const [isEmitChange, setisEmitChange] = React.useState(true);

//receivedOperations determines whether changes from one user should be emitted to the room, if the state is send..emit and vice versa
const [receivedOperations, setreceivedOperations] = React.useState({state:'send', operations: null});





React.useEffect(() => {

  socket.on('me', (id) => {

    setsocketID(id)
    

    console.log(id, 'socketid')
  })

  if(userData){
    // socket.connect()

  

 

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

const emitToRoom = (operations, mySocketid) => {
  console.log(operations, '...emmitting')


//  console.log(x, 'room')
  // setsenderSocketID()

  //EMIT

   const filteredRoomMemebers = roomMembersIDs.filter(item => item !== mySocketid)

   if(operations){
    if(operations[0].type !== 'set_selection'){
      socket.emit('textprosedata', [operations, filteredRoomMemebers, mySocketid, socketRooms])
     }
   }



}

const joinRoom = (id) => {
  // console.log(id, 'room')



  // socket.open()
  socket.emit('joinroom', id)

  socket.on('roomsdata', ([rooms, idsOfRoomMembers]) => {

    console.log('....socket run', rooms, idsOfRoomMembers)

    setsocketRooms(rooms[1])
    setroomMembersIDs(idsOfRoomMembers)
    console.log(idsOfRoomMembers, 'socketroom')
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
      socket,socketID, setsocketID, setsocketRooms, socketRooms,joinRoom, emitToRoom, isEmitChange, setisEmitChange, senderSocketID, setsenderSocketID, roomMembersIDs, setroomMembersIDs, receivedOperations, setreceivedOperations
    }}>
      {props.children}
    </socketContext.Provider>
  )

}

  

export {socketContext, SocketContextProvider}