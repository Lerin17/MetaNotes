import React, { useRef } from "react";
import { makeStyles } from "@mui/styles";
import Sidebar from "../Appcom/sidebar";
import { ButtonBase, useForkRef } from "@mui/material";
import { Button, IconButton } from "@material-ui/core";
import { Metacontext } from "../context/MetamodalContext";



const usestyle = makeStyles((theme)=> ({
textarea: {
    resize: 'none',
    // border: 'none',
    backgroundColor: 'transparent',
    outline: 'none',
    color: 'green',
    fontSize: '10px',
    height: '200px',
 
},
text: {
    resize: 'none',
    border: 'none',
    outline: 'none'
}
    
}))


function Textarea(props) {
   
    const {isMetamodal, toggleMetamodal,  CreateMetaID, currentMetacontent, MetacontentOnchange, updateCurrentMeta} = React.useContext(Metacontext)

    let currentTextArea = React.useRef(null)
    const isFirstletter = props.isFirstletter
    const classes = usestyle({isFirstletter})
   
    console.log(props.textData)


    function setTextArea(params) {
        
        if(currentTextArea.current){
            currentTextArea.current.focus()
        } 
        console.log('wxw')
    }

    
    console.log(currentMetacontent)
    // console.log(currentTextArea.current)
    // console.log(props.firstletter)
    // console.log(props.isChangeTextBox)

    setTimeout(()=>{
        if(currentTextArea.current && props.isChangeTextBox){
            currentTextArea.current.focus()
        }
    } ,100 )

   
    return (
    
        <div className="h-full" onClick={setTextArea} >
{/* 
                    <div>Name</div> */}

                    <div className="bg-gray-200 h-scren lg:rounded-y  md:rounded-y rounded rounded-b mb-3 ">
                           
                        <div className="border-b border-white flex justify-between px-3" >
                            <div>
                            <Button onClick={()=>toggleMetamodal()} style={{ minHeight: 0, minWidth: 0, padding: 0 }} className = 'text-white'  variant= "text" >
                             X
                             </Button>
                            </div>
                            
                            <div>
                            <Button onClick={()=>updateCurrentMeta(currentMetacontent)} style={{ minHeight: 0, minWidth: 0, padding: 0 }} className = 'text-white'  variant= "text" >
                             V
                             </Button>
                            </div>
                        </div>

                        <div className="h-full">
                            <textarea className={`w-full h-full px-2   ${classes.textarea}`} onChange = {MetacontentOnchange} value = {currentMetacontent}
                            ref= {props.isChangeTextBox? currentTextArea: null}
                            ></textarea>
                        </div>
                        
                    
                    </div>

                </div>
    )
    
}

export default Textarea