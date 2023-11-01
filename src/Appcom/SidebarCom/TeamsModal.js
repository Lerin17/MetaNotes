import { Button, InputBase, IconButton, Switch, Badge } from '@mui/material'
import React from 'react'
import { TeamsContext } from '../../context/teamsContext'
import { UserContext } from '../../context/userContext'

import uniqolor from 'uniqolor';
import { LibaryContext } from '../../context/LibaryContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WaitingIcon from '../Utility/WaitingIcon';




const TeamsModal = () => {

   const randomColor = () => (uniqolor.random().color)

    const {isAddNewTeamOpen, setisAddNewTeamOpen,  setaddTeamEmailValue, setaddTeamNameValue,addTeamNameValue, addTeamEmailValue, AddNewTeamMember,teamMembersArray,sharedLibaryBooksArray,isAddWriterToBookMenu, setisAddWriterToBookMenu, OpenBook, selectedBook, setselectedBook,writersToAddArray, setwritersToAddArray, AddWriterToBook, isWaiting, isMessagesOpen, setisMessagesOpen, userLibaryData, AcceptBook } = React.useContext(TeamsContext)

    const {LibaryArray, openBook} = React.useContext(LibaryContext)

    const {notification, setnotification, userData} = React.useContext(UserContext)  
    
    const [issharedWriterLibary, setissharedWriterLibary] = React.useState(false);

    

    
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

    const selectWriter = (id) => {
        const isWriter = writersToAddArray.find(item => (item.writerid == id))

        if(isWriter){
            setwritersToAddArray(prev => prev.filter(item => (item.writerid !== id)))
        }else{
            setwritersToAddArray(prev => [...prev, {writerid:id}]) 
        }
    }

    React.useEffect(() => {
       if (!selectedBook){
            setwritersToAddArray([])
        }
    }, [selectedBook]);

    console.log(userLibaryData, 'goddman')

    const unansweredInviteMessages = userLibaryData?userLibaryData.booksReceivedArray.filter(item => (!item.Accepted)):[]

    const InviteMessages = unansweredInviteMessages.map(item => {
        if(!item.Accepted){
            return     (<div className='flex items-center justify-between py-1 border-b text-black px-1'>
            <div className=''>
          join  {item.From.username}'s book: <span className='font-bold'>
            {item.bookName}
                </span> 
            </div>
        
        
            <Button onClick={()=>AcceptBook({bookid:item.bookData.bookid})} className=''>
                Accept
            </Button>
           
        </div>)
        }
    } )

    const SingleTeamMemberAvatar = (props) => {

        const id = props.id
        const writersToAddArrayIds = writersToAddArray.map(item => (item.writerid))
        
        return (
            <div className={`flex flex-col justify-center items-center p-1 ${writersToAddArrayIds.includes(props.id)?'':''}`}>
                        <div 
            onClick={()=>{selectedBook? selectWriter(id): console.log('do nothing')}}
            style={{
                backgroundColor:randomColor({lightness: [50, 80]})
            }}
            className={`rounded-full w-10 h-10 bg-white text-white cursor-pointer hover:scale-125 transition-all ${writersToAddArrayIds.includes(props.id)?'border border-black border-2':''}  mt-2 flex items-center justify-center uppercase text-xl font-bold`}>
                {props.name[0]}
            </div>

            <div>
                {selectedBook && <div className='text-xs text-white'>
                    {props.name}
                    </div>}
            </div>
            </div>
        
        )
    }

    const SelectedBook = () => {

    }


    // useEffect(() => {
        
    // }, []);

    // const jack = selectedBook.writers.

    // const currentBook = selectedBook? sharedLibaryBooksArray.find(item => (item.bookid == selectedBook.bookid)):null

    console.log(selectedBook, 'selectedBooks')

    // React.useEffect(() => {
        
    // }, []);

    // console.log(currentBook, 'currentBook')

    const SelectedBookWritersDisplay = selectedBook?.writers.length? selectedBook.writers.map(writer => (<div>
        {writer.name}
    </div>)):<div  className='text-red-800 font-bold px-2'>
    No writers Assigned to this book
    </div>

    // React.useEffect(() => {
    //     const updatedSelectedBook
    //     setselectedBook()
    // }, [userLibaryData]);
    // console.log(selectedBook)



    const SingleLibaryBook = (props) => {
        let fileTitle = props.title
        fileTitle = fileTitle.length > 8? `${fileTitle.substring(0, 8)}...`: fileTitle
     
        return (
            <div className='border'>
                {(!selectedBook || selectedBook.bookid == props.id) &&
                      <div className={`${isAddNewTeamOpen?'w-24':'w-20'} transition-all  bg-gray-500 flex flex-col `} >
                      <div className="  self-center "  >
                      <IconButton   className="hover:bg-transparent py-0 " >
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

    const AcceptedBooksArray = userLibaryData? userLibaryData.booksReceivedArray.filter(item => (item.Accepted)):[]

    console.log(userLibaryData,'l;;')
    console.log(AcceptedBooksArray, 'accepted')

    const LibaryBooksShareWithMe = AcceptedBooksArray.length?  AcceptedBooksArray.map(item => {
        
           return  (<div onClick={()=>{openBook(null ,true, item)}}
         
        
           className=' m-1 cursor-pointer border border-red-400'>
              <SingleLibaryBook
              title={item.bookData.name}
              book = {item}
              id={item.bookData.bookid}
              />
           
        </div>)
        
    }):<div className='text-red-600 bg-white  px-2'>
       $#!@, No books shared with you 
    </div>

    const LibaryBooksDisplay = userLibaryData?.sharedBooks.length? userLibaryData.sharedBooks.map ((item,i) => (
        <div key={i} onClick={()=>OpenBook(item)} className=''>
             <SingleLibaryBook
             key={i}
             title={item.name}
             writers={item.writers}
             id={item.bookid}
             book={item}
             />
        </div>   
    )):<div className='px-2'>
      {!userData?' Books Libary available on login':'No books in books libary'}
  
    </div>

    console.log(LibaryBooksDisplay, 'Libary')

    const TeamMemberDisplay = teamMembersArray.length? teamMembersArray.map((item,i) => (<div key={i} className='mx-1'>
        <SingleTeamMemberAvatar
        key={i}
        name= {item.name}
        id={item.writerid}
        writer ={item}
        />
    </div>)): <div
    style={{
        
    }}
    className=' font-bold'>
         {!userData?'':!'! No cells created yet'}
        
    </div>


  return (
    <div className="flex " >
        <div className={`${isAddNewTeamOpen?'w-5/6':'w-5/6'} ${isAddWriterToBookMenu?' w-3/6':'block'} transition-all`}>
        <div className={`flex ${selectedBook?'justify-between':''} border-r-4  border-black`}>

        <div className="h-12 border-b-4 border-black px-2 flex w-full items-center justify-between" >
            <div
             style={{

                // color:'#4C4D52'
            
        }} 
            onClick={()=>setisAddNewTeamOpen(false)} className={` cursor-pointer font-header5 text-black  mb-1 ${isAddNewTeamOpen?'text-4xl':' text-3xl'}`}>
                Teams
            </div>

            
            <div className='cursor-pointer  p-1 rounded-lg bg-gradient-to-l from-gray-300 via-gray-200 to-gray-300  shadow-md   transition-all relative' onClick={()=>setisMessagesOpen(prev => !prev)}>

                    <div className='absolute text-sm text-white font-bold top-0 right-0 -mt-4'>
                        4
                    </div>
                  
                    <svg className=' h-6 fill-current hover:bg-none text-black font-header5 transition-all   w-6 ' xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/></svg>
                
           
              
               
            </div>
           
         
        </div>
    

     
        </div>
        
        
        {!isWaiting? 
        isAddNewTeamOpen ?

                
             <div style={{
                height:400
            }} className="h-full border-black border-r-4 pt-4">
                <div className='flex items-center' >
                    <div
                     style={{

                        color:'#4C4D52'
                    
                }}
                    className='text-xl font-header5 px-2' >Name:</div> 
                    <InputBase
                    value={addTeamNameValue}
                    onChange={(e)=>setaddTeamNameValue(e.target.value)}
                    className='border-b-2  w-full px-2' 
                    />
                </div>

                <div className='flex font-header5 items-center pt-4' >
                    <div 
                     style={{

                        // color:'#4C4D52'
                    
                }}
                    className='px-2 text-xl text-slate-700' >Email:</div> 
                    <InputBase
                    value={addTeamEmailValue}
                    onChange={(e)=>setaddTeamEmailValue(e.target.value)}
                    className='border-b-2 w-full px-2' 
                    />
                </div>

                <div className='flex flex-col  m-4' >
                    
                <button 
                style={{
                    color:'#4C4D52'
                }}
                    className=' font-header5 transition-all btn p-1  text-white 
                     border-l-2 border-b-2 border-slate-800  rounded-md self-end'
                    onClick={()=>{AddNewTeamMember()}} >
                        <div className=' py-1 px-2 rounded text-sm '> 
                                 Add Team Member
                        </div>
                       
                    </button>

                    <button
                    style={{
                        
                    }}
                    onClick={()=>setisAddNewTeamOpen(false)}
                    className='transition-all shadow-md btn text-red-500 py-2 px-3  font-header5 text-sm self-start border-l-2 border-b-2 border-slate-800  rounded-md'>
                        Go Back
                    </button>

                </div>
            </div>:<div className='h-full border-r-4 border-black '
            style={{
                height:400
            }}
            >   {isMessagesOpen?<div>
                Messages
                <div className='bg-white text-slate-600 p-1 border-b text-sm'>
                    <span
                    style={{
                        
                    }}
                    className='  border  mx-1'>
                        1
                    </span>
                    join lerin's book: PATH FINDER
                </div>

                {InviteMessages}
            </div>:<div className=''>
                <div 
        className={`${!selectedBook?'hidden':'block'} `}
        onClick={()=>AddWriterToBook()}
        >
            <Button className=''>
                 Add Selected Writers to book
            </Button>
        </div>

<div className='flex px-4 w-full   justify-start'>
                    
        
        <button 
        style={{
            color:'#4C4D52'
        }}
        onClick={()=>setisAddNewTeamOpen(true)} className={`${userData?'':''} ${selectedBook?'hidden':''}  self-end text-stone-500 px-3 py-2 rounded-md hover:border-b hover:border-l transition-all   mt-2  font-header5 transition-all text-sm
       btn  border-b-2 border-l-2 border-stone-700  `}>
           Add New Cells
            </button>

</div>
       
        
        <div className='flex'>
       
          {TeamMemberDisplay}
        </div>
                </div>}
       
            
              
            </div>
        :<div
        style={{
            // height:400
        }}
        className=' flex border-r-2 px-4 pt-4'>
             <WaitingIcon/>
        </div>}

       
        </div>
   
   <div className={`${isAddNewTeamOpen?'w-32':'w-5/6'} ${isAddWriterToBookMenu?'w-3/6':''} transition-all`}>
        <div className={`${isAddWriterToBookMenu?'flex justify-between':''} h-12 border-black border-b-4 px-2`}>
            <div 
            style={{

                    // color:'#4C4D52'
                
            }}
            onClick={()=>setisAddNewTeamOpen(prev => !prev)} className=" text-4xl   cursor-pointer flex font-header5 text-black" >
                Libary
            </div>

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
            <div>

            <div className={` ${selectedBook?'hidden':''} text-sm items-center flex`}>
            <Switch
                onClick={()=>{setissharedWriterLibary(prev => !prev)
                setselectedBook(null)
                }}
                value={issharedWriterLibary}
                />

                    <div className={`font-header5 ${isAddNewTeamOpen?'hidden':''}`}>
                    {issharedWriterLibary?'books shared with you':' books shared with others'}
                    </div>
               
               </div>
                
               
             
            </div>

          
            <div className={`flex flex-wrap transition-all ${selectedBook?'':''} font-header5`}>

                {issharedWriterLibary? LibaryBooksShareWithMe:LibaryBooksDisplay}
          
            
            {selectedBook &&
                <div>
                    <div>Name: {selectedBook.name}</div>

                    <div>
                        No of Writers: {selectedBook.writers.length}
                    </div>
                    </div>}
            </div>

            {selectedBook && <div className='border-t border-white w-full p-2'>
                <div>
                    <Button>
                        Go Back
                    </Button>
                </div>
                <div>
                    Books Writers
                </div>
                <div>
                {SelectedBookWritersDisplay}
                </div>
             
            </div>

            }

         
        </div>
   </div>
   
</div>
  )
}

export default TeamsModal