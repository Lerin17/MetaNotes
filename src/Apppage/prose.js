import { IconButton } from "@material-ui/core";
import { Timer } from "@material-ui/icons";
import { makeStyles } from "@mui/styles";
import Sidebar from "../Appcom/sidebar";
import React from "react";
import Textarea from "../Appcom/textarea";

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

    const [textData, settextData] = React.useState('');

    function onChangetext(event) {
        const text = event.target.value
        settextData(event.target.value)

        if(event.target.value){
            const allletter = text.split('')
            const firstletter = text[0]

            allletter.shift()
    
           console.log(firstletter, allletter)
        }
        
       
       
       
    }

    return (
     <div className="w-screen bg-gray-300 lg:p-8 p-10 h-screen" >

         <div className="bg-red-200 text-2xl" >header</div>

        <div className="flex flex-col h-full  lg:flex-row md:flex-row" > 

            <div className="lg:w-1/12 xl:w-1/12 lg:h-full md:h-full h-2/12 md:w-1/12 mb-3 md:mb-0 lg:mb-0 bg-white" >
            <Sidebar/>
            </div>

           

            <div className=" mx-auto h-full bg-gray-400 lg:w-10/12 md:w-10/12 w-11/12  rounded">

                <Textarea
                onChangetext = {onChangetext}
                textData = {textData}
                />


            </div>
                  

         </div>
            
        
    </div>
    )
    
}

export default Prose