import { ClassNames } from '@emotion/react'
import React, {Component, forwardRef, useCallback, useRef} from 'react'
// Import React dependencies.

//mui dependencies
import { Button } from "@mui/material";

// Import the Slate editor factory.
import { createEditor, Editor, Path, Text, Transforms } from 'slate'

// Import the Slate components and React plugin.
import { Slate, Editable, withReact, ReactEditor, } from 'slate-react'
import { getstyle, Leaf } from '../Utilts/textstyle/fontstyle'
import {Firstletter, CodeElement, DefaultElement } from '../Utilts/Uniquestyle/firstletter'

// import Toolbar from '../textareacomponents/Toolbar'
import Bool from '../Utilts/boolean';
import { SettingsRounded } from '@material-ui/icons';




// React.forwardRef



// Add the initial valu dde.
const initialValue = [
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ]

  
  const Textproseslate = (props) => {
    const [editor] = React.useState(() => withReact(createEditor()))
    const [orfalse, setorfalse] = React.useState(true);
    const [editorText, seteditorText] = React.useState();
    let initialtextobj
    

  console.log(editorText)
  console.log(getstyle())

  editor.onChange(
    console.log('wwww')
  )

  React.useEffect(() => { 
    initialtextobj = editor.children[0].children[0].text 
    console.log(initialtextobj.length)
  
    seteditorText(
      editor.children[0].children[0].text 
    )


       setTimeout(() => {
      Transforms.setNodes(
        editor,
        { bold: true },
        {
          at: {
            anchor: { path: [0, 0], offset: 0 },
            focus: { path: [0, 0], offset: 1 },
          },
          match: node => Text.isText(node),
          split: true,
        }
      )
      
    }, 1000);
    
 
   
    // Transforms.setNodes(
    //   editor,
    //   { bold: true },
    //   {
    //     at: {
    //       anchor: { path: [0, 0], offset: 0 },
    //       focus: { path: [0, 0], offset: 1 },
    //     },
    //     match: node => Text.isText(node),
    //     split: true,
    //   }
    // )
  
    console.log('eeeede')  
     }, [editorText]);


    

    // let currentTextArea = React.useRef(null)
   
    // ReactEditor.focus(editor)
    
    // ReactEditor.focus(editor)
    // ReactEditor.focus(editor);
    // Transforms.select(editor, Editor.end(editor, []));

    // editor.onChange(
    //   console.log('eeee'),
      
    // )
 

  function toggleorfalse(params) {
      setorfalse(prev => !prev) 
  }

    
    const ToolbarMarkBtn = (props) => {
    //  const [value, togglevalue] = Bool(true)

     const markstyles = getstyle()
   
     if(markstyles){
      console.log(markstyles)
     }

      return (
          <Button onClick={()=>props.toggleMark(orfalse, toggleorfalse, props.style)} className="px-2 text-black w-6" sx={{ minHeight: 0, minWidth: 0, padding: 0 }} >{props.icon}</Button>
      )
      }

      
    
    const Toolbar = () => {
      // const editor = useSlate()
      return (
        <div className="flex bg-white" >
          <ToolbarMarkBtn style = 'bold'  icon = 'B'
          toggleMark = {toggleMark}
          />

          <ToolbarMarkBtn style = 'italics'  icon = 'I'
          toggleMark = {toggleMark}
          />
          {/* <Button className="px-2 text-black w-6 " sx={{ minHeight: 0, minWidth: 0, padding: 0 }} >I</Button> */}
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

   
    const toggleMark = (value, togglevaue, style) => { 
      console.log(value)
      togglevaue()
      editor.addMark( style, value )


        editor.onChange(
          console.log('eeeee'),
          ReactEditor.focus(editor),
           Transforms.select(editor, Editor.end(editor, [])) 
        )

  }


       const renderLeaf = useCallback(props => {
        return <Leaf {...props} />  
       }, [])

  



;

//  editor.selection()
//    Transforms.insertNodes(editor, [
//     {type:'paragraph', children:[{text: 'some text', marks:[]}]},
//   ],
//   {at:[0]}
// )
    
// Transforms.insertNodes(editor, [
//   {type:'inline_type', children:[{text: 'some text', marks:[]}]},
//   {text: ' and some text after the inline', marks: []}
// ]
// );

// Transforms.insertNodes(editor, [
//   {type:'inline_type', children:[{text: 'some text', marks:[]}]},
// ],
// {at:[0]}
// );

    return (
        <div className='bg-red-200' 
         >


     <Slate editor={editor} value={initialValue}>

      <Toolbar
      toggleMark = {toggleMark}
      />
      
        < Editable  
      renderElement={renderElement}
      renderLeaf={renderLeaf}
      onChange = {console.log('eee')}
      
  
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