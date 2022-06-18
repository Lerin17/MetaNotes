import { ClassNames } from '@emotion/react'
import React, {Component, forwardRef, useCallback, useRef} from 'react'
// Import React dependencies.

//mui dependencies
import { Button } from "@mui/material";
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

  // const STYx = STY

  // console.log(STY)
  
  const Textproseslate = (props) => {
    const editor = useMemo(() => withHistory(withReact(createEditor())), [])
    const [orfalse, setorfalse] = React.useState(true);
    // const [editorText, seteditorText] = React.useState();
    let initialtextobj
    const [markx, setmarkx] = React.useState();
    

  editor.onChange(
    console.log('wwww')
  )

  React.useEffect(() => { 
    initialtextobj = editor.children[0].children[0].text 
    console.log(initialtextobj.length)
    console.log('eeeede')  
     }, []);



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
    



        // editor.onChange(
        //   console.log(editor.selection)
        // )

        // console.log(getstyle())

  


    
    const ToolbarMarkBtn = (props) => {
      function toggleorfalse(params) {
        setorfalse(prev => !prev) 
    } 
    
    if(markx){
      return (
        <Button onClick={()=>props.toggleMark(orfalse, toggleorfalse ,props.style, props.active)} className= {`text-black px-2  w-6 ${props.active? 'font-bold':'font-normal'}`} sx={{ minHeight: 0, minWidth: 0, padding: 0 }} >{props.icon}</Button>
    )
    } }

      
    
    const Toolbar = () => {
      // const editor = useSlate()
   
  if(markx){
    return (
      <div className="flex bg-white " >
        <ToolbarMarkBtn active = {markx.bold} style = 'bold'  icon = 'B'
        toggleMark = {toggleMark}
        />

        <ToolbarMarkBtn active = {markx.italics} style = 'italics'  icon = 'I'
        toggleMark = {toggleMark}
        />

        <ToolbarMarkBtn active = {markx.qoutes} style = 'qoutes'  icon = '**'
        toggleMark = {toggleMark}
        />
      
      <div className='ml-3'>
      <ToolbarMarkBtn active = {markx.qoutes} style = 'header1'  icon = 'H1'
        toggleMark = {toggleMark}
        />

      <ToolbarMarkBtn active = {markx.qoutes} style = 'header2'  icon = 'H2'
        toggleMark = {toggleMark}
        />

      <ToolbarMarkBtn active = {markx.qoutes} style = 'header3'  icon = 'H3'
        toggleMark = {toggleMark}
        />

      </div>

      <div>
      <ToolbarMarkBtn active = {markx.qoutes} style = 'meta'  icon = 'M'
        toggleMark = {toggleMark}
        />
      </div>

      <div className='ml-8' >
      <ToolbarMarkBtn active = {markx.qoutes} style = 'header3'  icon = 'A'
        toggleMark = {toggleMark}
        />
          <ToolbarMarkBtn active = {markx.qoutes} style = 'header3'  icon = 'V'
        toggleMark = {toggleMark}
        />
      </div>
      
        {/* <Button className="px-2 text-black w-6 " sx={{ minHeight: 0, minWidth: 0, padding: 0 }} >I</Button> */}
      </div>
    )

  }
      
    }
  

    const renderElement = props => {
      switch (props.element.type) {
        case 'code':
          return <CodeElement {...props} />
        default:
          return <DefaultElement {...props} />
      }
    }

    
   
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


        // editor.onChange(
        //   console.log('eeeee'),
        //   ReactEditor.focus(editor),
        //    Transforms.select(editor, Editor.end(editor, [])) 
        // )

  }


       const renderLeaf = useCallback(props => {
        return <Leaf {...props} />  
       }, [])

  

      //  console.log(markx)

;



    return (

            <div 
            style={{
            gridTemplateRows: 'auto 1fr'
            }} className='App w-full h-full  grid grid-flow-row overflow-hidden' >
            <div className="w-full p-4 border-b border-black font-bold "> 
            <Toolbar
      toggleMark = {toggleMark}
      />
      </div>
      <div style={{
            gridTemplateRows: '1fr 0.1fr'
            }} className=" main-content grid grid-flow-col overflow-hidden  ">
        <div className="overflow-auto p-4 relative ">
          <div className="w-full mb-12">
              
     <Slate editor={editor} value={initialValue}>
      
        < Editable  
      renderElement={renderElement}
      renderLeaf={renderLeaf}
      // autoFocus

      style={{
        padding: '10px',
        border: '1px solid #999',
        textAlign: 'start',
      
      }}
      
      // onMouseEnter={()=>{
      //  const  marks = Editor.marks(editor)
      //  setmarkx(marks)
      // } 
      // }

   

      onClick= {()=>{
        const  marks = Editor.marks(editor)
        setmarkx(marks)
        // ReactEditor.focus(editor),
        // Transforms.select(editor, [0,0]) 
      }
      }
  
      onKeyDown={event => {
        if (event.key === '`' && event.ctrlKey) {
          console.log('clickced')
          event.preventDefault()
          const [match] = Editor.nodes(editor, {
            match: n => n.type === 'code',
          })
          Transforms.setNodes(
            editor,
            { type: match ? 'paragraph' : 'code' },
            { match: n => Editor.isBlock(editor, n)}
          )
        }
      }}
        />

      </Slate>
      </div>
        </div>
      </div>
        </div>
      
    )
  }




export default Textproseslate