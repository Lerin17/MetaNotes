import React from 'react'


import axios from 'axios'
import CryptoJS from 'crypto-js'
import { uniqueId } from 'lodash'

// import { connect } from 'socket.io-client'






// import  dotenv from 'dotenv'
// const socket = io('http://localhost:5024')
const UserContext = React.createContext()

const UserContextProvider = (props) => {

  const [isLoginModalOpen, setisLoginModalOpen] = React.useState(false);

  // const {socketClient} = React.useContext(socketContext)


//   const [isSharedModalOpen, setisSharedModalOpen] = React.useState(false);

  const [userName, setuserName] = React.useState();

  const [userEmail, setuserEmail] = React.useState();

  const [latestUserIdx, setlatestUserIdx] = React.useState();

  const [isDarkMode, setisDarkMode] = React.useState(false);

  const [userPassword, setuserPassword] = React.useState();

  const [notification, setnotification] = React.useState();

  const [userData, setuserData] = React.useState();

  const [allUsersDataArray, setallUsersDataArray] = React.useState([]);

  const [isNewUserAdded, setisNewUserAdded] = React.useState(false);

  const [userStatus, setuserStatus] = React.useState('');

  const [userLocalLibary, setuserLocalLibary] = React.useState();

  const [TeamMembers, setTeamMembers] = React.useState([]);

  const [isWaitingUserContext, setisWaitingUserContext] = React.useState(false);

  let cipherUserName
  let cipherPassword


  const SignUp =  () => {


      setisWaitingUserContext(true)

        axios.post(`http://localhost:5024/api/authorize/createuser`, {
        username: userName,
        email:userEmail,
        password:userPassword,
        localID:''
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
    
  }, []);
  

    React.useEffect(() => {
      const getlatestUserId = JSON.parse(localStorage.getItem('latestUserId'))

      const usersLocalDataArray = JSON.parse(localStorage.getItem('allUsersDataArray')) 

      const userIds = usersLocalDataArray?usersLocalDataArray.map(item => item.userid):[]

      

      if(userData){

        console.log(getlatestUserId, 'latestuserget')

        localStorage.setItem('latestUserId', JSON.stringify(userData._id))

       if(!getlatestUserId){
         
        setuserStatus('First User')

          setlatestUserIdx(userData._id)
        }else if(userIds.includes(userData._id)){

          if(getlatestUserId !== userData._id){
            setuserStatus('Switched User')

            setlatestUserIdx(userData._id)
          }else{
            setuserStatus('Same User')
          }
         
          // setisNewUserAdded(true)

          setlatestUserIdx(userData._id)
        }else if(userIds.includes(userData._id)){
          setuserStatus('New User')
        }
        
        console.log('latestsUser set')

       
      }
    
      // setlatestUserId(latestUserId)
    
    }, [userData]);


  
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

  if(!error.response){
    //GENERIC ERROR MESSAGE
    setnotification({
      type:'error',
      message: error.message,
      instance:'LOGIN/SIGNUP'
    })
  }else{
    //AUTHORED ERROR MESSAGE
    setnotification({
      type:'error',
      message: error.response.data.message,
      instance:'LOGIN/SIGNUP'
    })
  }


  
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
    <UserContext.Provider value={{isLoginModalOpen, toggleLoginModal, setuserEmail, setuserName, setuserPassword, SignUp, notification, setnotification,userData, LogIn, isWaitingUserContext, setisWaitingUserContext, isDarkMode, setisDarkMode, allUsersDataArray, setallUsersDataArray, latestUserIdx, userStatus}}>
        {props.children}
    </UserContext.Provider>
  )
}

export {UserContext, UserContextProvider}