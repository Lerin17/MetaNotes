import React from "react";
import { AppBar, Box, Button, Card, CardContent, CardMedia, IconButton, Modal, Paper, TextField, Toolbar, Typography } from "@mui/material"

import { FolderOpen, MenuBookOutlined, Timer } from "@material-ui/icons";
import { makeStyles } from "@mui/styles";
import { ClassNames } from "@emotion/react";

import { purple, blue, brown } from '@mui/material/colors'
import { display } from "@mui/system";
import theme from "../theme";





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


    return (
<div className="h-full  flex justify-start  ">

    

        
        <div className={`flex  md:flex-col lg:flex-col lg:w-full md:w-full md:bg-transparent `}>

        
    
             

            <div className=" lg:mr-0 xl:mr-0 md:mr-0 rounded-lg shadow  lg:border border-gray-600 w-full">
                <div className= {classes.sidebuttonCon} >
                    <div className= {classes.sidebuttonIcon}>
                    <IconButton className="sm:w-8 mx-auto hover:bg-transparent" >
                    <i class="ri-home-5-line text-white"></i>   
                    </IconButton>             
                     </div>

                    <div className="hidden xl:block self-center justify-start w-full" >
                    <Button sx={{ minHeight: 0, minWidth: 0, padding: 0 }} className = 'text-white'  variant= "text" >
                    Home
                    </Button>
                    </div>
                </div>
          </div>

          

       


          <div className=" lg:mr-0 xl:mr-0 md:mr-0 rounded-lg shadow lg:border border-gray-600 md:mt-2 lg:mt-2 w-full ">
                <div className= {classes.sidebuttonCon} >
                    <div className= {classes.sidebuttonIcon}>
                    <IconButton className="sm:w-8 mx-auto hover:bg-transparent" >
                    <i className="ri-timer-2-line text-white"></i>
                   
                    </IconButton>             
                    </div>

                     <div className="hidden xl:block self-center justify-start w-full" >
                    <Button sx={{ minHeight: 0, minWidth: 0, padding: 0 }} className = 'text-white'  variant= "text" >
                    Recents
                    </Button>
                    </div>
                </div>
          </div>


          <div className="  lg:mr-0 xl:mr-0 md:mr-0  md:mt-2 lg:mt-2 w-full  shadow lg:border rounded-lg border-gray-600">
                <div  className= {classes.sidebuttonCon} >
                    <div className= {classes.sidebuttonIcon}>
                    <IconButton className="sm:w-8 mx-auto hover:bg-transparent" >
                    <i className="ri-save-2-line text-white"></i>
                    </IconButton>             
                    </div>

                     <div className="hidden xl:block self-center justify-start w-full" >
                    <Button sx={{ minHeight: 0, minWidth: 0, padding: 0 }} className = 'text-white'  variant= "text" >
                    Save
                    </Button>
                    </div>
                </div>
          </div>

          
          <div className="  lg:mr-0 xl:mr-0 md:mr-0  md:mt-2 lg:mt-2 w-full  shadow lg:border rounded-lg border-gray-600">
                <div  className= {classes.sidebuttonCon} >
                    <div className= {classes.sidebuttonIcon}>
                    <IconButton className="sm:w-8 mx-auto hover:bg-transparent" >
                    <i className="ri-folder-open-line text-white"></i>
                    </IconButton>             
                    </div>

                     <div className="hidden xl:block self-center justify-start w-full" >
                    <Button sx={{ minHeight: 0, minWidth: 0, padding: 0 }} className = 'text-white'  variant= "text" >
                    Libary
                    </Button>
                    </div>
                </div>
          </div>


   



         </div>

       

  
          
</div>
    )
    
}

export default Sidebar