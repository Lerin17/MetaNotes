import React from 'react'

import {io} from 'socket.io-client'
import axios from 'axios'

// const socket = io('http://localhost:5024')
const TeamsContext = React.createContext()

const TeamsContextProvider = (props) => {

  // const [isLoginModalOpen, setisLoginModalOpen] = React.useState(false);

  const [isTeamsModalOpen, setisTeamsModalOpen] = React.useState(false);

  const toggleTeamsModal = () => {
    setisTeamsModalOpen(prev => !prev)
  }

  // const [userName, setuserName] = React.useState();

  // const [userEmail, setuserEmail] = React.useState();

  // const [userPassword, setuserPassword] = React.useState();

  // const [notification, setnotification] = React.useState();

  // const [userData, setuserData] = React.useState();

//   const SignUp =  () => {

//         axios.post(`http://localhost:5024/api/authorize/createuser`, {
//         username: userName,
//         email:userEmail,
//         password:userPassword
//     }).then((res) => {
//       console.log(res, 'response')
//       setuserData(res.data)
//       setnotification({
//         type:'success',
//         message: "succesfuly created an Account"
//       })
//     }).catch((error) => {
//       console.log(error, 'error')
//           setnotification({
//         type:'error',
//         message: error.response.data.message
//       })
//     })
//     // catch (error) {
//     //   console.log('wow whta a time')
//     //   setnotification({
//     //     type:'error',
//     //     message: error.response.data.message
//     //   })
//     //   console.log(error, 'error')
//     // }
// }


  //   const data = await axios({
  //     method:'POST',
  //     url:'http://localhost:5024/api/authorize/createuser'
  //   })
  // }

  // socket.on('me', (arg)=>{
  //   console.log(arg, 'idsendid')
  // })

  // const toggleLoginModal =() => {
  //   setisLoginModalOpen(prev => !prev)
  // }

  return (
    <TeamsContext.Provider value={{isTeamsModalOpen, toggleTeamsModal}}>
        {props.children}
    </TeamsContext.Provider>
  )
}

export  {TeamsContextProvider, TeamsContext}