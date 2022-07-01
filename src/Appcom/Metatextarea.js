import { ClassNames } from '@emotion/react'
import React, {Component, forwardRef, useCallback, useRef} from 'react'
import { Stylecontext } from '../context/MetamodalContext';
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




// Add the initial valu dde.
const initialValue = [
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ]



  
  const Metatextarea = () => {
    const editor = useMemo(() => withHistory(withReact(createEditor())), [])

    const {isMetamodal, toggleMetamodal,  CreateMetaID, currentMetacontent, MetacontentOnchange, updateCurrentMeta, updateMetaArray, MetaArray, } = React.useContext(Stylecontext)
   
    // let initialtextobj
    // const [markx, setmarkx] = React.useState({});
    const [value, setValue] = React.useState(initialValue);
    const [windowWidth, setwindowWidth] = React.useState();
    const [borderRadiusx, setborderRadiusx] = React.useState();

    const getBorderRadius = () => {
    if(windowWidth < 500){
        return '4px'
    }else{
        return '0px'
    }
    }

    // console.log(MetaArray)

      window.addEventListener('resize',
      ()=> setwindowWidth(window.innerWidth)
      )

      React.useEffect(() => {
        setwindowWidth(window.innerWidth)
        setborderRadiusx(getBorderRadius())
      }, [windowWidth]);
     

    //   console.log(value)


const Toolbar = () => {
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
    
        onKeyDown={()=>updateCurrentMeta(value)}

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