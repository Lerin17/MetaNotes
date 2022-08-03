import React from "react";
import { AppBar, Badge, Box, Button, Card, CardContent, CardMedia, IconButton, Modal, Paper, TextField, Toolbar, Typography } from "@mui/material"

import { FolderOpen, Height, MenuBookOutlined, Timer } from "@material-ui/icons";
import { makeStyles } from "@mui/styles";
import { ClassNames } from "@emotion/react";

import { purple, blue, brown, red, grey, yellow } from '@mui/material/colors'
import { display } from "@mui/system";
import theme from "../theme";



import { LibaryContext } from "../context/LibaryContext";
import { TagContext } from "../context/tagContext";

import { Accordion, AccordionDetails, AccordionSummary, ClickAwayListener, Grow, Menu, MenuItem, MenuList, Popper } from "@material-ui/core";




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
    const {Createbookentry, isLibarymodal,  toggleLibaryModal, LibaryArray, toggleResetTextareas, openBook} = React.useContext(LibaryContext)

    const {currentTag, isTagMenu, toggleisTagMenu, tagsArray, changeCurrentTag, taggedObjArray, toggleisTagLibaryDisplay } = React.useContext(TagContext)

    // const [open, setOpen] = React.useState(false);
    
  

    const styles = ['absolute top-1/2 md:left-72 lg:left-96   -translate-x-1/2 -translate-y-1/2  bg-transparent border  pb-3 md:ml-5 lg:ml-10']


    const Sidebarbuttoncom = (props) => {
        return (
        <div className=" lg:mr-0 xl:mr-0 md:mr-0 rounded-lg shadow  lg:border border-gray-600 md:mt-2 lg:mt-2 w-full">
            <div className= {classes.sidebuttonCon} >
                <div className= {classes.sidebuttonIcon}>
                <IconButton  onClick={props.handleClick} className="sm:w-8 mx-auto hover:bg-transparent" >
                <i className={`${props.icon} text-white`}></i>   
                </IconButton>             
                 </div>

                <div className="hidden xl:block self-center justify-start w-full" >
                <Button sx={{ minHeight: 0, minWidth: 0, padding: 0 }} className = 'text-white'  variant= "text" >
                 {props.text}
                </Button>
                </div>
            </div>
      </div>
        )
    }

    const Filecomponent = (props) => {
        return (
            <div className="w-20 px-1 bg-gray-600 flex flex-col " >
                <div className="  self-center "  >
                <IconButton onClick={()=>openBook(props.bookid)} className="hover:bg-transparent py-0 " >
                <i className=" ri-file-list-2-line text-gray-300 "></i>
                </IconButton>
                </div>
                
                <div className="text-sm font-bold self-center text-gray-200" >{props.title}</div>  

                <div className="self-end" ><i className="ri-delete-bin-2-line hover:text-red-500"></i></div>  
            </div>     
        )
    }



    const Tagcomponent = (props) => {
        const tag = props.color
      

        const colors = [
            {name:'red', value: red}, 
            {name:'blue', value:blue}, 
            {name:'grey', value:grey}, 
            {name:'yellow', value:yellow}
        ]

        const currentcolor = colors.find(item => item.name == tag)
        const iscurrenttag = currentTag == props.name
    

        console.log(currentcolor)
        const style = `${iscurrenttag?'border-4':'border-none'} w-full px-1`
        // <Box sx={{ color: 'text.secondary' }}>Sessions</Box>

        return(
            <Box  sx={{ backgroundColor: currentcolor.value[700]}} className={style}>
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
        />
    </div> ):'No items available'



    return (
<div className="h-full  flex justify-start  ">

           
        <div className={`flex  md:flex-col lg:flex-col lg:w-full md:w-full md:bg-transparent `}>
              
          <Sidebarbuttoncom
        icon = 'ri-home-5-line'
        text = 'home'
        // handleClick = {}
        />

        
        <Sidebarbuttoncom
        icon = 'ri-timer-2-line'
        text = ' Recents'
        // handleClick = {}
        />

        <Sidebarbuttoncom
        icon = 'ri-save-2-line '
        text = 'Save'
        handleClick = {Createbookentry}
        />

       {/* <SideButtonacc
       /> */}

        <Sidebarbuttoncom
        icon = 'ri-folder-open-line'
        text = 'Libary'
        handleClick = {toggleLibaryModal}
        />

        <Sidebarbuttoncom
        icon = 'ri-file-add-line'
        text = 'New'
        handleClick = {toggleResetTextareas}
        />

        <Sidebarbuttoncom
        icon = 'ri-price-tag-3-line'
        text = 'tags'
        handleClick = {toggleisTagMenu}
        />



    <Modal
        open={isLibarymodal}
        onClose={toggleLibaryModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box className={styles} sx={{ width: 400 , height: 600 }}>
            <div>
                <div className="bg-gray-800 py-1 text-white font-bold" >Libary</div>

                <div className="flex wrap" > 
                    {Filedisplay}
                    {/* <div className="w-20 p-2 bg-gray-600 " >
                    <IconButton className="hover:bg-transparent py-0" >
                    <i className=" ri-file-list-2-line text-white"></i>
                    </IconButton>
                    <div>Name</div>    
                    </div> */}
                </div>
            </div>
        </Box>
      </Modal>

      <Modal
        open={isTagMenu}
        onClose={toggleisTagMenu}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box className={styles} sx={{ width: 400 , height: 600 }}>
            <div>
                <div className="bg-gray-800 py-1 text-white font-bold" >Tags</div>

                <div className="flex flex-col" > 
                    {Tagsdisplay}
                    {/* <div className="w-20 p-2 bg-gray-600 " >
                    <IconButton className="hover:bg-transparent py-0" >
                    <i className=" ri-file-list-2-line text-white"></i>
                    </IconButton>
                    <div>Name</div>    
                    </div> */}
                </div>
            </div>
        </Box>
      </Modal>
    </div>

</div>
    )
    
}

export default Sidebar