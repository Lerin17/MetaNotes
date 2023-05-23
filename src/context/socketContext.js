import React from 'react'
import { io, Socket } from 'socket.io-client'


const socketHook = io( 'http://localhost:5024/', {
    autoConnect: false
  });

  

export {socketHook, io}