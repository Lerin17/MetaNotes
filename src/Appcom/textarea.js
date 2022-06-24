import React, { useRef } from "react";
import { makeStyles } from "@mui/styles";
import Sidebar from "../Appcom/sidebar";
import { useForkRef } from "@mui/material";




const usestyle = makeStyles((theme)=> ({
textarea: {
    resize: 'none',
    // border: 'none',
    backgroundColor: 'transparent',
    outline: 'none',
    color: 'blue',
    fontSize: '10px',
    height: '300px'
 
},
text: {
    resize: 'none',
    border: 'none',
    outline: 'none'
}
    
}))


function Textarea(props) {
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

                    <div className="bg-gray-200 h-scren  ">
                           
                        <div className="border-b border-white" >
                                img
                        </div>

                        <div className="h-full">
                            <textarea className={`w-full h-full px-2   ${classes.textarea}`} onChange = {props.onChangetext} value = {props.textData}
                            ref= {props.isChangeTextBox? currentTextArea: null}
                            ></textarea>
                        </div>
                        
                    
                    </div>

                </div>
    )
    
}

export default Textarea