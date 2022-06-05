import { makeStyles } from "@mui/styles";
import React from "react";

const usestyle = makeStyles((theme)=> ({
textarea: {
    resize: 'none',
    border: 'none',
    backgroundColor: 'transparent',
    outline: 'none',

    
}
    
}))



function Prose(params) {

    const classes = usestyle()

    return (
        <div className="w-screen bg-blue-300  p-8 " >

        <div className="flex h-screen bg-blue-300" > 

            <div className="h-screen bg-gray-400 w-1/12 max-w-20">
                    dd
            </div>


            <div className="w-7/12 mx-auto h-4/5 bg-gray-400 w-10/12">

                <div className="bg-gray-200 h-full my-6">
                <textarea className={`w-full h-full p-4 ${classes.textarea}`}>dxxd</textarea>
                </div>

            </div>
                  

         </div>
            
        
        </div>
    )
    
}

export default Prose