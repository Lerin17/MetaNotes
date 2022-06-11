import { ClassNames } from '@emotion/react'
import React, {Component, forwardRef, useCallback, useRef} from 'react'
// Import React dependencies.

//mui dependencies
import { Button } from "@mui/material";

// Import the Slate editor factory.
import { createEditor, Editor, Path, Text, Transforms } from 'slate'

// Import the Slate components and React plugin.
import { Slate, Editable, withReact, ReactEditor, useSlate, } from 'slate-react'
// import { Leaf, STY } from '../Utilts/textstyle/fontstyle'
import {Firstletter, CodeElement, DefaultElement } from '../Utilts/Uniquestyle/firstletter'

// import Toolbar from '../textareacomponents/Toolbar'
import Bool from '../Utilts/boolean';
import { SettingsRounded } from '@material-ui/icons';



// useSlate
// React.forwardRef



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
    const [editor] = React.useState(() => withReact(createEditor()))
    const [orfalse, setorfalse] = React.useState(true);
    // const [editorText, seteditorText] = React.useState();
    let initialtextobj
    const [markx, setmarkx] = React.useState();
    

  // console.log(editorText)
 

  editor.onChange(
    console.log('wwww')
  )

  React.useEffect(() => { 
    initialtextobj = editor.children[0].children[0].text 
    console.log(initialtextobj.length)
  

    //    setTimeout(() => {
    //   Transforms.setNodes(
    //     editor,
    //     { bold: true },
    //     {
    //       at: {
    //         anchor: { path: [0, 0], offset: 0 },
    //         focus: { path: [0, 0], offset: 1 },
    //       },
    //       match: node => Text.isText(node),
    //       split: true,
    //     }
    //   )
      
    // }, 1000);

    console.log('eeeede')  
     }, []);

    
    
    


   

    const Leaf = props => {
      // const editor = useSlate()
      const content = props.children.props.leaf
      
      
        const contentStyle = {
          fontWeight: content.bold ? 'bold' : 'normal',
          fontStyle: content.italics? 'italic': 'normal',
          opacity: content.qoutes? '0.5': '1'
          
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
    



        editor.onChange(
        console.log('eeexxxxx')
        )

        // console.log(getstyle())

        console.log(editor.children)


    
    const ToolbarMarkBtn = (props) => {
      function toggleorfalse(params) {
        setorfalse(prev => !prev) 
    }
    
    // console.log(getstyle())
    
    if(markx){
      return (
        <Button onClick={()=>props.toggleMark(orfalse, toggleorfalse ,props.style, props.active)} className= {`text-black px-2  w-6 ${props.active? 'font-bold':'font-normal'}`} sx={{ minHeight: 0, minWidth: 0, padding: 0 }} >{props.icon}</Button>
    )


    }
    
      }

      
    
    const Toolbar = () => {
      // const editor = useSlate()
   
  if(markx){
    return (
      <div className="flex bg-white" >
        <ToolbarMarkBtn active = {markx.bold} style = 'bold'  icon = 'B'
        toggleMark = {toggleMark}
        />

        <ToolbarMarkBtn active = {markx.italics} style = 'italics'  icon = 'I'
        toggleMark = {toggleMark}
        />

        <ToolbarMarkBtn active = {markx.qoutes} style = 'qoutes'  icon = '**'
        toggleMark = {toggleMark}
        />
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
  


        editor.onChange(
          console.log('eeeee'),
          ReactEditor.focus(editor),
           Transforms.select(editor, Editor.end(editor, [])) 
        )

  }


       const renderLeaf = useCallback(props => {
        return <Leaf {...props} />  
       }, [])

  

       console.log(markx)

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
      
      onMouseEnter={()=>{
       const  marks = Editor.marks(editor)
       setmarkx(marks)
      } 
      }

      onClick= {()=>{
        const  marks = Editor.marks(editor)
        setmarkx(marks)
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
     
    )
  }




export default Textproseslate