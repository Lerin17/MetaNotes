// import logo from './logo.svg';
// import './App.css';
import './App.css';
import React from 'react';
import { Button } from '@mui/material';
import styled from '@emotion/styled';
import { border } from '@mui/system';
import { makeStyles } from '@mui/styles';
import { ThemeProvider } from '@mui/styles';
import { green } from '@mui/material/colors';
import Loadingpage from './page/Loadingpage';
import Landingpage from './page/Landingpage';






// import { ThemeProvider } from '@emotion/react';
// styled


const usestyle = makeStyles((theme)=>({
   button: {
     ...theme.myButton,
      '&:hover': {
         backgroundColor: '#fff',
         color: theme.palette.primary.main
     }
      
      
   }
}))




const LoadingpageP = {
   
}


function App() {

   const [isLoadingpage, setisLoadingpage] = React.useState(true);
   function closeloadingpage() {
   setTimeout(() => {setisLoadingpage(false)} , 3000) 
   }
   
   React.useEffect(() => {
   closeloadingpage()
   }, []);
   

   return(
 <div>
    <Loadingpage
    isopen = {isLoadingpage}/>
    {!isLoadingpage && <Landingpage/>} 
 </div>
   ) 

 
}


export default App;
