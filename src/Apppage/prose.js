import { AppBar, IconButton } from "@material-ui/core";
import { Timer } from "@material-ui/icons";
import { makeStyles } from "@mui/styles";
import Sidebar from "../Appcom/sidebar";
import React from "react";
import Textarea from "../Appcom/textarea";
import Textproseslate from "../1Textarea/textarea-v/TextproseSlate";
import { Button, Toolbar } from "@mui/material";
import Bool from "../1Textarea/Utilts/boolean";

import {Stylecontext} from '../context/MetamodalContext'




function Prose(params) {
    const {isMetamodal, toggleMetamodal} = React.useContext(Stylecontext)

    console.log(isMetamodal)
    const styles = () => {
        return (
            {
                sidebar: isMetamodal? 'hidden': ' lg:w-1/12 xl:w-1/12 lg:h-full md:h-full h-2/12 md:w-1/12 mb-3 md:mb-0 lg:mb-0 bg-white',

                Textproseslate: isMetamodal? 'flex flex-col lg:flex-row md:flex-row  mx-auto h-full bg-white lg:w-10/12 md:w-12/12 w-full px-2 rounded':" mx-auto h-full bg-white lg:w-10/12 md:w-10/12 w-full px-2 rounded"

            }
           
        )   
    }






    // const [textData, settextData] = React.useState('');
    // const [isFirstletter, setisFirstletter] = React.useState(false);
    // const [firstletter, setfirstletter] = React.useState('');
    // const [isChangeTextBox, setisChangeTextBox] = React.useState(false);
    // const [isFilleradded, setisFilleradded] = React.useState(false);

    // const [isSlatetexthover, setisSlatetexthover] = React.useState(false);
   



 const classes = styles(isMetamodal)
 console.log(classes.sidebar)

    return (
<div className="">    
    <div className="w-screen bg-gray-300 lg:p-8 md:p-0 h-screen" >
    <div className=" text-lg uppercase border-b-4 font-bold" >header </div>
            <div className="flex flex-col h-full  lg:flex-row md:flex-row" > 

            <div className= {classes.sidebar} >
            <Sidebar/>
            </div>

           

            <div className= {classes.Textproseslate} >
           <Textproseslate/> 

                {isMetamodal && <div className="lg:w-4/12 md:w-4/12 w-8/12  absolute  lg:relative md:relative bottom-0 h-72  " >
                <Textarea/>
                </div>}      
            </div>

              
         </div>
            
    </div>
   
    </div>
    )
    
}

export default Prose