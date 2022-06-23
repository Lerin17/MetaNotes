import { ClassNames } from '@emotion/react'
import React, {Component, forwardRef, useCallback, useRef} from 'react'
// Import React dependencies.

//mui dependencies
import { Button, imageListItemClasses } from "@mui/material";
// Import the Slate editor factory.
import { createEditor, Editor, Node, Path, Text, Transforms } from 'slate'

// Import the Slate components and React plugin.
import { Slate, Editable, withReact, ReactEditor, useSlate, } from 'slate-react'
// import { Leaf, STY } from '../Utilts/textstyle/fontstyle'
import {Firstletter, CodeElement, DefaultElement } from '../Utilts/Uniquestyle/firstletter'

// import Toolbar from '../textareacomponents/Toolbar'
import Bool from '../Utilts/boolean';
import { SettingsRounded } from '@material-ui/icons';
import { useMemo } from 'react';
import { withHistory } from 'slate-history';




// Add the initial valu dde.
const initialValue = [
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ]

  
  const Textproseslate = () => {
    const editor = useMemo(() => withHistory(withReact(createEditor())), [])
    // const [orfalse, setorfalse] = React.useState(true);
    // const [editorText, seteditorText] = React.useState();
    let initialtextobj
    const [markx, setmarkx] = React.useState({});
    const [value, setValue] = React.useState(initialValue);

    // const  marks = Editor.marks(editor)
    // console.log(marks)
   
    

    const Leaf = props => {
      // const editor = useSlate()
      const content = props.children.props.leaf 
        const contentStyle = {
          fontWeight: content.bold ? 'bold' : 'normal',
          fontStyle: content.italics? 'italic': 'normal',
          opacity: content.qoutes? '0.5': '1',
          fontSize: content.header1? '32px': content.header2? '20px': content.header3? '18px': '16px',
          backgroundColor: content.meta? 'red': '',      
        }
      
             return (
              <span 
              {...props.attributes} onClick = {console.log('eeee')}
              style={contentStyle}
            >
              {props.children}
            </span>
             )          
      }


      // const ToolbarMarkBtn = (props) => {
      //   function toggleorfalse(params) {
      //     setorfalse(prev => !prev) 
      // } 
      
      // if(marks){
      //   return (
      //     <Button onClick={()=>props.toggleMark(orfalse, toggleorfalse ,props.style, props.active)} className= {`text-black px-2  w-6 ${props.active? 'font-bold':'font-normal'}`} sx={{ minHeight: 0, minWidth: 0, padding: 0 }} >{props.icon}</Button>
      // )
      // } }

      // console.log(markx)
  
    
   const Toolbar = (props) => {
  
    console.log(props.mark)
    const buttonActiveStyle = props.mark
    console.log(buttonActiveStyle.bold)
    return (
      <div>
      <ToolbarMarkBtnx activestyle = {buttonActiveStyle.bold} icon = 'B' format ='bold' red='per'/>
      <ToolbarMarkBtnx activestyle = {buttonActiveStyle.italics} icon = 'I' format = 'italics' red='per'/>
      <ToolbarMarkBtnx activestyle = {buttonActiveStyle.qoutes} icon = 'Q' format = 'qoutes' red='per'/>
      {/* <ToolbarMarkBtnx icon = 'H1' format = 'qoutes' red='per'/>
      <ToolbarMarkBtnx icon = 'H2' format = 'qoutes' red='per'/> */}
      </div>
    )
   }
    
   

    const renderElement = props => {
      switch (props.element.type) {
        case 'code':
          return <CodeElement {...props} />
        default:
          return <DefaultElement {...props} />
      }
    }

    // console.log(markx)
    
   
    const toggleMark = (value, togglevaue, style, active) => { 
      console.log(value)
    
      if(active){
        const changevalue = active? false: true
        editor.addMark( style, changevalue ) 
      }else{
        // togglevaue()
        editor.addMark( style, value )
      }
  
      console.log(
        Editor.end
      )
  }


       const renderLeaf = useCallback(props => {
        return <Leaf {...props} />  
       }, [])

     
      //  setmarkx(marks)

    return (         
     <Slate editor={editor} value={value} onChange={value => setValue(value)} >
           <div 
            style={{
            gridTemplateRows: 'auto 1fr'
            }} className='App w-full h-full  grid grid-flow-row overflow-hidden' >
            <div className="w-full p-4 border-b border-black font-bold "> 
            <Toolbar
            mark = {markx}
            />
      </div>
      <div style={{
            gridTemplateRows: '1fr 0.1fr'
            }} className=" main-content grid grid-flow-col overflow-hidden  ">
        <div className="overflow-auto p-4 relative ">
          {/* <div className="w-full mb-12"></div> */}
      
        < Editable  
      renderElement={renderElement}
      renderLeaf={renderLeaf}
      autoFocus

      onClick={()=>{
        setTimeout(() => {
          console.log('no id')
          setmarkx(Editor.marks(editor))
        }, 50);
      }}

      style={{
        padding: '10px',
        border: '1px solid #999',
        textAlign: 'start',
       }}
        />
         </div>
        </div>
      </div>
      </Slate>
     
      
    )
  }

  // const isMarkActive = (editor, format) => {
  //   const marks = Editor.marks(editor);
  //   return marks ? marks[format] === true : false;
  // };

  // const MarkButton = ({ format, icon }) => {
  //   const editor = useSlate();
  //   return (
  //     <Button
  //       active={isMarkActive(editor, format)}
  //       onMouseDown={event => {
  //         event.preventDefault();
  //         toggleMark(editor, format);
  //       }}
  //     >
  //       <Icon>{icon}</Icon>
  //     </Button>
  //   );
  // };

  const toggleMark = (editor, format) => { 
    // console.log(active)
    const active = isMarkActive(editor, format)
    console.log(format)
    console.log(active)

     const formatvalue = active? false: true
  //  const active = false
     
      editor.addMark(format, formatvalue )
}

const isMarkActive = (editor, format) => {
  const formatx = format
    const activex = Editor.marks(editor)
    // console.log(editor)
  //   console.log(format)
  //  console.log(activex, 'ee')
  let Smarkactive = false

   if(activex == null){
    Smarkactive = false
   }else {
    // console.log(format)
    if (activex[format] === true){
      // console.log('yes')
      Smarkactive = true
     }
   }

  

     return (Smarkactive)
  //  console.log(Boolean(activex.format))
   
}


  const ToolbarMarkBtnx = (props) => {
    const [format, setformat] = React.useState(props.format);
    // console.log(format)
    const editor = useSlate();
    // const format = props.format
    // console.log(props)
  //  const active = isMarkActive(editor, format)

   
   console.log(props.activestyle)
    return (
      <Button className= {`text-black ${props.activestyle?'font-bold':'font-normal'}`}  onMouseDown={()=>{toggleMark(editor, format)}}
      // disabled={isMarkActive(editor)}
      >{props.icon}</Button>
  )
   }



export default Textproseslate