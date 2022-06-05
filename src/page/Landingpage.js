import { AppBar, Box, Button, Card, CardContent, CardMedia, IconButton, Modal, Paper, TextField, Toolbar, Typography } from "@mui/material";
import React from "react";
import { EditOutlined, HeadsetMicOutlined, OpenWithOutlined, RecentActorsRounded, Settings, SettingsApplications, SettingsApplicationsOutlined, SettingsCellOutlined, SettingsOutlinedIcon} from "@material-ui/icons";
import Navbar from "../components/navbar";
import { makeStyles } from "@mui/styles";
import { SettingsSVG } from "../svgs/svgs";







// import { AppBar, InputBase, Toolbar, Typography } from "@mui/material";


const usestyle = makeStyles((theme)=> ({
appbar: {
    border: '2px white dotted',
    color: 'green', [theme.breakpoints.down("sm")]: {
        color: (props) => (props.open? 'red': 'yellow')
    }
    , background: 'none',
},
greeting: {
 display: (props) => (!props.isNameEditor? 'block': 'none')  ,
},
paper: {
// width: '30%',
height: '100px',
marginRight: '20px',
},
button: {
    boxShadow: 'none'
},
textfield: {
    color: 'white'
}

}))

function Landingpage(params) {
    const [isNameEditor, setisNameEditor] = React.useState(false);
    const [isSettings, setisSettings] = React.useState(false);

    const [openModal, setopenModal] = React.useState(false);


    const classes = usestyle({isNameEditor})
  
  
  function opensettings(params) {
      setisSettings(prev => !prev)
  }


    function editname(){
        setisNameEditor(prev => !prev)
    }

// function handleOpen(params) {
//     openModal(true)
//     return openModal
// }

// function handleClose(params) {
//     openModal(false)
// }


    return (
        <div className="bg-black h-screen">

        <div>
              <AppBar className= {`mb-8 ${classes.appbar}`}
              position = 'static'>
                  <Toolbar>
                      <p>dd</p>

                    <p>Date</p>

                  <p>Darkmode</p>
                  </Toolbar>
              </AppBar>
          </div>

          <div className= {`border-b-2 w-screen pb-8 text-white`}>
                {!isNameEditor? <div className={`mx-8 w-3/4 mx-auto ${classes.greeting}`} >
                    <div className="text-8xl">
                    <h1  className="inline  lg:leading-8" >hello <span className="inline-block mt-4" >Maria</span> </h1>
                    <EditOutlined
                    onClick = {editname}/>
                    </div>
                   </div>:

                    <div className="mx-8 w-3/4 mx-auto" >
                    <div className="text-8xl">
                     <h1  className="inline  lg:leading-8" >hello <span className="inline-block mt-4" ><TextField label="Filled success" variant="filled" color="success" focused className= {classes.textfield} />
                    </span> </h1>
                     <EditOutlined
                     onClick = {editname}/>
                    </div>
                    </div>}
         </div>
     

     <div className="bg-black h-screen">

<div className="bg-black  w-3/4 mx-auto">

     
      <div className="flex flex-col lg:flex-row">


         
            <div className="lg:mx-8 flex lg:w-1/2  sm:border-b-2 lg:border-none ">
             
            
          
            

                <div className=" w-1/2   mr-4 border-r-2 py-6"> 
                {isSettings?
                <Paper className= {`h-14 bg-gradient-to-r from-sky-500 to-indigo-500 ${classes.paper}`}  >
                 RECENTS 
                 </Paper>: 
                 <div>

                     <h1>setting</h1>

                <IconButton className="flex justify-content " color="primary" aria-label="upload picture" component="span" onClick={opensettings}>
                <SettingsSVG/> 
                </IconButton>
                 </div>
                
                }
               
                   
                </div>
              

                <div className=" w-1/3  py-6 ">
                <Paper className= {`${classes.paper} bg-gradient-to-r from-sky-500 to-indigo-500`} >
                    SETTINGS
                </Paper>
                </div>
                
            </div>


            <div className="mt-6   lg:w-full -ml-20 self-center flex flex-col lg:ml-10 relative ">
                <div className="flex justify-between px-0 lg:w-4/5" >
                    <Button variant="outlined" className="rounded-full border lg:text-4xl sm:text-2xl font-bold rounded-l mr-4" >Prose</Button>

                    <Button variant="outlined" className="rounded-full border lg:text-4xl sm:text-2xl font-bold mr-4" >Poetry</Button>

                    <Button variant="outlined" className="rounded-full border lg:text-4xl sm:text-2xl font-bold rounded-r" >Notes</Button>
                </div>


<div className="flex    " >


<div className="">

    <div className="flex  mt-6 " >
<Button variant="outlined" className="rounded-full border lg:text-4xl rounded-l font-bold mr-4 sm:text-2xl" >isl</Button>

<Button variant="outlined" className="rounded-full border lg:text-4xl font-bold mr-4 sm:text-2xl" >To do</Button>


<Button variant="outlined" className="rounded-full rounded-r border text-4xl font-bold lg:text-4xl sm:text-2xl" >To</Button>

</div>

<div className="flex justify-between mt-6">
<Button variant="outlined" className="rounded-full border lg:text-4xl font-bold sm:text-2xl" >Bionic reading</Button>
</div>

<div className="mt-6">
<Button variant="outlined" className="rounded-full border lg:text-4xl font-bold sm:text-2xl" >Letter</Button>
</div>

   
    </div>

    <div className="-mb-4  self-end justify-self-start">
            <svg className="fill-current text-white w-32  h-32" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-arrow-down-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M14 13.5a.5.5 0 0 1-.5.5h-6a.5.5 0 0 1 0-1h4.793L2.146 2.854a.5.5 0 1 1 .708-.708L13 12.293V7.5a.5.5 0 0 1 1 0v6z"/>
            </svg>
         </div>
    </div>
 
       


</div>        



        



</div>
     

          

           


        </div>

     </div>
        

        </div>
    )
}

export default Landingpage