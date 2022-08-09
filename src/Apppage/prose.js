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
import { TagContext } from "../context/tagContext";
import TagsLibary from "../Appcom/TagsLibarydisplay";

import { Box,  Fade } from "@mui/material";





function Prose(params) {
    const {isMetamodal} = React.useContext(Metacontext)

    const {isLibarymodal, isResettextareas} = React.useContext(LibaryContext)

    const {taggedObjArray, toggleisTagLibaryDisplay, isTagLibaryDisplay, isTagMenu} = React.useContext(TagContext)

    // const {taggedObjArray, } = React.useContext(TagContext)


    // console.log(isMetamodal)
    const styles = () => {
        return (
            {
                sidebar: isMetamodal || isTagLibaryDisplay? 'hidden': '   lg:rounded-none xl:rounded-none w-1/12 border-r-4  border-slate-400 overflow-hidden xl:w-2/12 md:w-1/12 lg:h-full md:h-full   mb-3 md:mb-0 lg:mb-0  bg-blue-300',

                proseContainer: isMetamodal || isTagLibaryDisplay? 'flex flex-col lg:flex-row md:flex-row  mx-auto h-screen bg-blue-100 lg:w-11/12 md:w-12/12 w-full lg:pl-4  rounded':" mx-auto h-full bg-white  md:w-11/12   w-full  rounded-r",

               Metatextarea: isMetamodal? 'lg:w-4/12 md:w-4/12 w-11/12  absolute md:left-0 md:-translate-x-0 lg:left-0 lg:-translate-x-0 left-1/2 -translate-x-1/2  lg:relative md:relative bottom-0 animate-fade': 'hidden',

               TaggeditemsLibary: isTagLibaryDisplay?'lg:w-4/12 md:w-4/12 lg:h-screen overflow-auto md:h-screen w-11/12  absolute md:left-0 md:-translate-x-0 lg:left-0 lg:-translate-x-0 left-1/2 -translate-x-1/2  lg:relative md:relative bottom-0 ':'hidden',

               Dashboard: isMetamodal || isTagLibaryDisplay ? 'hidden': "lg:w-3/12 xl:w-3/12 lg:block xl:block hidden bg-blue-200 border-r-2 border-slate-400"
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
<div className="bg-blue-100">    
    <div  style={{
        // background: 'radial-gradient(at 100% 50%, rgb(56, 189, 248), rgb(49, 46, 129))'
    }}
    className="w-screen   md:p-0 h-screen " >
    {/* <div className=" text-lg uppercase border-b-4 font-bold" >header </div> */}
            <div className={`${isLibarymodal || isTagMenu?'blur-md':'blur-none'}  flex flex-col h-full  lg:flex-row    md:flex-row`} > 


                <div style={{background: ''}} className= {classes.sidebar} >
                <Sidebar
                key={2}
                />
                </div>

                <div className={classes.Dashboard} >
                    <div className="font-header3 uppercase font-bold text-2xl text-gray-500 bg-white py-6 px-2 text-start border-b-4 border-slate-400" >
                        Dashboard
                    </div>
                </div>


                <div className={classes.Metatextarea} >
                    <Metatextarea
                    key={isMetamodal?'1':'2'}
                    />
                </div>
           

                <div className= {classes.proseContainer} >
                    <Textproseslate
                    key={isResettextareas? '2':'1'}
                    /> 

                {/* {isMetamodal && <div className="lg:w-4/12 md:w-4/12 w-11/12  absolute md:left-0 md:-translate-x-0 lg:left-0 lg:-translate-x-0 left-1/2 -translate-x-1/2  lg:relative md:relative bottom-0 " >
                <Textarea/>
                </div>}       */}
                
                

              

                <div className={classes.TaggeditemsLibary} >
                <TagsLibary/>
                </div>
            </div>

              
         </div>
            
    </div>
   
    </div>
    )
    
}

export default Prose