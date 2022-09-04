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




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme = {theme}>
      <MetacontextProvider>
          <LibaryContextProvider>
          <TagContextProvider>
            <DashboardContextProvider>
            <App />
            </DashboardContextProvider>
          </TagContextProvider>
          </LibaryContextProvider>   
      </MetacontextProvider>
    </ThemeProvider >  
    </StyledEngineProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
