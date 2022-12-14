import { Button, InputBase, IconButton } from '@mui/material'
import React from 'react'
import { TeamsContext } from '../../context/teamsContext'
import { UserContext } from '../../context/userContext'

import uniqolor from 'uniqolor';
import { LibaryContext } from '../../context/LibaryContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const TeamsModal = () => {

   const randomColor = () => (uniqolor.random().color)

    const {isAddNewTeamOpen, setisAddNewTeamOpen,  setaddTeamEmailValue, setaddTeamNameValue,addTeamNameValue, addTeamEmailValue, AddNewTeamMember,teamMembersArray,sharedLibaryBooksArray,isAddWriterToBookMenu, setisAddWriterToBookMenu, OpenBook, selectedBook, setselectedBook,writersToAddArray, setwritersToAddArray, AddWriterToBook} = React.useContext(TeamsContext)

    const {LibaryArray} = React.useContext(LibaryContext)

    const {notification, setnotification} = React.useContext(UserContext)   

    
   const notify = () => toast.success(notification.message, {
    position: "bottom-left",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    closeButton: true,
    theme:"dark"
   })

   const  notifyerror = () => toast.error(notification.message, {
    position: "bottom-left",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    closeButton: true,
    theme:"dark"
   })

   React.useEffect(() => {
    if(notification){
        if(notification.type == 'error' && notification.instance=='TEAMS'){
            notifyerror()
            setnotification(null)
            return
        }
        if(notification.instance == 'TEAMS'){
        notify()
        setnotification(null)
        }  
    }
   }, [notification]);

    // const Filecomponent = (props) => {
    //     let fileTitle = props.title
    //     fileTitle = fileTitle.length > 8? `${fileTitle.substring(0, 8)}...`: fileTitle
    //     return (
    //         <div className={`w-20 ${isNewFolderInterface? currentFolderContentIDs.includes(props.bookid)?'opacity-50':'':''}  bg-gray-600 flex flex-col ${currentSelectedFileInMenu == props.bookid?'border-2':'border-none'}`} >
    //             <div className="  self-center "  >
    //             <IconButton onClick={()=>{
    //                 addToRecentFiles(props.allbookData)
    //                 clearInitialTextProseValue()
    //                 openBook(props.bookid)}} className="hover:bg-transparent py-0 " >
    //             <i className=" ri-file-list-2-line text-gray-300 "></i>
    //             </IconButton>
    //             </div>
                
    //             <div className="text-xs px-1 w-full text-center self-center text-gray-200" >{fileTitle}</div>  

    //         <div className="w-full flex justify-center  p-1 bg-gray-700" >
    //             <div className={`${isNewFolderInterface?'block w-full ':'hidden'}`} onClick={()=>updateCurrentFolderContent(props.allbookData)} >
    //                 <div className="bg-green-400 hover:bg-green-500 transition-all text-center cursor-pointer font-bold" >
    //                      ADD
    //                 </div>
    //             </div>

    //             <div className={`${isNewFolderInterface?'hidden':'block'} cursor-pointer`} >
    //                 <svg xmlns="http://www.w3.org/2000/svg" className='text-gray-300 hover:text-red-600 transition-all fill-current' width="16" height="16" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/></svg>
    //             </div> 

    //              <div 
    //              onClick={()=>AddBookToLibary(props.bookid, props.title, props.allbookData )}
    //              className={`${isNewFolderInterface && userData?'hidden':'block'} cursor-pointer ml-4`} >
    //                     <svg xmlns="http://www.w3.org/2000/svg" className='text-gray-300 hover:text-blue-600 transition-all fill-current' width="16" height="16" viewBox="0 0 24 24"><path d="M5 7c2.761 0 5 2.239 5 5s-2.239 5-5 5c-2.762 0-5-2.239-5-5s2.238-5 5-5zm15-4c0-1.657-1.344-3-3-3-1.657 0-3 1.343-3 3 0 .312.061.606.148.888l-4.209 3.157c.473.471.877 1.009 1.201 1.599l4.197-3.148c.477.317 1.048.504 1.663.504 1.656 0 3-1.343 3-3zm-5.852 17.112c-.087.282-.148.576-.148.888 0 1.657 1.343 3 3 3 1.656 0 3-1.343 3-3s-1.344-3-3-3c-.615 0-1.186.187-1.662.504l-4.197-3.148c-.324.59-.729 1.128-1.201 1.599l4.208 3.157zm6.852-5.05c1.656 0 3-1.343 3-3s-1.344-3-3-3c-1.281 0-2.367.807-2.797 1.938h-6.283c.047.328.08.66.08 1s-.033.672-.08 1h6.244c.395 1.195 1.508 2.062 2.836 2.062z"/></svg>
    //             </div> 
    //             </div>

               
              
    //         </div>     
    //     )
    // }

    const SingleTeamMemberAvatar = (props) => {

        const writersToAddArrayIds = writersToAddArray.map(item => (item.writerid))
        
        return (
            <div 
            onClick={()=>setwritersToAddArray(prev => [...prev, {writerid:props.id}])}
            style={{
                backgroundColor:randomColor({lightness: [50, 80]})
            }}
            className={`rounded-full w-10 h-10 bg-white text-white cursor-pointer hover:scale-125 transition-all ${writersToAddArrayIds.includes(props.id)?'border border-2':''}  mt-2 flex items-center justify-center uppercase text-xl font-bold`}>
                {props.name[0]}
            </div>
        )
    }

    const SelectedBook = () => {

    }

    // const jack = selectedBook.writers.

    const currentBook = selectedBook? sharedLibaryBooksArray.find(item => (item.bookid == selectedBook.bookid)):null

    const SelectedBookWritersDisplay = selectedBook? currentBook.writers.length? currentBook.writers.map(writer => (<div>
        {teamMembersArray.find(item => (item.writerid == writer.writerid )).name}
    </div>)):<div  className='text-red-800 font-bold px-2'>
    No writers Assigned to this book
    </div>:<div className='text-red-800 font-bold px-2'>
        No writers Assigned to this book
    </div>

    const SingleLibaryBook = (props) => {
        let fileTitle = props.title
        fileTitle = fileTitle.length > 8? `${fileTitle.substring(0, 8)}...`: fileTitle
     
        return (
            <div>
                {(!selectedBook || selectedBook.bookid == props.id) &&
                      <div className={`${isAddNewTeamOpen?'w-24':'w-20'} transition-all  bg-gray-600 flex flex-col `} >
                      <div className="  self-center "  >
                      <IconButton onClick={()=>OpenBook(props.book)}  className="hover:bg-transparent py-0 " >
                      <i className=" ri-file-list-2-line text-gray-300 "></i>
                      </IconButton>
                      </div>
                      
                      <div className="text-xs px-1 w-full text-center self-center text-gray-200" >{fileTitle}</div>  
      
                  <div className="w-full flex justify-center  p-1 bg-gray-700" >
                     
      
                      <div className={` cursor-pointer`} >
                          <svg xmlns="http://www.w3.org/2000/svg" className='text-gray-300 hover:text-red-600 transition-all fill-current' width="16" height="16" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/></svg>
                      </div> 
      
                       <div 
                       className={`cursor-pointer ml-4`} >
                              <svg xmlns="http://www.w3.org/2000/svg" className='text-gray-300 hover:text-blue-600 transition-all fill-current' width="16" height="16" viewBox="0 0 24 24"><path d="M5 7c2.761 0 5 2.239 5 5s-2.239 5-5 5c-2.762 0-5-2.239-5-5s2.238-5 5-5zm15-4c0-1.657-1.344-3-3-3-1.657 0-3 1.343-3 3 0 .312.061.606.148.888l-4.209 3.157c.473.471.877 1.009 1.201 1.599l4.197-3.148c.477.317 1.048.504 1.663.504 1.656 0 3-1.343 3-3zm-5.852 17.112c-.087.282-.148.576-.148.888 0 1.657 1.343 3 3 3 1.656 0 3-1.343 3-3s-1.344-3-3-3c-.615 0-1.186.187-1.662.504l-4.197-3.148c-.324.59-.729 1.128-1.201 1.599l4.208 3.157zm6.852-5.05c1.656 0 3-1.343 3-3s-1.344-3-3-3c-1.281 0-2.367.807-2.797 1.938h-6.283c.047.328.08.66.08 1s-.033.672-.08 1h6.244c.395 1.195 1.508 2.062 2.836 2.062z"/></svg>
                      </div> 
                      </div>
      
                     
                    
                  </div> 
                }
            </div>
            
        )
    }

    const LibaryBooksDisplay = sharedLibaryBooksArray.length? sharedLibaryBooksArray.map((item,i) => (
        <div>
             <SingleLibaryBook
             key={i}
             title={item.name}
             writers={item.writers}
             id={item.bookid}
             book={item}
             />
        </div>   
    )):<div>
    Books Libary
    </div>

    const TeamMemberDisplay = teamMembersArray.length? teamMembersArray.map((item,i) => (<div>
        <SingleTeamMemberAvatar
        key={i}
        name= {item.name}
        id={item.writerid}
        writer ={item}
        />
    </div>)): <div>
        Teams available on login
    </div>


  return (
    <div className="flex" >
        <div className={`${isAddNewTeamOpen?'w-5/6':'w-32'} ${isAddWriterToBookMenu?' w-3/6':'block'} transition-all`}>
        <div className={`flex ${selectedBook?'justify-between':''} border-r-2  border-b-2`}>
        <div className=" text-3xl px-2  " >Teams
        <span className='cursor-pointer' onClick={()=>setisAddNewTeamOpen(prev => !prev)}>
            +
        </span>
        </div>

        <div 
        className={`${!selectedBook?'hidden':'block'}`}
        onClick={()=>AddWriterToBook()}
        >
            <Button className=''>
                 +
            </Button>
        </div>
        </div>
        

        {isAddNewTeamOpen ?
             <div style={{
                height:400
            }} className="h-full border-r-2 pt-4">
                <div className='flex items-center' >
                    <div className='text-xl' >Name:</div> 
                    <InputBase
                    value={addTeamNameValue}
                    onChange={(e)=>setaddTeamNameValue(e.target.value)}
                    className='border-b-2 w-full px-2' 
                    />
                </div>

                <div className='flex items-center pt-4' >
                    <div className='text-xl' >Email:</div> 
                    <InputBase
                    value={addTeamEmailValue}
                    onChange={(e)=>setaddTeamEmailValue(e.target.value)}
                    className='border-b-2 w-full px-2' 
                    />
                </div>

                <div className='flex justify-end m-4' >
                    <Button 
                    onClick={()=>{AddNewTeamMember()}} >
                        Add Team Member
                    </Button>
                </div>
            </div>:<div className='h-full border-r-2 flex flex-col items-center'
            style={{
                height:400
            }}
            >
               {TeamMemberDisplay}
            </div>
        }
       
        </div>
   
   <div className={`${isAddNewTeamOpen?'w-32':'w-5/6'} ${isAddWriterToBookMenu?'w-3/6':''} transition-all`}>
        <div className={`${isAddWriterToBookMenu?'flex justify-between':''}  border-b-2 px-2`}>
            <div onClick={()=>setisAddNewTeamOpen(prev => !prev)} className=" text-3xl px-1" >Libary+</div>

            <div onClick={()=>{setisAddWriterToBookMenu(false)
            setselectedBook(null)
            }} className={`${isAddWriterToBookMenu?'block':'hidden'}`} >
                <Button>
                    x
                </Button>
            </div>
        </div>
        
        <div 
        className='flex flex-col overflow-hidden '
        style={{
            height:400,
            overflowY:'auto'
        }}>
            <div className={`flex flex-wrap transition-all ${selectedBook?'':''}`}>
            {LibaryBooksDisplay}
            
            {selectedBook &&
                <div>
                    <div>Name: {selectedBook.name}</div>
                    </div>}
            </div>

            {selectedBook && <div className='border-t border-white w-full p-2'>
                {SelectedBookWritersDisplay}
            </div>

            }

         
        </div>
   </div>
   
</div>
  )
}

export default TeamsModal