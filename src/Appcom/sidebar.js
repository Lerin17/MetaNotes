import React from "react";
import { AppBar, Badge, Box, Button, Card, CardContent, CardMedia, IconButton, Modal, Paper, TextField, Toolbar, Typography } from "@mui/material"

import { FolderOpen, Height, MenuBookOutlined, Timer } from "@material-ui/icons";
import { makeStyles } from "@mui/styles";
import { ClassNames } from "@emotion/react";

import { purple, blue, brown, red, grey, yellow } from '@mui/material/colors'
import { display } from "@mui/system";
import theme from "../theme";



// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import {setTimeout} from 'node:timers/promises';
// import pTimeout from 'p-timeout';

import '../App.css';

// InputBase

// import TeamsModal from "./SidebarCom/TeamsModal";
import { LibaryContext } from "../context/LibaryContext";
import { TagContext } from "../context/tagContext";
import { DashboardContext } from "../context/DashboardContext";
import { bionicContext } from "../context/bionicContext";
import { TeamsContext } from "../context/teamsContext";
import { UserContext } from "../context/userContext";

import { Accordion, AccordionDetails, AccordionSummary, ClickAwayListener, Grow, InputBase, Menu, MenuItem, MenuList, Popper } from "@material-ui/core";
import { Slide, toast, ToastContainer } from "react-toastify";


import NewFolderInteface from "./SidebarCom/NewFolderINT";
import { AnimatePresence, motion } from "framer-motion";

// bionicContext
//errors associated with sidebar functions and options are defined here
import Home from '../svgIcons/home.svg'
import LoginSignup from "./SidebarCom/LoginSignup";
import TeamsModal from "./SidebarCom/TeamsModal";
import ModalCustom from "./Custom/ModalCustom";
import SliderCustom from "../components/CustomComponents/DarKModeSlider";






const usestyle = makeStyles((theme)=> ({
       sidebuttonCon: {
        // backgroundImage: `linear-gradient(to left, white , ${brown[300]})`,
        // [theme.breakpoints.down("sm")]: {
        //     background: 'transparent'
        // },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '4px',
       },

       sidebuttonIcon: {
        // backgroundImage: `linear-gradient(to right, white , ${blue[400]})`,
        display: 'flex',
        justifyContent: 'space-around',
        color: 'green', 
        [theme.breakpoints.up("md")]: {
            justifyContent: 'start'
        },     
    }
    
    }))


function Sidebar (props) {
    // const {clearInitialTextProseValue} = React.useContext(bionicContext)

    const classes = usestyle()
    const {Createbookentry, isLibarymodal,  toggleLibaryModal, LibaryArray, toggleResetTextareas, openBook, selectedBook, newFileSaveError, setnewFileSaveError, ClearTextArea, toggleisNewFolderInterface, isNewFolderInterface, updateCurrentFolderContent, FolderArray,clearCurrentFolder, openFolder, currentFolderContent, saveCurrentFolder, currentFileSelectedInMenu,setcurrentFileSelectedInMenu,} = React.useContext(LibaryContext)

    const {currentTag, isTagMenu, toggleisTagMenu, tagsArray, changeCurrentTag, taggedObjArray, toggleisTagLibaryDisplay,tagsColorPool, handleNewTaginput, userCreatedTagsArray, setnewTagError, newTagError } = React.useContext(TagContext)

    const {isActivateBionicText, setisActivateBionicText, toggleisActivateBionic, clearInitialTextProseValue} = React.useContext(bionicContext)

    const {isLoginModalOpen, toggleLoginModal, notification, setnotification,userData} = React.useContext(UserContext)

    const {isTeamsModalOpen, toggleTeamsModal, teamMembersArray, setteamMembersArray, AddBookToLibary, sharedLibaryBooksArray, userLibaryData} = React.useContext(TeamsContext)

  

    const {addToRecentFiles} = React.useContext(DashboardContext)

    const [currentNewTagColor, setcurrentNewTagColor] = React.useState(null);
    const [currentNewTagName, setcurrentNewTagName] = React.useState(null);

    //used for ui displaying selected file in menu
    const [currentSelectedFileInMenu, setcurrentSelectedFileInMenu] = React.useState();
    //used for ui displaying selected file in menu

    //used for ui toggling the tag pallete 
    const [isNewtagPalette, setisNewtagPalette] = React.useState(false);
     //used for ui toggling the tag pallete 

     //used fot toggling ui associated with filesave Error Modal
     const [isSaveFileErrorsModal, setisSaveFileErrorsModal] = React.useState(false);
    //used fot toggling ui associated with filesave Error Modal

    // const [incomingErrorType, setincomingErrorType] = React.useState();
//components necessary for Errors From Libarycontext and Tagscontext START
    // const notifyNewTagErrors = () => toast.error(newTagError.message, {
    //     position: "top-right",
    //     autoClose: 2000,
    //     hideProgressBar: true,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     transition: Slide,
    //     theme: 'dark'
    //     });

    var t = setTimeout(function() {
        console.log("The timeout has completed");
      }, 2000);
      console.log("Timer ID: " + t);

      setTimeout(()=>{
        console.log('cleared')
        clearTimeout(t);
      },1000)
      

    // const LogOut = () => setTimeout(100, 'result')



        const notify = () => toast.success(notification.message, {
            position: "bottom-left",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            closeButton: true,
            theme:"dark"
           })
        
           const  notifyerror = () => toast.error(notification.message, {
            position: "top-left",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            closeButton: true,
            theme:"dark"
           })
        
           console.log(notification)
        
        //    setTimeout(() => {
        //     notify()
        //    }, 3000);

        React.useEffect(() => {
            if(notification){
                if(notification.type == 'error' && notification.instance == 'TAGS'){
                    notifyerror()
                    setnotification(null)
                    return
                }
                if(notification.instance == 'TAGS'){
                    notify()
                    console.log('notification run')
                    setnotification(null)
                }
              
            }
           }, [notification]);
        
           React.useEffect(() => {
            if(notification){
                if(notification.type == 'error' && notification.instance == 'TEAMS'){
                    notifyerror()
                    setnotification(null)
                    return
                }
                if(notification.instance == 'TEAMS'){
                    notify()
                    console.log('notification run')
                    setnotification(null)
                }
              
            }
           }, [notification]);

           React.useEffect(() => {
            if(notification){
                if(notification.type == 'error' && notification.instance == 'LIBARYSAVE'){
                    notifyerror()
                    setnotification(null)
                    return
                }
                if(notification.instance == 'LIBARYSAVE'){
                    notify()
                    console.log('notification run')
                    setnotification(null)
                }
              
            }
           }, [notification]);


        const toggleOnClose = () =>{
            setisSaveFileErrorsModal(false)
               setnewFileSaveError({
                message: null,
                notificationType: null
            })
        }

        // const notifySaveFileErrors = () => toast.warning(newFileSaveError.message, {
        //     position: "top-right",
        //     autoClose: 2000,
        //     hideProgressBar: true,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //     transition: Slide,
        //     theme: 'dark'
        //     });       

    const SaveFileErrorsModalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    }

    const SaveFileErrorsModal = () => {
        console.log(newFileSaveError)
        return (
            <Modal
            open={isSaveFileErrorsModal}
            onClose={()=>toggleOnClose()}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={SaveFileErrorsModalStyle}>
                <div className="text-lg" >
                {/* Text in a modal */}
                {newFileSaveError?newFileSaveError.message:'Error not available'}
                    <div className="flex mt-4" >
                        <Button variant="outlined" className="text-black mr-2 border-2 border-black bg-amber-400" >Ignore</Button>
                        <Button variant="outlined" className="text-black border-2 border-black bg-green-400" >
                            <IconButton className="p-0 hover:bg-transparent" ><i className="ri-save-3-line text-black p-0"></i></IconButton>
                            Save File</Button>
                    </div>
                </div>
              {/* <Typography id="modal-modal-title" variant="h6" component="h2">
                
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
               
              </Typography> */}
            </Box>
          </Modal>
        )
    }


 //components necessary for Errors From Libarycontext and Tagscontext END       

    // React.useEffect(() => {
        
    // }, []);
//declaratively prompt Tag Errors and File Save Errors Respectively 
//START
    // React.useEffect(() => {
    //     if(newTagError.message && newTagError.notificationType){
    //         notifyNewTagErrors() 
    //         setnewTagError({message: null,
    //             notificationType: null})
    //     }
      
    // }, [newTagError]);


    React.useEffect(() => {
        if(newFileSaveError.message && newFileSaveError.notificationType){

            // if(newFileSaveError.notificationType){
            //     notifySaveFileErrors()
            // }
            // notifySaveFileErrors()
            setisSaveFileErrorsModal(true)
         
        }
     
    }, [newFileSaveError]);
 //END
//declaratively prompt Tag Errors and File Save Errors Respectively 


    //reset new tag inputs
    React.useEffect(() => {
        setcurrentNewTagName('')
        setcurrentNewTagColor(null)
        setisNewtagPalette(false)
    }, [tagsArray]);

    React.useEffect(() => {
        if(selectedBook){
            setcurrentFileSelectedInMenu(selectedBook.bookid)
        }
       
    }, [selectedBook]);

   
    // const [open, setOpen] = React.useState(false);
    
  

    const MainModalstyles = [`absolute top-28 md:left-96  z-20 ${isTagMenu?'left-72':'left-96'}   -translate-x-1/2   bg-transparent   pb-3 md:ml-5 lg:ml-28`]

    const subModalstyles = ['']


    const Sidebarbuttoncom = (props) => {
        const bgColor = props.color
        return (
        <div 
        style={{
            background:'#ffffff54'
        }} className={`w-full  rounded-lg  ${props.isActive?'scale-105 bg-black':''} cursor-pointer   md:mt-4 lg:mt-4 p-1 relative shadow-md hover:scale-105 transition-all `} >


           
            <div className=" lg:mr-0 xl:mr-0 md:mr-0  ">
                    <div className= {classes.sidebuttonCon} >
                    
                        <div   onClick={()=> {
                               if(props.text == 'New'){
                        
                                clearInitialTextProseValue()
                            }
                             props.handleClick()
                        }
                         
                           } className="px-1" >
  
                        {props.icon}
                       
               
                        </div>
                      
                       

                        <div className="hidden  xl:block self-center justify-start w-full " >
                         
                            <div 

                            style={{
                                //  webkitTextStroke:"1px black"
                            }}
                   
                 sx={{ minHeight: 0, minWidth: 0, padding: 0 }} className = {`${props.isActive?'text-white':'text-slate-700'}  capitalize font-header5`}  variant= "text" >
                            {props.text}
                            </div>
                        </div>
                    </div>
            </div>
        </div>
       
        )
    }

    const FolderComponent = (props) => {
        let folderName = props.name
        folderName = folderName.length > 8? `${folderName.substring(0, 8)}...`: folderName
        // name: currentFolderName,
        // description: currentFolderDescription,
        // folderId: currentFolderID,
        // content: currentFolderContent
        // FolderArray

        const badgeContent = props.content.length 

        return (
            <div className="w-16 h-20 cursor-pointer  transition-all hover:scale-105 hover:bg-white bg-gradient-to-l from-gray-400 via-gray-300 to-gray-500 rounded-r mt-1 mr-1 border-r border-white flex flex-col items-center" >
                <div onClick={()=>{
                     setisActivateBionicText(false)
                    saveCurrentFolder()
                    openFolder(props.folderid)}} className="p-2" >
                    <Badge  badgeContent={badgeContent}>
                        <svg className="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32"><path fill="none" d="M0 0h24v24H0z"/><path d="M3 21a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h7.414l2 2H20a1 1 0 0 1 1 1v3h-2V7h-7.414l-2-2H4v11.998L5.5 11h17l-2.31 9.243a1 1 0 0 1-.97.757H3zm16.938-8H7.062l-1.5 6h12.876l1.5-6z"/>
                        </svg>
                    </Badge>
                   
                </div>
                <div className="text-xs border-t border-black" >
                    {folderName}
                </div>
            </div>
        )
    }

    const currentFolderContentIDs = currentFolderContent.map(item => item.bookid)
  
    const randomxe = () => Math.floor( Math.random() * 10)

    const degree = String(randomxe() * 100) 

    console.log(degree, 'random')

    const Filecomponent = (props) => {
        let fileTitle = props.title
        fileTitle = fileTitle.length > 8? `${fileTitle.substring(0, 8)}...`: fileTitle

        const currentSharedBooksIDs = sharedLibaryBooksArray.map(item => item.bookid)

        console.log(currentSharedBooksIDs.includes(String(props.bookid) ), 'sharedBooksIDs')
        console.log(props.bookid)

        console.log(typeof(degree))

        return (
            <div className={`w-16 border-gray-300 border-r border-b ${isNewFolderInterface? currentFolderContentIDs.includes(props.bookid)?'opacity-50':'':''}  bg-gradient-to-l from-gray-700 via-gray-700 to-gray-900 mr-1 mt-1  flex flex-col ${currentFileSelectedInMenu == props.bookid?'text-blue-600 border':''}`} >
                <div className="  self-center "  >
                <IconButton onClick={(e)=>{
                    addToRecentFiles(props.allbookData)
                    clearInitialTextProseValue()
                    console.log(e, 'event')
                    openBook(props.bookid, false, null)}} className="hover:bg-transparent py-0 " >
                <i className=" ri-file-list-2-line text-gray-300 "></i>
                </IconButton>
                </div>
                
                <div className="text-xs px-1 w-full text-center self-center  text-gray-200" >{fileTitle}</div>  

            <div className="w-full flex justify-center  p-1 bg-gray-700" >
                <div className={`${isNewFolderInterface?'block w-full ':'hidden'}`} onClick={()=>{
                    setisActivateBionicText(false)
                    updateCurrentFolderContent(props.allbookData)
                }} >
                    <div className="bg-gradient-to-l from-gray-400 via-gray-200 to-gray-300 text-sm hover:bg-green-500 transition-all text-center font-header5 cursor-pointer font-bold" >
                         Add
                    </div>
                </div>

                <div className={`${isNewFolderInterface?'hidden':'block'} cursor-pointer`} >
                    <svg xmlns="http://www.w3.org/2000/svg" className='text-gray-300 hover:text-red-600 transition-all fill-current' width="16" height="16" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/></svg>
                </div> 

                 <div 
                 onClick={()=>AddBookToLibary(props.bookid, props.title, props.allbookData )}
                 className={`${isNewFolderInterface?'hidden':`block`} cursor-pointer ml-4`} >
                        <svg xmlns="http://www.w3.org/2000/svg" className={`${ currentSharedBooksIDs.includes(String(props.bookid))?'text-blue-600':'text-gray-300 hover:text-blue-600'}  transition-all fill-current`} width="16" height="16" viewBox="0 0 24 24"><path d="M5 7c2.761 0 5 2.239 5 5s-2.239 5-5 5c-2.762 0-5-2.239-5-5s2.238-5 5-5zm15-4c0-1.657-1.344-3-3-3-1.657 0-3 1.343-3 3 0 .312.061.606.148.888l-4.209 3.157c.473.471.877 1.009 1.201 1.599l4.197-3.148c.477.317 1.048.504 1.663.504 1.656 0 3-1.343 3-3zm-5.852 17.112c-.087.282-.148.576-.148.888 0 1.657 1.343 3 3 3 1.656 0 3-1.343 3-3s-1.344-3-3-3c-.615 0-1.186.187-1.662.504l-4.197-3.148c-.324.59-.729 1.128-1.201 1.599l4.208 3.157zm6.852-5.05c1.656 0 3-1.343 3-3s-1.344-3-3-3c-1.281 0-2.367.807-2.797 1.938h-6.283c.047.328.08.66.08 1s-.033.672-.08 1h6.244c.395 1.195 1.508 2.062 2.836 2.062z"/></svg>
                </div> 
                </div>

               
              
            </div>     
        )
    }



    const Tagcomponent = (props) => {
        const tag = props.color
      

        const colors = [
            {name:'red', value: '#ff4500'}, 
            {name:'blue', value: "#4169e1"}, 
            // {name:'grey', value:grey}, 
            {name:'yellow', value:"	#ffd700"},
            {name: 'purple', value:"#9932cc"},
            {name: 'black', value:"#000000"},
            {name:'green', value:'#06c034'},
            {name:"violet", value:""},
            {name:"moccasin", value:""},
            {name:"maroon", value:""},
            {name:'teal', value:''},
            {name:'loghtsteelblue', value:''}

        ]

        const currentcolor = colors.find(item => item.name == tag)
        const iscurrenttag = currentTag == props.name
    

        // console.log(currentcolor)
        const style = `${iscurrenttag?'border-2':'border-none'} w-full px-1`
        // <Box sx={{ color: 'text.secondary' }}>Sessions</Box>

        return(
            <Box  sx={{ backgroundColor: currentcolor.value}} className={style}>
            {/* <div className="  "  >
            <IconButton className="hover:bg-transparent py-0 " >
            <i className=" ri-file-list-2-line text-gray-300 "></i>
            </IconButton>
            </div> */}
            
            <div className={`text-sm font-bold self-center text-black`} >{props.name} {props.color}</div>  

            <div className="flex" >
            <div className="mr-2" ><i className="ri-delete-bin-2-line hover:text-red-700"></i></div>

            <div onClick={()=>changeCurrentTag(props.name)} className="mx-2" ><i className="ri-price-tag-3-line hover:text-gray-200"></i></div>

            <div onClick={()=>toggleisTagLibaryDisplay()} className="ml-2" ><i className="ri-folder-open-line hover:text-gray-200"></i></div>
            </div>
             
        </Box>     
        )
    }

    const TagsColorPoolPalette = () => {
    const unavailableColors = userCreatedTagsArray.map(item => item.color)
    // const unavailableName = userCreatedTagsArray.map(item => item.name)

 
  

    const display =  tagsColorPool.map((item,i) => <div key={i} onClick={()=>setcurrentNewTagColor(item.color)} className={`w-1/4 font-header2 text-xs capitalize border ${unavailableColors.includes(item.color)?'opacity-20 ':'opacity-100 hover:scale-105'} transition-all ${currentNewTagColor == item.color? 'border-4 border-white rounded': 'border-none'}`} style={{background: item.color,
        color: item.textPaletteColor}} >
            <div style={{
                borderBottom: `${item.textPaletteColor} 2px solid`
            }} className="" >
                 {item.color}
            </div>
           
        </div>)
        
        return (
            <div className="flex flex-wrap w-full  h-32" >
                {display}
            </div>
            // color: 'purple'}, 
            // { textPaletteColor 
        )
    }

    // console.log(TagsColorPoolPalette())

    const Tagsdisplay = tagsArray.length? tagsArray.map((item, i)=>{
    return (
        <div key={i} >
            <Tagcomponent
            name={item.name}
            color={item.color}
            />
        </div>
    )
    }):'tags not available'

    const Filedisplay = LibaryArray.length? LibaryArray.map((item,i) => <div key={i}>
        <Filecomponent
        key ={i}
        title= {item.bookTitle}
        bookid = {item.bookid}
        allbookData = {item}
        // isFileSelected = {false}
        />
    </div> ):<div className=" text-xl">
    Empty, No Docs available
    </div>

const Folderdisplay = FolderArray.map((item, i)=>{
        // name: currentFolderName,
        // description: currentFolderDescription,
        // folderId: currentFolderID,
        // content: currentFolderContent
        return (
            <div key={i} >
            <FolderComponent
            key={i}
            name={item.name}
            description={item.description}
            folderid={item.folderId}
            content ={item.content}
            />
            </div>
        )

})

// setTimeout(() => {
//     setnotification(true)
// }, 3000);

// console.log(userData, 'userData')

    return (
<div 
style={{
    // background:'#699D98'
}}
className={`h-full  flex flex-col w-full  justify-start redx relative  ${props.isOpenSideBar?'':''}`}>


{/* SIDEBAR BORDER */}
<motion.div
        animate={props.isOpenSideBar ? {
            x: 200,
            
    
        }:{
            x:'0%',
          
        }}

        initial={{
            
        }}

        transition={{
            // type:'tween',        
        }}

        style={{
            width: props.isOpenSideBar?600:'2px'
        }}
        className={`h-full  top-0 absolute  z-30 ${props.isOpenSideBar?' blurred shadow':'right-0 '} `}
        >
            
        </motion.div>
        {/* SIDEBAR BORDER */}


        <div className="absolute z-30">
        {/* <ToastContainer /> */}
        </div>
        <SaveFileErrorsModal/>
        <div className="bg-white text-gray-400 mx-auto    text-6xl p-4 font-header1 w-16 h-20 z-20 relative flex justify-center items-center" >
       
        

        <AnimatePresence>
            {userData &&     
                <div
                className="font-header2 uppercase"
                >
                {!isLoginModalOpen &&

                <AnimatePresence>
                    <motion.div 
                    style={{
                        WebkitTextStroke:"1px gray",
                        
                    }}
                    initial={!isLoginModalOpen && {y:30}} transition={{type:'spring', stiffness:100}} animate={!isLoginModalOpen &&{y:0}}>
                        {userData.username[0]}                   </motion.div>
                </AnimatePresence>
                
                }
            </div>
            }
         </AnimatePresence>
            

    

         <AnimatePresence>
            {!userData &&     
                <div>
                {!isLoginModalOpen &&
                    <div
                       style={{
                        WebkitTextStroke:"4px #1E293B"
                    }}
                    >
                        m
                    </div>
                }
            </div>
            }
            {/* {Boolean(!userData)   &&
                           <motion.div transition={{type:'tween', duration:'0.3'}} initial={{y:0}} exit={isLibarymodal && {y:40, zIndex:1}} className={` absolute z-20 `} >
                           m
                        </motion.div>
            } */}
         </AnimatePresence>

         
  
        </div>
        <div className={`flex relative z-20 md:flex-col lg:flex-col mx-auto  lg:w-fit md:w-fit `}>

      
              
        <Sidebarbuttoncom
        icon = {
            <svg className="text-slate-800 fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 7.001c0 3.865-3.134 7-7 7s-7-3.135-7-7c0-3.867 3.134-7.001 7-7.001s7 3.134 7 7.001zm-1.598 7.18c-1.506 1.137-3.374 1.82-5.402 1.82-2.03 0-3.899-.685-5.407-1.822-4.072 1.793-6.593 7.376-6.593 9.821h24c0-2.423-2.6-8.006-6.598-9.819z"/></svg>

            // // <img src="../svgIcons/home.svg" alt="SVG as an image"></img>
            // <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-700 fill-current" width="24" height="24" viewBox="0 0 24 24"><path d="M12 6.453l9 8.375v9.172h-6v-6h-6v6h-6v-9.172l9-8.375zm12 5.695l-12-11.148-12 11.133 1.361 1.465 10.639-9.868 10.639 9.883 1.361-1.465z"/>
            // </svg>
        }
        text = 'Profile'
        color = '#224341'
        handleClick = {toggleLoginModal}
        />

        
        {/* <Sidebarbuttoncom
        icon = {
            <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-700 fill-current" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7 14h-8v-9h2v7h6v2z"/></svg>
        }
        text = 'Recents'
        color = '#3D3FB9'
        // handleClick = {}
        /> */}

        <Sidebarbuttoncom
        icon = {    
        <svg xmlns="http://www.w3.org/2000/svg" className="text-slate-800 fill-current" width="24" height="24" viewBox="0 0 24 24"><path d="M15.563 22.282l-3.563.718.72-3.562 2.843 2.844zm-2.137-3.552l2.845 2.845 7.729-7.73-2.845-2.845-7.729 7.73zm-3.062 2.27h-7.364v-7h12.327l6.673-6.688v-2.312l-4-4h-18v22h9.953l.411-2zm-5.364-18h12v7h-12v-7zm8.004 6h2.996v-5h-2.996v5z"/></svg>
                }
        text = 'Save'
        handleClick = {Createbookentry}
        color = '#0099FF'
        />

       {/* <SideButtonacc
       /> */}

        <Sidebarbuttoncom
        icon =  {
        <svg xmlns="http://www.w3.org/2000/svg" className="text-slate-800 fill-current" width="24" height="24" viewBox="0 0 24 24"><path d="M7.972 2h-6.972l.714 5h2.021l-.429-3h3.694c1.112 1.388 1.952 2 4.277 2h9.283l-.2 1h2.04l.6-3h-11.723c-1.978 0-2.041-.417-3.305-2zm16.028 7h-24l2 13h20l2-13z"/></svg>
        }
        text = 'Libary'
        handleClick = {toggleLibaryModal}
        color = '#0068FF'
        />

        <Sidebarbuttoncom
        icon = {
        <svg xmlns="http://www.w3.org/2000/svg" className="text-slate-800 fill-current" width="24" height="24" viewBox="0 0 24 24"><path d="M10.606 0h-10.606v10.609l13.393 13.391 10.607-10.606-13.394-13.394zm-7.02 6.414c-.782-.785-.781-2.047 0-2.83.782-.782 2.049-.779 2.829-.001.783.783.782 2.048 0 2.831-.783.781-2.046.781-2.829 0zm9.807 14.757l-8.484-8.484 7.778-7.778 8.486 8.485-7.78 7.777zm3.534-6.36l-5.656-5.656.707-.709 5.656 5.657-.707.708zm-1.414 1.414l-5.656-5.656.707-.707 5.656 5.656-.707.707zm-3.535-.707l-3.534-3.536.707-.706 3.535 3.535-.708.707z"/></svg>
    }
        text = 'tags'
        handleClick = {toggleisTagMenu}
        color = '#FB3E2B'
        />

        <Sidebarbuttoncom
        icon = {
        <svg xmlns="http://www.w3.org/2000/svg" className="text-slate-800 fill-current" width="24" height="24" viewBox="0 0 24 24"><path d="M18.5 15c-2.483 0-4.5 2.015-4.5 4.5s2.017 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.017-4.5-4.5-4.5zm2.5 5h-2v2h-1v-2h-2v-1h2v-2h1v2h2v1zm-7.18 4h-12.82v-24h8.409c4.857 0 3.335 8 3.335 8 3.009-.745 8.256-.419 8.256 3v2.501c-.771-.322-1.614-.501-2.5-.501-3.584 0-6.5 2.916-6.5 6.5 0 1.747.696 3.331 1.82 4.5zm-.252-23.925c2.202 1.174 5.938 4.883 7.432 6.881-1.286-.9-4.044-1.657-6.091-1.179.222-1.468-.185-4.534-1.341-5.702z"/></svg>
        }
        text = 'New'
        handleClick = {
            ClearTextArea}
        color = '#DCD9D8'
        />

        <Sidebarbuttoncom
        icon = {
            <svg xmlns="http://www.w3.org/2000/svg" className={`${isActivateBionicText?'text-white':' text-slate-800'}  fill-current`} width="24" height="24" viewBox="0 0 24 24"><path d="M15 12c0 1.657-1.343 3-3 3s-3-1.343-3-3c0-.199.02-.393.057-.581 1.474.541 2.927-.882 2.405-2.371.174-.03.354-.048.538-.048 1.657 0 3 1.344 3 3zm-2.985-7c-7.569 0-12.015 6.551-12.015 6.551s4.835 7.449 12.015 7.449c7.733 0 11.985-7.449 11.985-7.449s-4.291-6.551-11.985-6.551zm-.015 12c-2.761 0-5-2.238-5-5 0-2.761 2.239-5 5-5 2.762 0 5 2.239 5 5 0 2.762-2.238 5-5 5z"/></svg>
        }
        text = 'Bionic'
        handleClick = {toggleisActivateBionic}
        isActive = {isActivateBionicText}
        color = '#DCD9D8'
        />

        <div className="relative">
                {userLibaryData &&  <div className="absolute font-bold -right-2 text-sm z-10 px-1 text-slate-100 cursor-pointer hover:scale-110 transition-all bg-green-600  top-2 ">
                               {userLibaryData.booksReceivedArray.length}
                            </div>}

        <Sidebarbuttoncom
        icon = {
            <svg xmlns="http://www.w3.org/2000/svg" className='text-slate-800 fill-current' width="24" height="24" viewBox="0 0 24 24"><path d="M5 7c2.761 0 5 2.239 5 5s-2.239 5-5 5c-2.762 0-5-2.239-5-5s2.238-5 5-5zm15-4c0-1.657-1.344-3-3-3-1.657 0-3 1.343-3 3 0 .312.061.606.148.888l-4.209 3.157c.473.471.877 1.009 1.201 1.599l4.197-3.148c.477.317 1.048.504 1.663.504 1.656 0 3-1.343 3-3zm-5.852 17.112c-.087.282-.148.576-.148.888 0 1.657 1.343 3 3 3 1.656 0 3-1.343 3-3s-1.344-3-3-3c-.615 0-1.186.187-1.662.504l-4.197-3.148c-.324.59-.729 1.128-1.201 1.599l4.208 3.157zm6.852-5.05c1.656 0 3-1.343 3-3s-1.344-3-3-3c-1.281 0-2.367.807-2.797 1.938h-6.283c.047.328.08.66.08 1s-.033.672-.08 1h6.244c.395 1.195 1.508 2.062 2.836 2.062z"/></svg>
        }
        text = 'Teams'
        handleClick = {toggleTeamsModal}
        // isActive = {isActivateBionicText}
        color = '#DCD9D8'
        />
        </div>
      
      

        
      

    



    <Modal
        open={isLibarymodal}
        onClose={toggleLibaryModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        disableAutoFocus={true}
      >
     
        <Box className={MainModalstyles} sx={{ width: 700, height: 600, 
        "& .MuiOutlinedInput-notchedOutline": {
            border: "0 none",
          },
    }}    >
        <div className="flex" >
            <div style={{
            height: 600
            }} className= 'w-4/5 ' >
                <div className=" flex justify-between px-2 py-1 border-b-4 border-black text-black text-3xl font-header5" >
                    <div>Libary</div>

                   
                    {/* clearCurrentFolder */}
                    {!isNewFolderInterface?   <div className="cursor-pointer hover:text-green-400 transition-all" onClick={()=>
                    {clearCurrentFolder()
                    toggleisNewFolderInterface()}} >New Folder</div>:
                   <div className="cursor-pointer hover:text-green-400 transition-all" onClick={()=>clearCurrentFolder()} >New Folder+</div>}
                 

                    </div>

                

                <div
                style={{
                    height:500,
                    overflowY:'auto'
                }}
                className={` flex-wrap ${LibaryArray.length? FolderArray.length?'flex':'flex-col':""}`} > 

                <div className="w-full">
                <div  className={`${FolderArray.length?'':'hidden'} mt-1 w-full flex`}>
                        <button
                        style={{
                            // background:'#79838b'
                        }}
                        className="px-2 py-1 bg-gradient-to-l from-blue-700 via-cyan-600 to-blue-900 
                        w-3/12 text-white
                        shadow-md font-header5 rounded ">
                        Hide Folders
                            </button>

                            <div className="w-8/12 border-b-2 flex ml-2">
                            <button className=" transition-all   rounded ml-2  font-header5 flex  text-white justify-start">
                            Search
                            </button>
                            <input
                            className="w-full bg-transparent"
                            />
                            </div>
                       
                    </div>

                    <div className="flex mt-2 flex-wrap">    
                   {Folderdisplay}
                   {Filedisplay}
                    </div> 

                    {/* <div className="flex flex-wrap">    
             
                    </div> */}
                </div>

                  
                
           
                 
                    
                   

                  
                    {/* <div className="w-20 p-2 bg-gray-600 " >
                    <IconButton className="hover:bg-transparent py-0" >
                    <i className=" ri-file-list-2-line text-white"></i>
                    </IconButton>
                    <div>Name</div>    
                    </div> */}
                </div>
            </div>

            {isNewFolderInterface?
                <div className=" w-2/5 " >
                <NewFolderInteface
                key={3}
                />
            </div>:<div className="w-2/5" onClick={toggleLibaryModal} >

            </div>

            }
            
         
        </div>
           

        </Box>

 
  
        
      </Modal>

    {/* tag menu and modal */}
      <Modal
        open={isTagMenu}
        onClose={()=>{toggleisTagMenu()
            setisNewtagPalette(false)}}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <div   className={` ${MainModalstyles} border-none`} style={{ width: 400 , height: 500, "& .MuiOutlinedInput-notchedOutline": {
            border: "0 none",
          } }}
          >
       
            <div style={{height:600}} className="border-none" >
                <div className="text-2xl">
                Tags
                </div>
               
            {/* <ToastContainer /> */}
                <div className="bg-gray-800 py-1 text-white font-bold px-2 flex justify-between font-header5" >
                   <div>
                     Tags
                    </div>

                    <div className="cursor-pointer" onClick={()=>toggleisTagLibaryDisplay()}>
                     TagsLibary
                    </div>
                </div>

                <div className="flex flex-col" > 
                    {Tagsdisplay}
                    {/* <div className="w-20 p-2 bg-gray-600 " >
                    <IconButton className="hover:bg-transparent py-0" >
                    <i className=" ri-file-list-2-line text-white"></i>
                    </IconButton>
                    <div>Name</div>    
                    </div> */}
                    <div className="px-2 bg-white border-2 border-black border-dashed text-2xl font-bold flex items-center" >
                        <div className="w-2/3" >
                        <InputBase  placeholder="Create new tag" variant="outlined"
            value={currentNewTagName}
            onChange={(event)=>setcurrentNewTagName(event.target.value)}
            />
                            {/* <input type="text" 
                            className="bg-transparent font-bold w-full"
                            placeholder="Create new tag"
                            value={currentNewTagName}
                            onChange={(event)=>setcurrentNewTagName(event.target.value)}
                            /> */}
                        </div>
                       
                        <div className="w-1/3" >
                        <IconButton onClick={()=>setisNewtagPalette(prev => !prev)} className="hover:bg-transparent"  >
                        <i className="ri-palette-fill text-yellow-500"></i>
                        </IconButton>

                        <IconButton className="hover:bg-transparent" onClick={()=>handleNewTaginput(currentNewTagName, currentNewTagColor)} >
                        <i  className="ri-save-2-line text-black"></i>
                        </IconButton>

                        
                        </div>
                        
                    </div>
                   <div className={`${isNewtagPalette?'animate-fadeVertical block ':'hidden'}`} >
                    <TagsColorPoolPalette/>
                   </div>
                    
                    
                </div>
            </div>
        </div>
      </Modal>

      <Modal 
      open={isTeamsModalOpen}
      onClose={()=>toggleTeamsModal()}
      >
    <div className="" >
        <Box className={MainModalstyles} sx={{ width: 600, height: 550, 
        "& .MuiOutlinedInput-notchedOutline": {
            border: "0 none",
          },
    }}    >
            <div
          
            className="" >
                <div style={{
                      
                        // background: '#4C4D52'
                    
                // height: 400
                }} className= 'w-full ' >
                    <TeamsModal
                    key={'teamsModal'}
                    />
                </div>
            </div>
        </Box>

 
    </div>     
     </Modal>

      <Modal 
      open={isLoginModalOpen}
      onClose={()=>toggleLoginModal()}
      >
    <div className="" >
        <Box className={MainModalstyles} sx={{ width: 550, height: 400, 
        "& .MuiOutlinedInput-notchedOutline": {
            border: "0 none",
          },
    }}    >
        <div className=" " >
            <div style={{
            height: 400
            }} className= 'w-full rounded-full' >
                
                    <LoginSignup/>
                            
            </div>         
        </div>
        </Box>
    </div>     
     </Modal>
    </div>
</div>)
}

export default Sidebar