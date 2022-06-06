import React from "react";
import { AppBar, Box, Button, Card, CardContent, CardMedia, IconButton, Modal, Paper, TextField, Toolbar, Typography } from "@mui/material"

import { Timer } from "@material-ui/icons";
import { makeStyles } from "@mui/styles";
import { ClassNames } from "@emotion/react";

import { purple, blue } from '@mui/material/colors'
import { display } from "@mui/system";
import theme from "../theme";





const usestyle = makeStyles((theme)=> ({
       sidebuttonCon: {
        backgroundImage: `linear-gradient(to left, white , ${blue[400]})`,
        [theme.breakpoints.down("sm")]: {
            background: 'transparent'
        },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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
<div className="h-full  flex justify-start bg-gradient-to-l from-sky-400 to-white ">

    

        
        <div className={`flex  md:flex-col lg:flex-col lg:w-full md:w-full md:bg-gray-300 `}>

        
    
             

            <div className=" lg:mr-0 xl:mr-0 md:mr-0 border w-full">
                <div className= {classes.sidebuttonCon} >
                    <div className= {classes.sidebuttonIcon}>
                    <IconButton className="sm:w-8 mx-auto" >
                    <Timer className="p-0" />
                    </IconButton>             
                     </div>

                    <div className="hidden xl:block self-center justify-start w-full" >
                    <Button sx={{ minHeight: 0, minWidth: 0, padding: 0 }} className = 'text-white'  variant= "text" >
                    recents
                    </Button>
                    </div>
                </div>
          </div>

          

       


          <div className=" lg:mr-0 xl:mr-0 md:mr-0 border md:mt-2 lg:mt-2 w-full ">
                <div className= {classes.sidebuttonCon} >
                    <div className= {classes.sidebuttonIcon}>
                    <IconButton className="sm:w-8 mx-auto" >
                    <Timer className="p-0" />
                    </IconButton>             
                    </div>

                     <div className="hidden xl:block self-center justify-start w-full" >
                    <Button sx={{ minHeight: 0, minWidth: 0, padding: 0 }} className = 'text-white'  variant= "text" >
                    same
                    </Button>
                    </div>
                </div>
          </div>


          
          <div className="  lg:mr-0 xl:mr-0 md:mr-0 border md:mt-2 lg:mt-2 w-full ">
                <div className= {classes.sidebuttonCon} >
                    <div className= {classes.sidebuttonIcon}>
                    <IconButton className="sm:w-8 mx-auto" >
                    <Timer className="p-0" />
                    </IconButton>             
                    </div>

                     <div className="hidden xl:block self-center justify-start w-full" >
                    <Button sx={{ minHeight: 0, minWidth: 0, padding: 0 }} className = 'text-white'  variant= "text" >
                    same
                    </Button>
                    </div>
                </div>
          </div>



         </div>

       

  
          
</div>
    )
    
}

export default Sidebar