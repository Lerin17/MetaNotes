import React from 'react'

import {io} from 'socket.io-client'
import axios from 'axios'
import { UserContext } from './userContext'
// UserContextr

// const socket = io('http://localhost:5024')
const TeamsContext = React.createContext()

const TeamsContextProvider = (props) => {

  const {userData, userLibaryData, setuserLibaryData, setnotification} = React.useContext(UserContext)    

  // const [isLoginModalOpen, setisLoginModalOpen] = React.useState(false);

  const [isTeamsModalOpen, setisTeamsModalOpen] = React.useState(false);

  const toggleTeamsModal = () => {
    setisTeamsModalOpen(prev => !prev)
  }

  const [isAddNewTeamOpen, setisAddNewTeamOpen] = React.useState(false);

  const [isMessagesOpen, setisMessagesOpen] = React.useState(false);

  const [addTeamNameValue, setaddTeamNameValue] = React.useState('');
  const [addTeamEmailValue, setaddTeamEmailValue] = React.useState('');
  const [teamMembersArray, setteamMembersArray] = React.useState([]);
  const [sharedLibaryBooksArray, setsharedLibaryBooksArray] = React.useState([]);
  // const [userLibaryData, setuserLibaryData] = React.useState();

  const [teamsNotification, setteamsNotification] = React.useState();

  const [isAddWriterToBookMenu, setisAddWriterToBookMenu] = React.useState(false);
  const [selectedBook, setselectedBook] = React.useState();
  const [writersToAddArray, setwritersToAddArray] = React.useState([]);



  const [isWaiting, setisWaiting] = React.useState(false);

  const AcceptBook = ({bookid}) => {

    console.log(bookid, bookid)

    axios.patch(`http://localhost:5024/api/teams/acceptBookInvite/${bookid}/${userData._id}`).then((res) => {
         console.log(res, 'response')
      setuserLibaryData(res.data)
    }).catch((error) => {
       console.log(error, 'error')
    })
  }

  const AddNewTeamMember = () => {

    console.log(addTeamEmailValue)

    setisWaiting(true)

    axios.post(`http://localhost:5024/api/teams/addTeam/${addTeamEmailValue}/${userData._id}`).then((res) => {
    console.log(res, 'response')
    setteamMembersArray(res.data.sharedWriters)
    setnotification({
      type:'success',
      message: "sucessfully Added TeamMember",
      instance:'TEAMS'
    })
    setisWaiting(false)
  }).catch((error) => {
    console.log(error, 'error')
        setnotification({
      type:'error',
      message: error.response.data.message,
      instance:'TEAMS'
    })
  })

  setisWaiting(false)
    // setisAddNewTeamOpen(false)
    // setaddTeamEmailValue('')
    // setaddTeamNameValue('')
  
    // console.log('added')
    // return ('cow')
  }

  const openBookSharedWithMe = () => {

  }


  const AddBookToLibary = (id, title, bookData) => {

    console.log(bookData, 'bookData')

    axios.post(`http://localhost:5024/api/libary/addBook/${userData._id}`, {
      name: title,
      bookData,
      bookid:id
}).then((res) => {
  console.log(res, 'response')
  // setsharedLibaryBooksArray(res.data.sharedBooks)
  setuserLibaryData(res.data)
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

    console.log(writersToAddArray, 'writerrss')

    if(!writersToAddArray.length){
      setnotification({
        type:'error',
        message: "No writers selected",
        instance:'TEAMS'
      })

      return
    }

    axios.patch(`http://localhost:5024/api/teams/addWritersToBook/${selectedBook.bookid}/${userData._id}`, {
      writers:writersToAddArray,
      bookData:selectedBook,
      bookName:selectedBook.name,
      senderData:userData
}).then((res) => {
  console.log(res, 'response')
  // setsharedLibaryBooksArray(res.data.sharedBooks)
  setuserLibaryData(res.data)

  const updatedSelectedBook = res.data.sharedBooks.find(item => (item.bookid == selectedBook.bookid))

  console.log(updatedSelectedBook, 'updatedselectedBook')

  setselectedBook(updatedSelectedBook)

  setnotification({
    type:'success',
    message: "sucessfully attached writer to Book",
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
//set userLibary upon Login POINTLESS, ALL DATA ALREADY CONTAINED IN USERLIBARYDATA

    if(userLibaryData){
      // console.log(userData)
      setsharedLibaryBooksArray(userLibaryData.sharedBooks)
        
         setteamMembersArray(userLibaryData.sharedWriters)

      // axios.get(`http://localhost:5024/api/libary/getUser/${userData._id}`).then((res) => {
      //   console.log(res)
      //    setsharedLibaryBooksArray(res.data.sharedBooks)
        
      //    setteamMembersArray(res.data.sharedWriters)

      //   console.log(res.data, 'serUserLibaryData')
      //   setuserLibaryData(res.data)

       

      //   // setnotification({
      //   //   type:'success',
      //   //   message: "Libaries Added",
      //   //   instance:'TEAMS'
      //   // })
      // }).catch((error) => {
      //   console.log(error, 'error')
      //   //     setnotification({
      //   //   type:'error',
      //   //   message: error.response.data.message,
      //   //   instance:'TEAMS'
      //   // })
      // })
    }   
  }, [userLibaryData]);

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
    <TeamsContext.Provider value={{isTeamsModalOpen, toggleTeamsModal, isAddNewTeamOpen, setisAddNewTeamOpen, addTeamNameValue, addTeamEmailValue, setaddTeamEmailValue, setaddTeamNameValue, AddNewTeamMember, teamMembersArray, setteamMembersArray, AddBookToLibary,sharedLibaryBooksArray, setsharedLibaryBooksArray,isAddWriterToBookMenu, setisAddWriterToBookMenu,OpenBook, selectedBook, setselectedBook, writersToAddArray, setwritersToAddArray, AddWriterToBook, isWaiting, setisWaiting, isMessagesOpen, setisMessagesOpen, AcceptBook, openBookSharedWithMe }}>
        {props.children}
    </TeamsContext.Provider>
  )
}

export  {TeamsContextProvider, TeamsContext}