import { IconButton } from "@material-ui/core";
import { Timer } from "@material-ui/icons";
import { makeStyles } from "@mui/styles";
import Sidebar from "../Appcom/sidebar";
import React from "react";
import Textarea from "../Appcom/textarea";
import Textproseslate from "../1Textarea/textarea-v/TextproseSlate";
import { Button } from "@mui/material";
import Bool from "../1Textarea/Utilts/boolean";

const usestyle = makeStyles((theme)=> ({
textarea: {
    resize: 'none',
    border: 'none',
    backgroundColor: 'transparent',
    outline: 'none',

    
}
    
}))





function Prose(params) {
    const [value, togglevalue] = Bool(true)

    const [boolprose, setboolprose] = React.useState(false);


    function setbool(params) {
        setboolprose(prev=>!prev)
    }

    console.log(togglevalue)

    const classes = usestyle()

    const [textData, settextData] = React.useState('');
    const [isFirstletter, setisFirstletter] = React.useState(false);
    const [firstletter, setfirstletter] = React.useState('');
    const [isChangeTextBox, setisChangeTextBox] = React.useState(false);
    const [isFilleradded, setisFilleradded] = React.useState(false);

    const [isSlatetexthover, setisSlatetexthover] = React.useState(false);
   

    function onChangetext(event) {
        let text = event.target.value

       const filler = '         '
       
    
        text = !isFilleradded? filler.concat(text): text
        setisFilleradded(true) 
        settextData(text)

        //DEFAULT BACK TO INPUT FIELD
        // if(text == filler){
        //     setisChangeTextBox(false)
        // }

        // setisFirstletter(!event.target.value? true:false )
    }


    function onChange1stletter(event) {
            const text = event.target.value
            if(text.length > 1){
                setisChangeTextBox(true)
                return
            }else{
                setisChangeTextBox(false)
            }
          
            setfirstletter(text)
            console.log('dmn')
    }

    // const firstletterobj= {
    //     firstletter,
    //     onchangeletter: onChange1stletter
    // }

    function openTextModal(params) {
        console.log('open modal')
        
    }


 

    return (
     <div className="w-screen bg-gray-300 lg:p-8 p-10 h-screen" >

         <div className="bg-red-200 text-2xl" >header </div>

        <div className="flex flex-col h-full  lg:flex-row md:flex-row" > 

            <div className="lg:w-1/12 xl:w-1/12 lg:h-full md:h-full h-2/12 md:w-1/12 mb-3 md:mb-0 lg:mb-0 bg-white" >
            <Sidebar/>
            </div>

           

            <div className=" mx-auto h-full bg-white lg:w-10/12 md:w-10/12 w-11/12 px-6 rounded"  onClick={()=>setisSlatetexthover(prev => !prev)} onKeyDown={()=>setisSlatetexthover(prev => !prev) }>

           <Textproseslate
           yam = {isSlatetexthover}
           />
           
 
                {/* <Textarea
                onChangetext = {onChangetext}
                textData = {textData}
                firstletter = {firstletter}
                onChange1stletter = {onChange1stletter}
                isChangeTextBox = {isChangeTextBox}
                /> */}


            </div>

                

         </div>
            
        
    </div>
    )
    
}

export default Prose