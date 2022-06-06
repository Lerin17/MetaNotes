import React from "react";
import { makeStyles } from "@mui/styles";
import Sidebar from "../Appcom/sidebar";


const usestyle = makeStyles((theme)=> ({
textarea: {
    resize: 'none',
    border: 'none',
    backgroundColor: 'transparent',
    outline: 'none',
    
}
    
}))


function Textarea(props) {
    const classes = usestyle()
   
    console.log(props.textData)

    return (
    
        <div className="h-full">

                    <div>Name</div>

                    <div className="bg-gray-200 h-3/4 my-6 ">
                    <textarea className={`w-full h-full p-4  ${classes.textarea}`} onChange = {props.onChangetext} value = {props.textData} ></textarea>
                    </div>

                    <div>footer</div>

                </div>
    )
    
}

export default Textarea