import React from "react";
import { AppBar, Badge, Box, Button, Card, CardContent, CardMedia, IconButton, Modal, Paper, TextField, Toolbar, Typography } from "@mui/material"

import { FolderOpen, Height, MenuBookOutlined, Timer } from "@material-ui/icons";
import { makeStyles } from "@mui/styles";
import { ClassNames } from "@emotion/react";

import { purple, blue, brown, red, grey, yellow } from '@mui/material/colors'
import { display } from "@mui/system";
import theme from "../theme";

import '../App.css';

// InputBase

import { LibaryContext } from "../context/LibaryContext";
import { TagContext } from "../context/tagContext";
import { DashboardContext } from "../context/DashboardContext";

import { Accordion, AccordionDetails, AccordionSummary, ClickAwayListener, Grow, InputBase, Menu, MenuItem, MenuList, Popper } from "@material-ui/core";
import { Slide, toast, ToastContainer } from "react-toastify";


import NewFolderInteface from "./SidebarCom/NewFolderINT";

//errors associated with sidebar functions and options are defined here
import Home from '../svgIcons/home.svg'



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


function Sidebar (params) {


    const classes = usestyle()
    const {Createbookentry, isLibarymodal,  toggleLibaryModal, LibaryArray, toggleResetTextareas, openBook, selectedBook, newFileSaveError, setnewFileSaveError, ClearTextArea, toggleisNewFolderInterface, isNewFolderInterface, updateCurrentFolderContent, FolderArray,clearCurrentFolder, openFolder, currentFolderContent, saveCurrentFolder} = React.useContext(LibaryContext)

    const {currentTag, isTagMenu, toggleisTagMenu, tagsArray, changeCurrentTag, taggedObjArray, toggleisTagLibaryDisplay,tagsColorPool, handleNewTaginput, userCreatedTagsArray, setnewTagError, newTagError } = React.useContext(TagContext)

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
    const notifyNewTagErrors = () => toast.error(newTagError.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Slide,
        theme: 'dark'
        });


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
    React.useEffect(() => {
        if(newTagError.message && newTagError.notificationType){
            notifyNewTagErrors() 
            setnewTagError({message: null,
                notificationType: null})
        }
      
    }, [newTagError]);


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
            setcurrentSelectedFileInMenu(selectedBook.bookid)
        }
       
    }, [selectedBook]);

   
    // const [open, setOpen] = React.useState(false);
    
  

    const MainModalstyles = ['absolute top-1/2 md:left-96 lg:left-96   -translate-x-1/2 -translate-y-1/2  bg-transparent   pb-3 md:ml-5 lg:ml-10']

    const subModalstyles = ['']


    const Sidebarbuttoncom = (props) => {
        const bgColor = props.color
        return (
        <div 
        style={{
            // border: `1px solid ${bgColor}`,
            // backgroundColor: bgColor,
            backdropFilter: 'blur(2px)'
        }} className={`w-full lg:rounded-lg   cursor-pointer  md:mt-4 lg:mt-4 p-1 shadow hover:scale-105 transition-all `} >
           
            <div className=" lg:mr-0 xl:mr-0 md:mr-0  ">
                    <div className= {classes.sidebuttonCon} >
                        <div  onClick={props.handleClick} className="px-1" >
                        {/* <IconButton  className="sm:w-8 mx-auto hover:bg-transparent" > */}
                        {props.icon}
                       
                        {/* </IconButton >              */}
                        </div>

                        <div className="hidden  xl:block self-center justify-start w-full" >
                            <div 
                        //     style={{
                        // WebkitTextStroke : '1px black'
                        // }}
                 sx={{ minHeight: 0, minWidth: 0, padding: 0 }} className = 'text-gray-700 capitalize font-header5'  variant= "text" >
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
        return (
            <div className="w-20 h-20 cursor-pointer  transition-all hover:scale-105 hover:bg-white  flex flex-col items-center" >
                <div onClick={()=>{
                    saveCurrentFolder()
                    openFolder(props.folderid)}} className="p-2" >
                    <Badge  badgeContent={5}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32"><path fill="none" d="M0 0h24v24H0z"/><path d="M3 21a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h7.414l2 2H20a1 1 0 0 1 1 1v3h-2V7h-7.414l-2-2H4v11.998L5.5 11h17l-2.31 9.243a1 1 0 0 1-.97.757H3zm16.938-8H7.062l-1.5 6h12.876l1.5-6z"/>
                        </svg>
                    </Badge>
                   
                </div>
                <div className="text-sm" >
                    {folderName}
                </div>
            </div>
        )
    }

    const currentFolderContentIDs = currentFolderContent.map(item => item.bookid)

    const Filecomponent = (props) => {
        let fileTitle = props.title
        fileTitle = fileTitle.length > 8? `${fileTitle.substring(0, 8)}...`: fileTitle
        return (
            <div className={`w-20 ${isNewFolderInterface? currentFolderContentIDs.includes(props.bookid)?'opacity-50':'':''}  bg-gray-600 flex flex-col ${currentSelectedFileInMenu == props.bookid?'border-4':'border-none'}`} >
                <div className="  self-center "  >
                <IconButton onClick={()=>{
                    addToRecentFiles(props.allbookData)
                    openBook(props.bookid)}} className="hover:bg-transparent py-0 " >
                <i className=" ri-file-list-2-line text-gray-300 "></i>
                </IconButton>
                </div>
                
                <div className="text-xs px-1 w-full text-center self-center text-gray-200" >{fileTitle}</div>  

            <div className="w-full flex justify-between" >
                <div className={`${isNewFolderInterface?'block w-full ':'hidden'}`} onClick={()=>updateCurrentFolderContent(props.allbookData)} >
                    <div className="bg-green-400 hover:bg-green-500 transition-all text-center cursor-pointer font-bold" >
                         ADD
                    </div>
                      
                {/* <i className="ri-add-circle-fill"></i> */}
                </div>

                <div className={`${isNewFolderInterface?'hidden':'block'}`} ><i className="ri-delete-bin-2-line hover:text-red-500"></i></div>  
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
            {name: 'black', value:"#000000"}
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
    </div> ):'No items available'

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


    return (
<div className="sidebar h-full flex flex-col w-full  justify-start shadow-2xl ">
        <SaveFileErrorsModal/>
        <div className="bg-white mx-auto  pb-8  text-4xl p-4 font-header2" >
         <div className="lg:hidden  xl:hidden block" >
            M
         </div>

         <div className="lg:block xl:block hidden" >
            M
         </div>
        </div>
        <div className={`flex  md:flex-col lg:flex-col mx-auto lg:w-fit md:w-fit  `}>

      
              
        <Sidebarbuttoncom
        icon = {
            // <img src="../svgIcons/home.svg" alt="SVG as an image"></img>
            <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-700 fill-current" width="24" height="24" viewBox="0 0 24 24"><path d="M12 6.453l9 8.375v9.172h-6v-6h-6v6h-6v-9.172l9-8.375zm12 5.695l-12-11.148-12 11.133 1.361 1.465 10.639-9.868 10.639 9.883 1.361-1.465z"/>
            </svg>
        }
        text = 'home'
        color = '#224341'
        // handleClick = {}
        />

        
        <Sidebarbuttoncom
        icon = {
            <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-700 fill-current" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7 14h-8v-9h2v7h6v2z"/></svg>
        }
        text = 'Recents'
        color = '#3D3FB9'
        // handleClick = {}
        />

        <Sidebarbuttoncom
        icon = {    
        <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-700 fill-current" width="24" height="24" viewBox="0 0 24 24"><path d="M15.563 22.282l-3.563.718.72-3.562 2.843 2.844zm-2.137-3.552l2.845 2.845 7.729-7.73-2.845-2.845-7.729 7.73zm-3.062 2.27h-7.364v-7h12.327l6.673-6.688v-2.312l-4-4h-18v22h9.953l.411-2zm-5.364-18h12v7h-12v-7zm8.004 6h2.996v-5h-2.996v5z"/></svg>
                }
        text = 'Save'
        handleClick = {Createbookentry}
        color = '#0099FF'
        />

       {/* <SideButtonacc
       /> */}

        <Sidebarbuttoncom
        icon =  {
        <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-700 fill-current" width="24" height="24" viewBox="0 0 24 24"><path d="M7.972 2h-6.972l.714 5h2.021l-.429-3h3.694c1.112 1.388 1.952 2 4.277 2h9.283l-.2 1h2.04l.6-3h-11.723c-1.978 0-2.041-.417-3.305-2zm16.028 7h-24l2 13h20l2-13z"/></svg>
        }
        text = 'Libary'
        handleClick = {toggleLibaryModal}
        color = '#0068FF'
        />

        <Sidebarbuttoncom
        icon = {
        <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-700 fill-current" width="24" height="24" viewBox="0 0 24 24"><path d="M10.606 0h-10.606v10.609l13.393 13.391 10.607-10.606-13.394-13.394zm-7.02 6.414c-.782-.785-.781-2.047 0-2.83.782-.782 2.049-.779 2.829-.001.783.783.782 2.048 0 2.831-.783.781-2.046.781-2.829 0zm9.807 14.757l-8.484-8.484 7.778-7.778 8.486 8.485-7.78 7.777zm3.534-6.36l-5.656-5.656.707-.709 5.656 5.657-.707.708zm-1.414 1.414l-5.656-5.656.707-.707 5.656 5.656-.707.707zm-3.535-.707l-3.534-3.536.707-.706 3.535 3.535-.708.707z"/></svg>
    }
        text = 'tags'
        handleClick = {toggleisTagMenu}
        color = '#FB3E2B'
        />

        <Sidebarbuttoncom
        icon = {
        <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-700 fill-current" width="24" height="24" viewBox="0 0 24 24"><path d="M18.5 15c-2.483 0-4.5 2.015-4.5 4.5s2.017 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.017-4.5-4.5-4.5zm2.5 5h-2v2h-1v-2h-2v-1h2v-2h1v2h2v1zm-7.18 4h-12.82v-24h8.409c4.857 0 3.335 8 3.335 8 3.009-.745 8.256-.419 8.256 3v2.501c-.771-.322-1.614-.501-2.5-.501-3.584 0-6.5 2.916-6.5 6.5 0 1.747.696 3.331 1.82 4.5zm-.252-23.925c2.202 1.174 5.938 4.883 7.432 6.881-1.286-.9-4.044-1.657-6.091-1.179.222-1.468-.185-4.534-1.341-5.702z"/></svg>
        }
        text = 'New'
        handleClick = {ClearTextArea}
        color = '#DCD9D8'
        />

        {/* <Sidebarbuttoncom
        icon = {
        <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-700 fill-current" width="24" height="24" viewBox="0 0 24 24"><path d="M18.5 15c-2.483 0-4.5 2.015-4.5 4.5s2.017 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.017-4.5-4.5-4.5zm2.5 5h-2v2h-1v-2h-2v-1h2v-2h1v2h2v1zm-7.18 4h-12.82v-24h8.409c4.857 0 3.335 8 3.335 8 3.009-.745 8.256-.419 8.256 3v2.501c-.771-.322-1.614-.501-2.5-.501-3.584 0-6.5 2.916-6.5 6.5 0 1.747.696 3.331 1.82 4.5zm-.252-23.925c2.202 1.174 5.938 4.883 7.432 6.881-1.286-.9-4.044-1.657-6.091-1.179.222-1.468-.185-4.534-1.341-5.702z"/></svg>
        }
        text = 'Bionic'
        handleClick = {ClearTextArea}
        color = '#DCD9D8'
        /> */}

      



    <Modal
        open={isLibarymodal}
        onClose={toggleLibaryModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        disableAutoFocus={true}
      >
     <div className="flex bg-red-300" >
        <Box className={MainModalstyles} sx={{ width: 650, height: 600, 
        "& .MuiOutlinedInput-notchedOutline": {
            border: "0 none",
          },
    }}    >
        <div className="flex" >
            <div style={{
            height: 600
            }} className= 'w-3/5 border' >
                <div className="bg-gray-800 flex justify-between px-2 py-1 text-white font-header5" >
                    <div>Libary</div>

                    <div>
                    Search
                    </div>
                    {/* clearCurrentFolder */}
                    {!isNewFolderInterface?   <div className="cursor-pointer hover:text-green-400 transition-all" onClick={()=>
                    {clearCurrentFolder()
                    toggleisNewFolderInterface()}} >New Folder</div>:
                   <div className="cursor-pointer hover:text-green-400 transition-all" onClick={()=>clearCurrentFolder()} >New Folder+</div>}
                 

                    </div>

                

                <div className="flex flex-wrap" > 
                    {Filedisplay}
                    {Folderdisplay}
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

 
    </div>
        
      </Modal>

    {/* tag menu and modal */}
      <Modal
        open={isTagMenu}
        onClose={()=>{toggleisTagMenu()
            setisNewtagPalette(false)}}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box   className={MainModalstyles} sx={{ width: 400 , height: 600, "& .MuiOutlinedInput-notchedOutline": {
            border: "0 none",
          } }}>
       
            <div style={{height:600}} className="border" >
            <ToastContainer />
                <div className="bg-gray-800 py-1 text-white font-bold" >Tags</div>

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
        </Box>
      </Modal>
    </div>
</div>)
}

export default Sidebar