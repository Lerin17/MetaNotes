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
// import { SettingsRounded } from '@material-ui/icons';
import { useMemo } from 'react';
import { withHistory } from 'slate-history';
// import Textarea from '../../Appcom/textarea';
import { Metacontext } from '../../context/MetamodalContext';
import { LibaryContext } from '../../context/LibaryContext';
import { TagContext } from '../../context/tagContext';
import { Input } from '@material-ui/core';



// Add the initial valu dde.

// const saveValue = 

// const initialValue =!iscurrentMetaempty && currentMeta?currentMeta.content :  [
//   {
//     type: 'paragraph',
//     children: [{ text: '' }],
//   },
// ]

  
  const Textproseslate = () => {
    
    const {updateBookTextProse,  currentBook, bookID, LibaryArray, selectedBook, setselectedBook, isResettextareas,  setbookID, currentBookMetaArray} =  React.useContext(LibaryContext)

    const {isMetamodal, toggleMetamodal, CreateMetaID, CreateMetaObj, MetaArray, setMetaArray, currentMeta, sortSelectedMeta, MetaID,updateTestNum, updateTextProseId, updatMetaId,} = React.useContext(Metacontext)

    const {currentTag } = React.useContext(TagContext)
    


    const editor = useMemo(() => withHistory(withReact(createEditor())), [])

    let istextprosermpty = true

    const initialValue = selectedBook?selectedBook.bookTextprosecontent:[
      {
        type: 'paragraph',
        children: [{ text: '' }],
      },
    ]
  
   
    let initialtextobj
    const [markx, setmarkx] = React.useState({xx:'xx'});
    const [value, setValue] = React.useState(initialValue);
    const [title, settitle] = React.useState('');
    // const [currentTag, setcurrentTag] = React.useState();
    // const [ismarksBtnclicked, setismarksBtnclicked] = React.useState(false);

    const ontitleChange = (event) => {
      settitle(event.target.value)
    }






    React.useEffect(() => {
      updateBookTextProse(value, title)
    }, [value, title]);


    //the useeffect below handle the switvhing out of books. including their id, textprose and meta content. it occurs

    React.useEffect(() => {
      // const textprosecontent = LibaryArray.find(item => item.bookid == bookID) 

      console.log(bookID)
    

      if(selectedBook && currentBook){
        console.log('jam')
        setValue(selectedBook.bookTextprosecontent)
        settitle(selectedBook.bookTitle)
        setMetaArray(currentBookMetaArray)
        console.log('1st')
        
        console.log(selectedBook.bookid)
      }

      setTimeout(() => {
        console.log('when')
        setselectedBook()
      }, 50);
      

      // if(textprosecontent){
      //   console.log('tease') 
      //   // console.log(textprosecontent, 'content')
       
      // }
    }, [isResettextareas]);


  
  React.useEffect(() => {
    
  }, []);

  // const updateisMarkBtnclicked = () => {
  //   setismarksBtnclicked(true)
  // }

    

    const Leaf = props => {
      const {isMetamodal, toggleMetamodal, CreateMetaID, CreateMetaObj, MetaArray, setMetaArray, updateMetaArray , currentMeta,  sortSelectedMeta, MetaID,updateTestNum, updateTextProseId, updatMetaId, createCurrentMetaObj, isSelectedMetalready} = React.useContext(Metacontext)
      // const editor = useSlate()

      // console.log(MetaID)

      const content = props.children.props.leaf 
        const contentStyle = {
          fontWeight: content.bold ? 'bold' : 'normal',
          fontStyle: content.italics? 'italic': 'normal',
          opacity: content.qoutes? '0.5': '1',
          fontSize: content.header1? '32px': content.header2? '20px': content.header3? '18px': '16px',
          borderBottom: content.tag ?'2px dotted blue':'none'
          // backgroundColor: content.meta? 'red': 'none',      
        }

        const [Metapairidxx, setMetapairidxx] = React.useState(1);

        // console.log(Metapairx, 'xd')

        const contentStyleMeta = `${content.meta?'text-green-600 hover:bg-green-500 hover:text-white underline': 'bg-none'}`
        
        const isMeta = content.meta

        const slateMetaId = props.leaf.metaid
      
             return (
              <span
              {...props.attributes} className= {contentStyleMeta} onDoubleClick = {(event)=> openMetaModal( isMeta, toggleMetamodal ,sortSelectedMeta,updateTestNum, MetaArray, currentMeta,updateTextProseId, slateMetaId,createCurrentMetaObj,updateMetaArray, isSelectedMetalready, event)}
              style={contentStyle}
            >{props.children}</span>
             )          
      }


  const Titlebar = () => {
    return (
      <div>
        <div>Name</div>
        <div>
          <input></input>
        </div>
      </div>
    )
  }
  
    
   const Toolbar = (props) => {
  
    // console.log(props.mark)
    const buttonActiveStyle = props.mark
    // console.log(buttonActiveStyle.bold)
    return (
      <div>
      <ToolbarMarkBtnx activestyle = {buttonActiveStyle.bold} icon = 'B' format ='bold'  />
      <ToolbarMarkBtnx activestyle = {buttonActiveStyle.italics} icon = 'I' format = 'italics' />
      <ToolbarMarkBtnx activestyle = {buttonActiveStyle.qoutes} icon = 'Q' format = 'qoutes' />
      <ToolbarMarkBtnx activestyle = {buttonActiveStyle.header1} icon = 'H1' format = 'header1' />
      <ToolbarMarkBtnx activestyle = {buttonActiveStyle.header3} icon = 'H2' format = 'header2' /> 
      <ToolbarMarkBtnx activestyle = {buttonActiveStyle.header3} icon = 'M' format = 'meta' formatid = {MetaID} updatMetaId = {updatMetaId}  /> 
      <ToolbarMarkBtnx activestyle = {buttonActiveStyle.header3} icon = 'T' format = 'tag'   /> 
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
        return <Leaf {...props}
        markx = {markx} />  
       }, [])

     
      //  setmarkx(marks)

    return (       
      // <div className='flex flex-col lg:flex-row md:flex-row' >
        <Slate editor={editor} value={value} onChange={value => setValue(value)} >
              <div 
                style={{
                gridTemplateRows: 'auto 1fr'
                }} className='App w-full h-full  grid grid-flow-row overflow-hidden' >
                <div className="w-full  p-1 border-b border-black font-bold "> 
                <div className='border-b border-black border-dashed text-left flex justify-between' >
                  <input className='border-none bg-transparent outline-none'
                  onChange={ontitleChange}
                  value={title}
                  placeholder={'Enter title'}
                  />

                  <div className='text-gray-300 mr-16' >Last saved</div>
                </div>
                <Toolbar
                mark = {markx}
                />
          </div>
          <div style={{
                gridTemplateRows: '1fr 0.1fr'
                }} className=" main-content grid grid-flow-col overflow-hidden  ">
            <div className="overflow-auto p-4 relative lg:h-full md:h-full  ">
              {/* <div className="w-full mb-12"></div> */}
          
            < Editable  
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          autoFocus

          onClick={()=>{
            setTimeout(() => {
              console.log(Editor.marks(editor))
              setmarkx(Editor.marks(editor))
            }, 20);
            const {selection} = editor
          const anchoroffset = selection.anchor.offset
          const focusoffset = selection.focus.offset
          const focuspath = selection.focus.path

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

//toggleMark button

  const toggleMark = (editor, format, formatid, updatMetaId) => { 
    // console.log(active)
    const active = isMarkActive(editor, format)
    console.log(format)
    console.log(active)
    const formatvalue = active? false: true

   const {selection} = editor

   const anchoroffset = selection.anchor.offset
   const focusoffset = selection.focus.offset
   const focuspath = selection.focus.path




    const point = Editor.start(editor, [0, 0])


  
    if(active){
      editor.removeMark(format)
   
    }else{ 
      editor.addMark(format, formatvalue )
    }

    ReactEditor.focus(editor);
 
  //  const active = false     
      if(formatid){
        editor.addMark('metaid', formatid )
        updatMetaId()
      }

      // if(anchoroffset == focusoffset){
      //   console.log(editor)
      //   console.log(focusoffset)
      //   console.log(focuspath)
      //   // editor.autoFocus()
      //   // Transforms.select(editor, Editor.end(editor, []))
        
      //   // setTimeout(() => {
      //   //   Transforms.select(editor, {path: focuspath, offset: focusoffset});
      //   // }, 20);
      //   // Transforms.select(editor, {path: [0, 1], offset: 4});
      //   // Transforms.select(editor, {path: focuspath, offset: focusoffset})
       
        
      //  }
      

} 

////////

const isMarkActive = (editor, format) => {
  const formatx = format
    const activex = Editor.marks(editor)

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

//tool button i.e bold
  const ToolbarMarkBtnx = (props) => {
    const [format, setformat] = React.useState(props.format);
    const [formatid, setformatid] = React.useState(props.formatid);

    const updatMetaId =  props.updatMetaId
    // console.log(updatMetaId)
    const editor = useSlate();

    return (
      <Button className= {`text-black font-stick  ${props.activestyle?'font-bold':'font-normal'}`}  onMouseDown={(event)=>{
        // props.updateismarksBtnclicked()
        event.preventDefault()
        toggleMark(editor, format, formatid, updatMetaId)}}
      // disabled={isMarkActive(editor)}
      >{props.icon}</Button>
  )
   }

  //  const sortMeta = (id, MetaArray) => {
  //   const jam = MetaArray.filter(item => (item.id == id))
  //   console.log(MetaArray, 'dax')
  //   console.log(jam)
  //  }

 const openMetaModal = ( isMeta, toggleMetamodal, sortSelectedMeta,updateTestNum, MetaArray, currentMeta,updateTextProseId,slateMetaId, createCurrentMetaObj,updateMetaArray, isSelectedMetalready, event) => {
  // event.preventdefault()
  if(isMeta){
    // const string = event.target.offsetParent.innerHTML
    // console.log(event.target)
    // const bam = string.split('**')
    // console.log(bam[3], 'bam')
  //  console.log(slateMetaId, 'again')
    // console.log(markx, 'markx')
    // console.log()
    const isMetaalready = isSelectedMetalready(slateMetaId)

    if(!isMetaalready){
      createCurrentMetaObj(slateMetaId)
    }
    sortSelectedMeta(slateMetaId)
    
  
    // updateMetaArray()
    updateTextProseId(slateMetaId)
    
    toggleMetamodal()
 
  }
 }



export default Textproseslate