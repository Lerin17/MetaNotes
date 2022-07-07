import { ClassNames } from '@emotion/react'
import React, {Component, forwardRef, useCallback, useRef} from 'react'

// import { Stylecontext } from '../../context/MetamodalContext';
// Import React dependencies.

//mui dependencies
import { Button, imageListItemClasses } from "@mui/material";
// Import the Slate editor factory.
import { createEditor, Editor, Node, Path, Text, Transforms } from 'slate'

// Import the Slate components and React plugin.
import { Slate, Editable, withReact, ReactEditor, useSlate, } from 'slate-react'
// import { Leaf, STY } from '../Utilts/textstyle/fontstyle'
// import {Firstletter, CodeElement, DefaultElement } from '../Utilts/Uniquestyle/firstletter'

// import Toolbar from '../textareacomponents/Toolbar'
// import Bool from '../Utilts/boolean';
import { ExpandLess, SettingsRounded } from '@material-ui/icons';
import { useMemo } from 'react';
import { withHistory } from 'slate-history';
// import Textarea from '../../Appcom/textarea';

import { Metacontext } from '../context/MetamodalContext';
import { LibaryContext } from '../context/LibaryContext';


// Add the initial valu dde.




  
  const Metatextarea = () => {
    const editor = useMemo(() => withHistory(withReact(createEditor())), [])

    const {updateBookMetaArray} = React.useContext(LibaryContext)

    const {isMetamodal, toggleMetamodal,  CreateMetaID, currentMetacontent, currentMeta, MetacontentOnchange, updateCurrentMeta, updateMetaArray, MetaArray, } = React.useContext(Metacontext)

    
    let iscurrentMetaempty = true

    ///just hashed this out , not sure if it causes problems
    // if(currentMeta){
    //   // console.log(Boolean(currentMeta.content) , 'currentMeta')
    //   // console.log((Object.entries(currentMeta.content).length === 0) , 'currentMeta')
    //   iscurrentMetaempty = (Object.entries(currentMeta.content).length === 0)
    // }

    // React.useEffect(() => {
    //   if(!iscurrentMetaempty && currentMeta){
    //     console.log('patient')
    //     console.log(currentMeta.content, 'content')
    //     setTimeout(() => {
    //       setValue([ {
    //         type: 'paragraph',
    //         children: [{ text: '' }],
    //       }])
    //     }, 100);
      
    //   }else{
    //     console.log('eee')
    //   }
    // }, [isMetamodal]); 



    const initialValue =!iscurrentMetaempty && currentMeta?currentMeta.content :  [
      {
        type: 'paragraph',
        children: [{ text: '' }],
      },
    ]


  
   
   

   

  
   
    // let initialtextobj
    // const [markx, setmarkx] = React.useState({});
    const [value, setValue] = React.useState(initialValue);
    const [windowWidth, setwindowWidth] = React.useState();
    const [borderRadiusx, setborderRadiusx] = React.useState();


//handle updating current meta modal
    React.useEffect(() => {
      // console.log(value, 'damnx') 
      updateCurrentMeta(value)
    }, [value ]);
   




const Toolbar = ({value}) => {
    return (
        <div>
            <Button  onClick={()=>toggleMetamodal()} >X</Button>
             <Button onClick={()=>updateMetaArray()} >S</Button>
        </div>
  
    )
}
    
   

    return (       
      // <div className='flex flex-col lg:flex-row md:flex-row' >
        <Slate editor={editor} value={value} onChange={value => setValue(value)} >
              <div 
                style={{
                gridTemplateRows: 'auto 1fr',
                backgroundColor: 'grey',
               
          
                }} className='App w-full h-full  grid grid-flow-row overflow-hidden rounded lg:rounded-none md:rounded-none' >
                <div className="w-full  p-2 border-b border-black font-bold "> 
                <Toolbar
                />
          </div>
          <div style={{
                gridTemplateRows: '1fr 0.1fr'
                }} className=" main-content grid grid-flow-col overflow-hidden  ">
            <div className="overflow-auto h-32  relative lg:h-full md:h-full  ">
              {/* <div className="w-full mb-12"></div> */}
          
            < Editable
    
        // onKeyDown={()=>updateCurrentMeta(value)}

          style={{
            padding: '4px',
            border: '1px solid #999',
            textAlign: 'start',
            fontSize: '10px'
          }}
            />
            </div>
            </div>
          </div>
          </Slate>

      
   
      
    )
  }

  export default Metatextarea