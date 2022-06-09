import { ClassNames } from '@emotion/react'
import React, {Component, useCallback} from 'react'
// Import React dependencies.

//mui dependencies
import { Button } from "@mui/material";

// Import the Slate editor factory.
import { createEditor, Editor, Path, Text, Transforms } from 'slate'

// Import the Slate components and React plugin.
import { Slate, Editable, withReact, } from 'slate-react'
import { Leaf } from '../Utilts/textstyle/fontstyle'
import {Firstletter, CodeElement, DefaultElement } from '../Utilts/Uniquestyle/firstletter'

// import Toolbar from '../textareacomponents/Toolbar'
import Bool from '../Utilts/boolean';










// Add the initial valu dde.
const initialValue = [
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ]
  
  const Textproseslate = () => {
    const [editor] = React.useState(() => withReact(createEditor()))
    // const [first, setfirst] = React.useState(false);
   

    
    const ToolbarMarkBtn = (props) => {
     const [value, togglevalue] = Bool(true)
      return (
          <Button onClick={()=>props.toggleMark(value, togglevalue)} className="px-2 text-black w-6" sx={{ minHeight: 0, minWidth: 0, padding: 0 }} >{props.icon}</Button>
      )
      }
      
    
    const Toolbar = () => {
      // const editor = useSlate()
      return (
        <div className="flex bg-white" >
          <ToolbarMarkBtn style = 'bold' value = {true} icon = 'B'
          toggleMark = {toggleMark}
          />
          <Button className="px-2 text-black w-6 " sx={{ minHeight: 0, minWidth: 0, padding: 0 }} >I</Button>
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

   
    const toggleMark = (value, togglevalue) => { 
      // console.log('clck')
      togglevalue()
      editor.addMark('italics', value )
  }


    const renderLeaf = useCallback(props => {
      return <Leaf {...props} />
    }, [])

   
   
    console.log(Text)

    return (
        <div className='bg-red-200' >


     <Slate editor={editor} value={initialValue}>

      <Toolbar
      toggleMark = {toggleMark}
      />
      
        < Editable  
      renderElement={renderElement}
      renderLeaf={renderLeaf}

      // onMouseMove = {
      //   console.log('eee')
      // }
  
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
     
    )
  }




export default Textproseslate