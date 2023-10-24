import { Button, InputBase } from '@mui/material';
import React from 'react'
import axios from 'axios'
import { TeamsContext } from '../../context/teamsContext';
import { UserContext } from '../../context/userContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { Toast } from 'react-toastify/dist/components';

const LoginSignup = () => {

const [isLogin, setisLogin] = React.useState(false);



   const {setuserEmail, setuserName, setuserPassword, SignUp, notification, setnotification, userData, isLoginModalOpen, LogIn, isWaitingUserContext, setisWaitingUserContext} = React.useContext(UserContext)

   

   const notify = () => toast.success(notification.message, {
    position: "bottom-left",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    closeButton: true,
    theme:"dark"
   })

   const  notifyerrorx = () => toast.error(notification.message, {
    position: "bottom-left",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    closeButton: true,
    theme:"dark"
   })

   console.log(notification)

//    setTimeout(() => {
//     notify()
//    }, 3000);

   React.useEffect(() => {
    if(notification){
        if(notification.type == 'error' && notification.instance=='LOGIN/SIGNUP'){
            notifyerrorx()
            setnotification(null)
            return
        }
        if(notification.instance == 'LOGIN/SIGNUP'){
        notify()
        setnotification(null)
        }  
    }
   }, [notification]);

   React.useEffect(() => {
    if(notification){
        if(notification.type == 'error' && notification.instance=='TEAMS'){
            notifyerrorx()
            setnotification(null)
            return
        }
        if(notification.instance == 'TEAMS'){
        notify()
        setnotification(null)
        }  
    }
   }, [notification]);



  return (
    <div>
        {/* <ToastContainer/> */}
         <div className=" font-header5 p-4 flex items-center font-bold" >
                    <div onClick={()=>{setisLogin(true)
                    }} className={`${isLogin?'text-2xl bg-gradient-to-l from-gray-400 via-gray-200 to-gray-300':'text-2xl'} hover:scale-110 transition-all px-2 py-1cursor-pointer`} >{userData?'Profile':'Login'}</div>

                        <span className='text-4xl px-1'>
                            /
                        </span>

                    <button onClick={()=>setisLogin(false)} className={` transition-all ${isLogin?'':' bg-gradient-to-l from-gray-400 via-gray-200 to-gray-300 '} cursor-pointer rounded-xl text-3xl flex items-center px-2 py-1 font-header5`}>Sign up</button>
                </div>

    {isLogin ? 
    userData? <div className='text-3xl mx-4 '>
        <div className='py-1'>
          Name: {userData.username}
        </div>

        <div className='py-1'>
          SharedBooks: 15
        </div>
    </div> :  <div className='mt-8 font-header5' >
                    {isWaitingUserContext?<div className='text-2xl px-4 pt-2'>
                        <svg className='animate-spin' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>
                    </div>:<div>
                    <div className='flex' >
                    <div className='ml-4 text-2xl'>Name:</div>
                    <InputBase
                    onChange={(e)=>setuserName(e.target.value)}
                    className='border-b-2 w-full px-2' />
                </div>

                <div className='flex mt-8' >
                    <div className='ml-4 text-2xl'>Password:</div>
                    <InputBase 
                    onChange={(e)=>setuserPassword(e.target.value)}
                    className='border-b-2 w-full px-2' />
                </div></div>}
          
            </div>:  <div className='mt-8 font-header5' >
                {isWaitingUserContext?<div className='text-2xl px-4 pt-2'>
                        <svg className='animate-spin' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>
                    </div>: <div>
                <div className='flex' >
                    <div className='ml-4 text-2xl'>Name:</div>
                    <InputBase
                    onChange={(e)=>setuserName(e.target.value)}
                    className='border-b-2 w-full px-2' />
                </div>

                <div className='flex mt-8' >
                    <div className='ml-4 text-2xl'>Email:</div>
                    <InputBase
                    onChange={(e)=>setuserEmail(e.target.value)}
                    type='mail' className='border-b-2 w-full px-2' />
                </div>

                <div className='flex mt-8' >
                    <div className='ml-4 text-2xl'>Password:</div>
                    <InputBase 
                    onChange={(e)=>setuserPassword(e.target.value)}
                    className='border-b-2 w-full px-2' />
                </div>
                    </div>}
             
            </div>}
          
        {isLogin?   <div onClick={LogIn} className={`mt-8 ${isWaitingUserContext?'hidden':''} flex ${userData?'justify-end ':'justify-end '} font-header5 px-4`}>
            <button className={`${userData?'mr-10':''} px-2 py-1 rounded-lg bg-gradient-to-l from-gray-300 via-gray-200 to-gray-400 `}>
                {userData?'Log Out':'Log In'}         
            </button>
        </div>:  <div className={`${isWaitingUserContext?'hidden':''} mt-8 flex justify-end px-4`}>
            <Button onClick={SignUp}>
                Sign Up
            </Button>
        </div>}
      
                

    </div>
  )
}

export default LoginSignup