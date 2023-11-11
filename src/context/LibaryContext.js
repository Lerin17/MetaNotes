import React, { useEffect } from 'react'
import _, { uniqueId } from "lodash";
import { bionicContext } from './bionicContext';
import { UserContext } from './userContext';
import axios from 'axios';
import { socketContext } from './socketContext';
import { TeamsContext } from './teamsContext';



// import { emitx } from './socket';

// import { io, socketHook } from './socketContext';




const LibaryContext = React.createContext()


const LibaryContextProvider = (props) => {

    const {userData, userLibaryData, allUsersDataArray, setallUsersDataArray,  latestUserId, userStatus} = React.useContext(UserContext)

    // const {userLibaryData} = React.useContext(TeamsContext)

    const {socket, joinRoom} = React.useContext(socketContext)

   
    const {notification, setnotification} = React.useContext(UserContext)
    

    const [LibaryArray, setLibaryArray] = React.useState([]);
    const [FolderArray, setFolderArray] = React.useState([]);

    const [currentBookTitle, setcurrentBookTitle] = React.useState('');
    const [currentBookTextProse, setcurrentBookTextProse] = React.useState({});
    const [currentBookMetaArray, setcurrentBookMetaArray] = React.useState([]);

    const [currentBookCreatedTagArray, setcurrentBookCreatedTagArray] = React.useState([]);

    const randomnumid = () => Math.floor(Math.random() * 100000000000)
    const [bookID, setbookID] = React.useState(randomnumid());

    const [currentBook, setcurrentBook] = React.useState();
    const [selectedBook, setselectedBook] = React.useState();
    // const [history, sethistory] = React.useState();

    //hold roomID value for yjs provider
    const [roomID_YjsProvider, setroomID_YjsProvider] = React.useState('default-room');

    //hold folder values START

    //current folder is used for saving and loading folder values
    const [currentFolder, setcurrentFolder] = React.useState({
        name: null,
        description: null,
        folderId: null,
        content: []
    });
    const [selectedFolder, setselectedFolder] = React.useState();

    const [currentFolderName, setcurrentFolderName] = React.useState();
    const [currentFolderDescription, setcurrentFolderDescription] = React.useState();
    const [currentFolderID, setcurrentFolderID] = React.useState(randomnumid());
    const [currentFolderContent, setcurrentFolderContent] = React.useState([]);  
    //hold folder values END

    // const [selectedBook, setselectedBook] = useState();

    //file save error and notification
    const [newFileSaveError, setnewFileSaveError] = React.useState({
        message: null,
        notificationType: null
    });


    //START additional for ui config and reset of textprose
    const [isLibarymodal, setisLibarymodal] = React.useState(false);
    const [isNewFolderInterface, setisNewFolderInterface] = React.useState(false);
    const [isResettextareas, setisResettextareas] = React.useState(false);
    //additional for ui config and reset of textprose end

    //is book already present on reset
    //   const isbookalready = Libaryarrayids.some(item => item == currentBook.bookid)

    console.log(LibaryArray, 'libatyArray')
    const [currentFileSelectedInMenu, setcurrentFileSelectedInMenu] = React.useState();

    React.useEffect(() => {
     

        // console.log(Boolean(currentBook), 'check')
    
        //check if libaryarray is empty and currentbook is valid, then set,***else if add it to the list
        if(LibaryArray.length == 0 && currentBook){
          setLibaryArray([currentBook])
        }else if(currentBook){
        const Libaryarrayids = LibaryArray.map(item => item.bookid ) 
        console.log(currentBook)
        // console.log(Libaryarrayids)

        console.log(LibaryArray.some(item => Libaryarrayids.includes(item.bookid)), 'does it include')

        console.log(Libaryarrayids.includes(bookID))
        console.log(bookID, 'bookid')

      
        if(Libaryarrayids.some(item => item == bookID)){
            // console.log('cothela')
            setLibaryArray(prev => prev.map(item => item.bookid == bookID?{...item,
                bookTitle:currentBookTitle,
                bookTextprosecontent:currentBookTextProse,
                 bookMetaarray:currentBookMetaArray,
                 bookUserTags: currentBookCreatedTagArray}:item))
        }else{
            setLibaryArray(prev => [...prev, currentBook])
        }
      

        // console.log('whats reals')
 
        }       
    }, [currentBook]);

    
//Upon initialization get locally stored userLibaryData(via latestUserid) and reflect it on the Libary
    React.useEffect(() => {


            const getAllUsersDataArray = JSON.parse(localStorage.getItem('allUsersDataArray')) 

            const latestUserId = JSON.parse(localStorage.getItem('latestUserId'))

            //LibaryArray updated with data from localStorage

            //On first time use 
            if(!getAllUsersDataArray || !getAllUsersDataArray.length){
                return
            }else if(getAllUsersDataArray.length === 1){

                console.log(getAllUsersDataArray, 'getallusersdata')
                setallUsersDataArray(getAllUsersDataArray)

                setLibaryArray(getAllUsersDataArray[0].LibaryArray)
            }else if(getAllUsersDataArray.length > 1){
                setallUsersDataArray(getAllUsersDataArray)

                const latestUserData = getAllUsersDataArray.find(item => item.userid === latestUserId )

                console.log(latestUserData, 'latestUser')

                if(latestUserData){
                    setLibaryArray(latestUserData.LibaryArray)
                }
               
            }

        
    }, []);

    // React.useEffect(() => {
    //     if(userData){
        
    //     }
     
    // }, [userData]);

    // const getLatestUserId =  

  React.useEffect( () => {

    const updateUponLogin =  () => {
        if(userData){
            const usersLocalDataArray = JSON.parse(localStorage.getItem('allUsersDataArray')) 

            // const latestUserId = latestUserIdx
            //-----should encrypt latestUserId
            
            
            // console.log(usersLocalDataArray[0].userid, latestUserId,'usersLocalDataArray')
      
      
      
      
            //No previous userLogin
            if(userStatus === 'First User'){
      
              const updatedAllUsersDataArray = {userid:userData._id, LibaryArray}
      
            //   console.log(updatedAllUsersDataArray, 'expected')
      
              setallUsersDataArray([updatedAllUsersDataArray])
      
            }else if(userStatus === 'New User'){   
              console.log('run New user')

            //   console.log(usersLocalDataArray[0].userid, latestUserId,'usersLocalDataArray')
      
              //detecting an newUser
              const newUser = {userid:userData._id, LibaryArray:[]}

              setLibaryArray([])
      
      //update allUserData with newUserData
              setallUsersDataArray ([ ...usersLocalDataArray, newUser]) 
            }else if(userStatus === 'Switched User'){
              const id = userData._id
      
              const getUserLocalData = usersLocalDataArray.find(item => item.userid === id)

              console.log(getUserLocalData, 'switced user')
      
              setLibaryArray(getUserLocalData.LibaryArray)
              
            }
          }

    }

    updateUponLogin()

    //update usersLocalDataArray on login
 
  }, [userStatus]);

    // localStorage.clear()

    React.useEffect(() => {
        console.log('save userLibary onchange')

        // const getAllUsersDataArray = JSON.parse(localStorage.getItem('allUsersDataArray')) 

        if(LibaryArray.length){

            console.log(allUsersDataArray, 'wrong')
               //save userLibaryData Locally after LibaryArray update
        if(!allUsersDataArray.length ){

            const defaultEntry = {userid:null, LibaryArray}
            setallUsersDataArray([defaultEntry])
         
       }else if(allUsersDataArray.length === 1){

        const defaultUserId = allUsersDataArray[0].userid

        if(defaultUserId){
                 const updatedEntry = {userid:defaultUserId, LibaryArray}

                 setallUsersDataArray([updatedEntry])

        }else{
            console.log('wrong')

            const defaultEntry = {userid:null, LibaryArray}

            setallUsersDataArray([defaultEntry])
        }
   
       }else if(allUsersDataArray.length > 1){
        // const getlastestUserId = latestUserIdx

        console.log(latestUserId, 'latestUserID')

        // setallUsersDataArray(prev => {
        //     return (
        //         prev.map(item => item.userid === lastestUserId?{}:item)
        //     )
        // })

        setallUsersDataArray(prev => {return (prev.map(item => item.userid === latestUserId?{userid:item.userid, LibaryArray}:item))})
       }
        }

     
    }, [LibaryArray]);

    React.useEffect(() => {
      //save userData to onlineDataBase upon userLogin or LibaryArray update

     if(userData){
        axios.post(`http://localhost:5024/api/libary/saveLibaryArray/${userData._id}`, {
            LibaryArrayData:LibaryArray
        }).then((res) => {
            console.log(res, 'MybooksOnline')
         }).catch((error) => {
            console.log(error, 'error')
         })
    }
    }, [LibaryArray, userData]);

    
    React.useEffect(() => {
        console.log(allUsersDataArray, 'allUsersave')

        //Upon allUsersDataArray Update
        if(allUsersDataArray.length){
            console.log('change', allUsersDataArray)
            localStorage.setItem('allUsersDataArray', JSON.stringify(allUsersDataArray))
        }
        
    }, [allUsersDataArray]);


    // React.useEffect(() => {
    //     if(userData){
    //         axios.post(`http://localhost:5024/api/libary/saveLibaryArray/${userData._id}`, {
    //             LibaryArrayData:LibaryArray
    //         }).then((res) => {
    //             console.log(res, 'MybooksOnline')
    //          }).catch((error) => {
    //             console.log(error, 'error')
    //          })
    //     }
        
    // }, [userData, LibaryArray]);

    // React.useEffect(() => {
    //     console.log('current book log changes')
    // }, [currentBook]);


 



    
    // console.log(LibaryArray, 'libary')

    //handle ui and reset start
   
    const toggleLibaryModal = () => {
        setisLibarymodal(prev => !prev)
    }


    const toggleisNewFolderInterface =() => {
        setisNewFolderInterface(prev => !prev)
    }

    const toggleResetTextareas = () => {
        setisResettextareas(prev => !prev)
    }

    const Createnewtextareas = () => {
        // console.log('create')
    }
    //handle and ui end


     const openBook = (id) => {

        const selectedItemId = String(id)
        // console.log(bookSharedWithMe.bookData.bookData, 'rookdata')

        console.log(id)
        const book = LibaryArray.find(item => item.bookid == id)
        let isBookAvailbleOnline
        let onlineBookData

        if(userLibaryData && userData){
            //Initiate Opening a book for synced collaboration

             const userSharedBooksArray = userLibaryData.sharedBooks

             const userReceivedBooksArray = userLibaryData.booksReceivedArray


             const getSelectedItemFromASharedBooks = userSharedBooksArray.find(item => item.bookid === selectedItemId) 

            //  const get = userSharedBooksArray.find(item => item.boo)

             const getSelectedItemFromReceivedBooks = userReceivedBooksArray.find(item => item.bookData.bookid === selectedItemId)

             console.log(userSharedBooksArray,userReceivedBooksArray,selectedItemId, 'isBookAv')

             isBookAvailbleOnline = getSelectedItemFromASharedBooks|| getSelectedItemFromReceivedBooks?true:false

             console.log(isBookAvailbleOnline, 'isBookAvailable')

             if(isBookAvailbleOnline){
                console.log(getSelectedItemFromASharedBooks, 'sharedBooks')

               if(getSelectedItemFromASharedBooks){
                // Opening an Item that originated from the user's libary and was shared
                console.log('did run')

                setselectedBook(getSelectedItemFromASharedBooks.bookData)

                joinRoom(getSelectedItemFromASharedBooks.bookData.bookid) 

                setroomID_YjsProvider(getSelectedItemFromASharedBooks.bookData.bookid)

               }else{
                // Opening an Item that was received from a different user after it was shared by him/her
                
                setselectedBook(getSelectedItemFromReceivedBooks.bookData.bookData)
                // setselectedBook(getSelectedItemFromReceivedBooks.bookData.bookData)

                joinRoom(getSelectedItemFromReceivedBooks.bookData.bookData.bookid)

                setroomID_YjsProvider(getSelectedItemFromReceivedBooks.bookData.bookData.bookid)
               }

               setTimeout(() => {
                toggleResetTextareas() 
                // socketClient.emit('sendroomsdata')
               }, 100);

               return
             }

             
        }


        // if(isBookAvailbleOnline){
        //     console.log('joinroom')

        //     const getSelectedBookSharedBook = userSharedBooksArray.find(item => item.bookid === id)

        //     // if(getSharedBook){}

        //     setselectedBook(bookSharedWithMe.bookData.bookData)

        //     joinRoom(bookSharedWithMe.bookData.bookData.bookid)
        
        //     setTimeout(() => {
        //         toggleResetTextareas() 

        //         // socketClient.emit('sendroomsdata')
                
        //        }, 100);

        //     return
        // }



        // if(isBookFromMyOnlineLibary){

        //     console.log('joinroom')

        //     // console.log(bookSharedWithMe.bookData.bookData.bookid)

           
            
            

        //     //should fix the bookData.bookData

        //     setselectedBook(bookSharedWithMe.bookData.bookData)

        //     joinRoom(bookSharedWithMe.bookData.bookData.bookid)
        
        //     setTimeout(() => {
        //         toggleResetTextareas() 

        //         // socketClient.emit('sendroomsdata')
                
        //        }, 100);

        //     return
        // }
        
        setselectedBook(book)
        console.log(book)

        // setTimeout(() => {
        //     setcurrentBook(book)
        //     setbookID(book.bookid)    
        //     console.log(LibaryArray)
        // }, 50);

        // setTimeout(() => {
            
        // }, 100);
        setTimeout(() => {
         toggleResetTextareas() 
         
        }, 100);

        
        // console.log(book, 'open book')
    }
    //clearText area checks for recent saves and advices on updates before clearing textArea

    const ClearTextArea = () => {
        
        // clearInitialTextProseValue()
        const previousSaveContent =  LibaryArray.find(item => item.bookid == bookID)

        const currentFileContent = {
            bookid: bookID,
            bookTitle:currentBookTitle,
            bookTextprosecontent: currentBookTextProse ,
            bookMetaarray : currentBookMetaArray,     
            bookUserTags: currentBookCreatedTagArray
           } 

           console.log(previousSaveContent, 'previousSaveContent')


        if(!previousSaveContent){
            console.log('damn')
            setnewFileSaveError({
                message: 'This file has never been saved',
                notificationType: 'error'
            })
            return
        }

        const isFileSaved = _.isEqual(previousSaveContent , currentFileContent)

        if(!isFileSaved){
            setnewFileSaveError({
                message: 'This file has not been saved recently',
                notificationType: 'error'
            })
            return
        }
            // if(){

        // }

        toggleResetTextareas() 
    }



    // React.useEffect(() => {
    //     setselectedBook()
    // }, [currentBook]);

    // console.log(LibaryArray)
        //handle mounting an already existing book end


    

    // console.log(randomnumid(), 'randomid')




    //handle updates of book components start

    const updateBookTextProse = (value, title) => {
        setcurrentBookTextProse(value)
        setcurrentBookTitle(title)
    }

    const updateBookMetaArray = (value) => {
        setcurrentBookMetaArray(value)
    }

    const updateBookID = () => {
        setbookID(randomnumid() )
    }

    React.useEffect(() => {
     console.log(selectedBook, 'selcted book')
      updateBookID()

      if(selectedBook || currentBook){
        console.log('2nd')
        setbookID(selectedBook.bookid)
      }
    }, [isResettextareas]);

    //handle updates of book  components end
    

//create book entry updates the current book, which in turn with the use of a useEffect updates the libaryarray 

   const Createbookentry = () => {
        console.log(bookID)

    setcurrentFileSelectedInMenu(bookID)

    console.log(currentBookTitle, 'damn')
        
        if(!currentBookTitle){
            setnotification({
               type:'error',
               message: "Please Provide a Title",
               instance:'LIBARYSAVE' 
            })
            return
        }

        // if (currentBook.bookid == setbookID){

        // }

        //if userData available save LibaryArray to dataBase
       
       setcurrentBook({
        bookid: bookID,
        bookTitle:currentBookTitle,
        bookTextprosecontent: currentBookTextProse ,
        bookMetaarray : currentBookMetaArray,     
        bookUserTags: currentBookCreatedTagArray
       })
   }

   //code below is responsible for inputing folders values from the sidebar START

   const getFolderName = (nameValue) => {
    setcurrentFolderName(nameValue)
   }

   const getFolderDescription = (descriptionValue) => {
    setcurrentFolderDescription(descriptionValue)
   }

   //the function below handles the addition and removal of books from current folders 

   const updateCurrentFolderContent = (book) => {
    const currentFolderContentIDs = currentFolderContent.map(item => item.bookid)

    console.log(currentFolderContentIDs,'ids')
    // console.log()

    if(currentFolderContentIDs.includes(book.bookid)){
        console.log('all right')
        setcurrentFolderContent(prev => prev.filter(item => item.bookid !== book.bookid))
    }else{
        setcurrentFolderContent(prev => [...prev, book])
    }        
   }

   const saveCurrentFolder = () => {
    // setcurrentFolderID(randomnumid())

    setcurrentFolder({
        name: currentFolderName,
        description: currentFolderDescription,
        folderId: currentFolderID,
        content: currentFolderContent
    })
   }

   //setting CurrentFolder to null values, so the NewFolderInterfsce is cleared, a change in current folder will prompt an update in the folderArray, but only for a currentFOlder without null values

   const clearCurrentFolder = () => {
    // const previousFolder = FolderArray.find(item =>item.folderId == currentFolderID)

    // const isFileSaved = _.isEqual(previousSaveContent , currentFileContent)

    // setcurr
    setcurrentFolderID(randomnumid())
    setcurrentFolderName('')
    setcurrentFolderDescription('')
    setcurrentFolderContent([])

    // setcurrentFolder({
    //     name: null,
    //     description: null,
    //     folderId: null,
    //     content: []
    // })
   }

   const openFolder = (id) => {
    const getSelectedFolder = FolderArray.find(item =>item.folderId == id)

    setisNewFolderInterface(true)
    // toggleisNewFolderInterface()
    setselectedFolder(getSelectedFolder)
    console.log(getSelectedFolder, 'selectedFolder')

   }

   React.useEffect(() => {
    if(selectedFolder){
        // name: currentFolderName,
        // description: currentFolderDescription,
        // folderId: currentFolderID,
        // content: currentFolderContent
        console.log(selectedFolder, 'truexselected')
        setcurrentFolderName(selectedFolder.name)
        setcurrentFolderDescription(selectedFolder.description)
        setcurrentFolderContent(selectedFolder.content)
        setcurrentFolderID(selectedFolder.folderId)

        setcurrentFolder(selectedFolder)
        setselectedFolder(null)
        
    }
   }, [selectedFolder]);

   console.log(currentFolder, 'getselected')

   //effect below checks folders and updates them in the central FolderArray as it is appropriate
   React.useEffect(() => {
    //checking if the currentFolder has a name because  other properties can be added later

    if(!FolderArray.length && currentFolder.name){
        setFolderArray([currentFolder])
    }else if(currentFolder.name){
        const FolderArrayIDS = FolderArray.map(item => item.folderId)
        console.log(currentFolderID, 'current')
        if(FolderArrayIDS.some(item => item == currentFolderID)){
            setFolderArray(prev => prev.map(item => item.folderId == currentFolderID?{
                ...item,
                name: currentFolderName,
                description: currentFolderDescription,
                content: currentFolderContent
            }:item))
        }else{
            setFolderArray(prev => [...prev, currentFolder])
        }     
    }
    
   }, [currentFolder]);

   console.log(FolderArray, 'folderArray')

   
//    const [currentFolderName, setcurrentFolderName] = React.useState();
//    const [currentFolderDescription, setcurrentFolderDescription] = React.useState();
//    const [currentFolderID, setcurrentFolderID] = React.useState(randomnumid());
//    const [currentFolderContent, setcurrentFolderContent] = React.useState([]);

   //code below is responsible for inputing folders values from the sidebar END
 
//    console.log(currentBook)


    
    
    return (
        <LibaryContext.Provider value={{LibaryArray,updateBookTextProse, updateBookMetaArray, Createbookentry, isLibarymodal,  toggleLibaryModal, toggleResetTextareas, isResettextareas, openBook, currentBook, bookID, selectedBook, setselectedBook,  setbookID, currentBookMetaArray, setcurrentBookCreatedTagArray, currentBookCreatedTagArray, newFileSaveError, setnewFileSaveError, ClearTextArea, getFolderDescription, getFolderName, toggleisNewFolderInterface, isNewFolderInterface, updateCurrentFolderContent, currentFolderContent, saveCurrentFolder, currentFolderName, currentFolderDescription,FolderArray,clearCurrentFolder,openFolder,setcurrentFolderDescription, setcurrentFolderName, currentFolderID, currentFileSelectedInMenu, setcurrentFileSelectedInMenu,roomID_YjsProvider, setroomID_YjsProvider }} >
             {props.children}
        </LibaryContext.Provider>    
    )
}

export {LibaryContextProvider, LibaryContext}