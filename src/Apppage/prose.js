import { AppBar, IconButton } from "@material-ui/core";
import { Timer } from "@material-ui/icons";
import { makeStyles } from "@mui/styles";
import Sidebar from "../Appcom/sidebar";
import React from "react";
import Textarea from "../Appcom/textarea";
import Textproseslate from "../1Textarea/textarea-v/TextproseSlate";
import { Button, Toolbar } from "@mui/material";
import Bool from "../1Textarea/Utilts/boolean";

import {Metacontext} from '../context/MetamodalContext'
import Metatextarea from "../Appcom/Metatextarea";
import { LibaryContext } from "../context/LibaryContext";




function Prose(params) {
    const {isMetamodal} = React.useContext(Metacontext)

    const {isLibarymodal, isResettextareas} = React.useContext(LibaryContext)


    console.log(isMetamodal)
    const styles = () => {
        return (
            {
                sidebar: isMetamodal? 'hidden': 'md:mx-auto lg:py-14 md:py-14  lg:w-1/12 xl:w-1/12 md:w-1/12 lg:h-full md:h-full   mb-3 md:mb-0 lg:mb-0 ',

                Textproseslate: isMetamodal? 'flex flex-col lg:flex-row md:flex-row  mx-auto h-screen bg-white lg:w-10/12 md:w-12/12 w-full px-2 rounded':" mx-auto h-full bg-white lg:w-10/12 md:w-10/12 w-full px-2 rounded",

               Metatextarea: isMetamodal? 'lg:w-4/12 md:w-4/12 w-11/12  absolute md:left-0 md:-translate-x-0 lg:left-0 lg:-translate-x-0 left-1/2 -translate-x-1/2  lg:relative md:relative bottom-0': 'hidden'
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
//  console.log(classes.sidebar)

    return (
<div className="">    
    <div 
    className="w-screen bg-gradient-to-r from-gray-800 via-neutral-800 to-white lg:px-8 md:p-0 h-screen " >
    {/* <div className=" text-lg uppercase border-b-4 font-bold" >header </div> */}
            <div className={`${isLibarymodal?'blur-sm':'blur-none'}  flex flex-col h-full  lg:flex-row    md:flex-row`} > 


                <div className= {classes.sidebar} >
                <Sidebar/>
                </div>

           

           

                <div className= {classes.Textproseslate} >
                    <Textproseslate
                    key={isResettextareas? '1':'2'}
                    /> 

                {/* {isMetamodal && <div className="lg:w-4/12 md:w-4/12 w-11/12  absolute md:left-0 md:-translate-x-0 lg:left-0 lg:-translate-x-0 left-1/2 -translate-x-1/2  lg:relative md:relative bottom-0 " >
                <Textarea/>
                </div>}       */}
                <div className={classes.Metatextarea} >
                    <Metatextarea
                    key={isMetamodal?'1':'2'}
                    />
                </div>
            </div>

              
         </div>
            
    </div>
   
    </div>
    )
    
}

export default Prose