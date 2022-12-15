import React from 'react'

import {io} from 'socket.io-client'
import axios from 'axios'
import { UserContext } from './userContext'
// UserContextr

// const socket = io('http://localhost:5024')
const TeamsContext = React.createContext()

const TeamsContextProvider = (props) => {

  const {userData, setnotification} = React.useContext(UserContext)    

  // const [isLoginModalOpen, setisLoginModalOpen] = React.useState(false);

  const [isTeamsModalOpen, setisTeamsModalOpen] = React.useState(false);

  const toggleTeamsModal = () => {
    setisTeamsModalOpen(prev => !prev)
  }

  const [isAddNewTeamOpen, setisAddNewTeamOpen] = React.useState(false);

  const [addTeamNameValue, setaddTeamNameValue] = React.useState('');
  const [addTeamEmailValue, setaddTeamEmailValue] = React.useState('');
  const [teamMembersArray, setteamMembersArray] = React.useState([]);
  const [sharedLibaryBooksArray, setsharedLibaryBooksArray] = React.useState([]);
  const [teamsNotification, setteamsNotification] = React.useState();

  const [isAddWriterToBookMenu, setisAddWriterToBookMenu] = React.useState(false);
  const [selectedBook, setselectedBook] = React.useState();
  const [writersToAddArray, setwritersToAddArray] = React.useState([]);

  const AddNewTeamMember = () => {

    console.log(addTeamEmailValue)

    axios.post(`http://localhost:5024/api/teams/addTeam/${addTeamEmailValue}/${userData._id}`).then((res) => {
    console.log(res, 'response')
    setteamMembersArray(res.data.sharedWriters)
    setnotification({
      type:'success',
      message: "sucessfully Added TeamMember",
      instance:'TEAMS'
    })
  }).catch((error) => {
    console.log(error, 'error')
        setnotification({
      type:'error',
      message: error.response.data.message,
      instance:'TEAMS'
    })
  })
    // setisAddNewTeamOpen(false)
    // setaddTeamEmailValue('')
    // setaddTeamNameValue('')
  
    // console.log('added')
    // return ('cow')
  }


  const AddBookToLibary = (id, title, bookData) => {
    axios.post(`http://localhost:5024/api/libary/addBook/${userData._id}`, {
      name: title,
      bookContent:bookData,
      bookid:id
}).then((res) => {
  console.log(res, 'response')
  setsharedLibaryBooksArray(res.data.sharedBooks)
  setnotification({
    type:'success',
    message: "sucessfully AddedBook to userLibary",
    instance:'TEAMS'
  })
}).catch((error) => {
  console.log(error, 'error')
      setnotification({
    type:'error',
    message: error.response.data.message,
    instance:'TEAMS'
  })
})
  }

  const AddWriterToBook = (book) => {
    axios.put(`http://localhost:5024/api/teams/addWritersToBook/${selectedBook.bookid}/${userData._id}`, {
      writers:writersToAddArray,
      bookData:selectedBook,
      bookName:selectedBook.name,
      senderData:userData
}).then((res) => {
  console.log(res, 'response')
  setsharedLibaryBooksArray(res.data.sharedBooks)
  setnotification({
    type:'success',
    message: "sucessfully AddedBook to userLibary",
    instance:'TEAMS'
  })
}).catch((error) => {
  console.log(error, 'error')
      setnotification({
    type:'error',
    message: error.response.data.message,
    instance:'TEAMS'
  })
})
  }

  console.log(sharedLibaryBooksArray, 'shared')
  // console.log(libaryBooksArray)

  React.useEffect(() => {


    if(userData){
      // console.log(userData)
      axios.get(`http://localhost:5024/api/libary/getUser/${userData._id}`).then((res) => {
        console.log(res)
         setsharedLibaryBooksArray(res.data.sharedBooks)
        setteamMembersArray(res.data.sharedWriters)
        // setnotification({
        //   type:'success',
        //   message: "Libaries Added",
        //   instance:'TEAMS'
        // })
      }).catch((error) => {
        console.log(error, 'error')
        //     setnotification({
        //   type:'error',
        //   message: error.response.data.message,
        //   instance:'TEAMS'
        // })
      })
    }   
  }, [userData]);

  // console.log(teamMembersArray)

const OpenBook = (book) => {

  setselectedBook(book)
  setisAddWriterToBookMenu(true)
}

//   const jasper = [{jack:'ee'}, {jack:'aa'}, {jack:'qz'}]

// jasper.map(item =>)

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
console.log(selectedBook, 'selectedbook')

  return (
    <TeamsContext.Provider value={{isTeamsModalOpen, toggleTeamsModal, isAddNewTeamOpen, setisAddNewTeamOpen, addTeamNameValue, addTeamEmailValue, setaddTeamEmailValue, setaddTeamNameValue, AddNewTeamMember, teamMembersArray, setteamMembersArray, AddBookToLibary,sharedLibaryBooksArray, setsharedLibaryBooksArray,isAddWriterToBookMenu, setisAddWriterToBookMenu,OpenBook, selectedBook, setselectedBook, writersToAddArray, setwritersToAddArray, AddWriterToBook}}>
        {props.children}
    </TeamsContext.Provider>
  )
}

export  {TeamsContextProvider, TeamsContext}