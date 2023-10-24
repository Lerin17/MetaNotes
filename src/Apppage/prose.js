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
import Dashboard from "../Appcom/Dashboard";
import { bionicContext } from "../context/bionicContext";
import { TeamsContext } from "../context/teamsContext";
import { UserContext } from "../context/userContext";
import { toast, ToastContainer } from "react-toastify";
import ModalCustom from "../Appcom/Custom/ModalCustom";
// import { TeamsContext } from "../context/teamsContext";



import TeamsModal from "../Appcom/SidebarCom/TeamsModal";
import { motion } from "framer-motion";


function Prose(params) {
    const {isMetamodal} = React.useContext(Metacontext)

    const {isLibarymodal, isResettextareas, } = React.useContext(LibaryContext)

    const {taggedObjArray, toggleisTagLibaryDisplay, isTagLibaryDisplay, isTagMenu} = React.useContext(TagContext)

    const {isLoginModalOpen, setnotification, notification, isDarkMode} = React.useContext(UserContext)
    const {isTeamsModalOpen} = React.useContext(TeamsContext)

    const {isActivateBionicText} = React.useContext(bionicContext)
    const [proseKeyValue, setproseKeyValue] = React.useState(1);

    const [natif, setnatif] = React.useState(null);
    const [isOpenSideBar, setisOpenSideBar] = React.useState(false);
    // const {taggedObjArray, } = React.useContext(TagContext)


    // console.log(isMetamodal)
    const styles = () => {
        return (
            {
                sidebar: isMetamodal || isTagLibaryDisplay? 'hidden': ' relative  lg:rounded-none xl:rounded-none    xl:w-2/12 md:w-1/12 lg:h-full md:h-full w-fit  mb-3 md:mb-0 lg:mb-0 ',

                proseContainer: isMetamodal || isTagLibaryDisplay? 'flex flex-col lg:flex-row md:flex-row  mx-auto h-screen bg-white  lg:pl-4 transition-all rounded':` mx-auto h-full    ${isOpenSideBar?'w-full md:11/12  xl:w-10/12 lg:w-10/12 ':'xl:w-10/12 lg:w-10/12 md:w-11/12 w-full '}  bg-transparent   rounded-r`,

               Metatextarea: isMetamodal? 'lg:w-4/12 md:w-4/12 w-11/12  absolute md:left-0 md:-translate-x-0 lg:left-0 lg:-translate-x-0 left-1/2 -translate-x-1/2  lg:relative md:relative bottom-0 animate-fade': 'hidden',

               TaggeditemsLibary: isTagLibaryDisplay?'lg:w-4/12 md:w-4/12 lg:h-screen overflow-auto md:h-screen w-11/12  absolute md:left-0 md:-translate-x-0 lg:left-0 lg:-translate-x-0 left-1/2 -translate-x-1/2  lg:relative md:relative bottom-0 transition-all animate-fade':'hidden',

               Dashboard: isMetamodal || isTagLibaryDisplay ? 'hidden': `  ${isOpenSideBar?' xl:w-3/12 lg:w-3/12':'lg:w-3/12  xl:w-3/12'} bg-gray-100  border-x  lg:block xl:block hidden`
            }
           
        )   
    }

  

    // React.useEffect(() => {
          
    // setTimeout(() => {
    //     setnatif({
    //         type:'error',
    //         message:'sampler',
    //         instance:'TEAMx'
    //     })
    //    }, 3000);
    // }, []);
    
    const xnotify = () => toast.success(natif.message, {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        closeButton: true,
        theme:"dark"
       })

       const  xnotifyerror = () => toast.error(natif.message, {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        closeButton: true,
        theme:"dark"
       })

               
       React.useEffect(() => {
        if(natif){
            if(natif.type == 'error' && natif.instance == 'TEAMx'){
                xnotifyerror()
                setnatif(null)
                return
            }
            if(natif.instance == 'TEAMx'){
                xnotify()
                console.log('notification run')
                setnatif(null)
            }
          
        }
       }, [natif]);




    // const [textData, settextData] = React.useState('');
    // const [isFirstletter, setisFirstletter] = React.useState(false);
    // const [firstletter, setfirstletter] = React.useState('');
    // const [isChangeTextBox, setisChangeTextBox] = React.useState(false);
    // const [isFilleradded, setisFilleradded] = React.useState(false);

    // const [isSlatetexthover, setisSlatetexthover] = React.useState(false);
   
// const getProseKey = () => {
//     if(isResettextareas){

//     }
//     isResettextareas || isActivateBionicText
// }

React.useEffect(() => {
    if(isActivateBionicText){
        setproseKeyValue(2)
    }else{
        setproseKeyValue(3)
    }
  
}, [isActivateBionicText]);

React.useEffect(() => {
    if(isResettextareas){
        setproseKeyValue(4)
    }else{
        setproseKeyValue(5)
    }
}, [isResettextareas]);


 const classes = styles(isMetamodal)
//  console.log(classes.sidebar)

console.log(isLoginModalOpen, 'isLoginModal')

const openSideBar = () => {
    setisOpenSideBar(prev => !prev)
}

    return (
<div className="">   

        

    <div  style={{
        backdropFilter:'contrast(1)',
        // background:'black'
        // background: 'radial-gradient(at 100% 50%, rgb(56, 189, 248), rgb(49, 46, 129))'
    }}
    className={`w-screen transition-all ${isDarkMode?'bg-black':'bg-white'}  md:p-0 h-screen `} >
         <ToastContainer />

         {/* <ModalCustom
    open={isTeamsModalOpen}
    // onClose = {toggleTeamsModal}
    >
        <TeamsModal/>
    </ModalCustom> */}
        {/* <div
        onClick={()=>setnatif({
            type:'error',
            message:'sampler',
            instance:'TEAMx'
        })}
        className="" >
            x
        </div>
        */}
       
    {/* <div className=" text-lg uppercase border-b-4 font-bold" >header </div> */}
            <div style={{
                backdropFilter: `${isLibarymodal || isTagMenu || isLoginModalOpen? '':''}`
            }} className={`${isLibarymodal || isTagMenu || isLoginModalOpen || isTeamsModalOpen?'blur-md ':''} relative  flex flex-col h-full  lg:flex-row   md:flex-row`} > 

        
                <div 
                style={{
                    background:''
                }}
                className= {classes.sidebar} >

                    <div  className=" z-10  font-header6  font-bold text-4xl px-2 w-10/12 relative">
                        <div
                        style={{
                            textSize:'6(px)',
                            // color:'#94B4E4'
                        }}
                        className="flex justify-end font-header5 text-emerald-700  w-full text-xs absolute">
                            

                            <div className="">
                                  (V:1.10)
                            </div>
                        </div>
                        {/* <div 
                        style={{
                            // color:"#699D98"
                        }}
                        className="w-full top-20 text-white  absolute" >
                                  what is the truth of the matter
                        </div>
                      
                       <div 
                       style={{
                        // color:'#90D6CF'
                       }}
                       className="w-full text-xl  text-white text-right font-header7 z-10 top-48 absolute" >
                                  The first thing you should know about me is
                        </div> */}
                    </div>
              
                <Sidebar
    
                isOpenSideBar = {isOpenSideBar}
                openSideBar = {openSideBar}
                key={2}
                />
                </div>
             
                

              

                
                      <div  style={{
                        
                        
                      }}
                      className={classes.Dashboard} >
                            <Dashboard
                            key={'Dashboard'}
                            />
                    </div>
                

                


                <div className={classes.Metatextarea} >
                    <Metatextarea
                    key={isMetamodal?'1':'2'}
                    />
                </div>
           

                <div className= {classes.proseContainer} >
                    <Textproseslate
                    key={proseKeyValue}
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