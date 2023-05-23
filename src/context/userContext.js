import React from 'react'

import {io, Socket} from 'socket.io-client'
import axios from 'axios'
import CryptoJS from 'crypto-js'
import { socketHook } from './socketContext'




// import  dotenv from 'dotenv'
// const socket = io('http://localhost:5024')
const UserContext = React.createContext()

const UserContextProvider = (props) => {

  const [isLoginModalOpen, setisLoginModalOpen] = React.useState(false);

  React.useEffect(() => {
    //first
    // const socket = io('http://localhost:5024/')

    socketHook.on('me', (id) => {
      console.log(id, 'socketid')
    })
  }, [userData]);

//   const [isSharedModalOpen, setisSharedModalOpen] = React.useState(false);

  const [userName, setuserName] = React.useState();

  const [userEmail, setuserEmail] = React.useState();

  const [userPassword, setuserPassword] = React.useState();

  const [notification, setnotification] = React.useState();

  const [userData, setuserData] = React.useState();

  const [TeamMembers, setTeamMembers] = React.useState([]);

  const [isWaitingUserContext, setisWaitingUserContext] = React.useState(false);

  let cipherUserName
  let cipherPassword

  const SignUp =  () => {


      setisWaitingUserContext(true)

        axios.post(`http://localhost:5024/api/authorize/createuser`, {
        username: userName,
        email:userEmail,
        password:userPassword
    }).then((res) => {
      console.log(res, 'response')
      setuserData(res.data.savedUser)
      setnotification({
        type:'success',
        message: "sucessfully created an Account",
        instance:'LOGIN/SIGNUP'
      })

      setisWaitingUserContext(false)
    }).catch((error) => {
      console.log(error, 'error')
          setnotification({
        type:'error',
        message: error.response.data.message,
        instance:'LOGIN/SIGNUP'
      })

      setisWaitingUserContext(false)
    })
    // catch (error) {
    //   console.log('wow whta a time')
    //   setnotification({
    //     type:'error',
    //     message: error.response.data.message
    //   })
    //   console.log(error, 'error')
    // }
  }

  console.log(
    process.env.REACT_APP_PASS, 'process'
  )

  
  React.useEffect(() => {

    // localStorage.getItem('user')

    if(!userData && !cipherPassword && !cipherUserName){
      const userxData = localStorage.getItem('userData')

      console.log(userxData)

      if(userxData){

        console.log(userxData.cipherPassword)
          
      // const userPassword = CryptoJS.AES.decrypt(userxData.cipherPassword, process.env.REACT_APP_PASS)

      // const userName = CryptoJS.AES.decrypt(userxData.cipherUserName, process.env.REACT_APP_PASS)

      // console.log(userName, userPassword)
      }
    }
  }, [userData]);



  const LogIn =  () => {

    setisWaitingUserContext(true)
    axios.post(`http://localhost:5024/api/authorize/login`, {
    username: userName,
    // email:userEmail,
    password:userPassword
}).then((res) => {
  console.log(res, 'response')
  setuserData(res.data)
  console.log(process.env.REACT_APP_PASS)
 cipherUserName = CryptoJS.AES.encrypt(res.data.username, process.env.REACT_APP_PASS).toString();
 cipherPassword = res.data.password
  localStorage.setItem('userData', 
  JSON. stringify(
    { cipherUserName:cipherUserName,
      cipherPassword:cipherPassword
     }
  ) 

  
);
  setnotification({
    type:'success',
    message: "sucessfully logged in",
    instance:'LOGIN/SIGNUP'
  })

  setisWaitingUserContext(false)

}).catch((error) => {
  console.log(error, 'errorMessage')
  setnotification({
    type:'error',
    message: error.response.data.message,
    instance:'LOGIN/SIGNUP'
  })

  
  setisWaitingUserContext(false)
  // console.log(process.env.REACT_APP_PASS)
  console.log(error, 'errorxeeeeeeeeeeeeeeeeeeeeeeee')
  //     setnotification({
  //   type:'error',
  //   message: error.response.data.message,
  //   instance:'LOGIN/SIGNUP'
  // })
})

}





  //   const data = await axios({
  //     method:'POST',
  //     url:'http://localhost:5024/api/authorize/createuser'
  //   })
  // }

  // socket.on('me', (arg)=>{
  //   console.log(arg, 'idsendid')
  // })

  const toggleLoginModal =() => {
    setisLoginModalOpen(prev => !prev)
  }

  return (
    <UserContext.Provider value={{isLoginModalOpen, toggleLoginModal, setuserEmail, setuserName, setuserPassword, SignUp, notification, setnotification,userData, LogIn, isWaitingUserContext, setisWaitingUserContext}}>
        {props.children}
    </UserContext.Provider>
  )
}

export {UserContext, UserContextProvider}