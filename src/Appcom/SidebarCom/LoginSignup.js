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



   const {setuserEmail, setuserName, setuserPassword, SignUp, notification, setnotification, userData, isLoginModalOpen, LogIn} = React.useContext(UserContext)

   

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
        <ToastContainer/>
         <div className="text-5xl font-header5 p-4 flex font-bold" >
                    <div onClick={()=>{setisLogin(true)
                    }} className='hover:scale-110 transition-all cursor-pointer' >{userData?'Profile/':'Login/'}</div>
                    <div onClick={()=>setisLogin(false)} className='hover:scale-110 transition-all cursor-pointer'>Sign up</div>
                </div>

    {isLogin ? userData? <div className='text-3xl mx-4 '>
        <div className='py-1'>
          Name: John
        </div>

        <div className='py-1'>
          SharedBooks: 15
        </div>
    </div> : <div className='mt-8 font-header5' >
                <div className='flex' >
                    <div className='ml-4 text-2xl'>Name:</div>
                    <InputBase
                    onChange={(e)=>setuserName(e.target.value)}
                    className='border-b-2 w-full px-2' />
                </div>

                {/* <div className='flex mt-8' >
                    <div className='ml-4 text-2xl'>Email:</div>
                    <InputBase
                    onChange={(e)=>setuserEmail(e.target.value)}
                    type='mail' className='border-b-2 w-full px-2' />
                </div> */}

                <div className='flex mt-8' >
                    <div className='ml-4 text-2xl'>Password:</div>
                    <InputBase 
                    onChange={(e)=>setuserPassword(e.target.value)}
                    className='border-b-2 w-full px-2' />
                </div>
            </div>:  <div className='mt-8 font-header5' >
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
          
        {isLogin?   <div onClick={LogIn} className={`mt-8 flex ${userData?'justify-end ':'justify-end '} px-4`}>
            <Button className={`${userData?'mr-10':''}`}>
                {userData?'Log Out':'Log In'}         
            </Button>
        </div>:  <div className='mt-8 flex justify-end px-4'>
            <Button onClick={SignUp}>
                Sign Up
            </Button>
        </div>}
      
                

    </div>
  )
}

export default LoginSignup