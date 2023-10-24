import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'remixicon/fonts/remixicon.css'
import "react-toastify/dist/ReactToastify.css";


import App from './App';
import reportWebVitals from './reportWebVitals';
import { StyledEngineProvider, ThemeProvider } from '@mui/material';
import theme from './theme';
import Navbar from './components/navbar';
import Leftbar from './components/leftbar';

import { MetacontextProvider } from './context/MetamodalContext';
import { LibaryContextProvider } from './context/LibaryContext';
import { TagContextProvider } from './context/tagContext';
import { DashboardContextProvider } from './context/DashboardContext';
import { BionicContextProvider } from './context/bionicContext';
import { TeamsContextProvider } from './context/teamsContext';
import { UserContextProvider } from './context/userContext';
import { SocketContextProvider } from './context/socketContext';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme = {theme}>
      <UserContextProvider>
        <SocketContextProvider>
        <TeamsContextProvider>
         <MetacontextProvider>
          <LibaryContextProvider>
          <TagContextProvider>
            <DashboardContextProvider>
                <BionicContextProvider>
                  <App />
                </BionicContextProvider>
            </DashboardContextProvider>
          </TagContextProvider>
          </LibaryContextProvider>   
        </MetacontextProvider>
      </TeamsContextProvider>
        </SocketContextProvider> 
      </UserContextProvider>   
    </ThemeProvider >  
    </StyledEngineProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
