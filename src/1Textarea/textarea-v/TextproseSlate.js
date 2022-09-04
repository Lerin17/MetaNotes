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




// const initialValue =!iscurrentMetaempty && currentMeta?currentMeta.content :  [
//   {
//     type: 'paragraph',
//     children: [{ text: '' }],
//   },
// ]

  
  const Textproseslate = () => {
    
    const {updateBookTextProse,  currentBook, bookID, LibaryArray, selectedBook, setselectedBook, isResettextareas,  setbookID, currentBookMetaArray} =  React.useContext(LibaryContext)

    const {isMetamodal, toggleMetamodal, CreateMetaID, CreateMetaObj, MetaArray, setMetaArray, currentMeta, sortSelectedMeta, MetaID,updateTestNum, updateTextProseId, updatMetaId,} = React.useContext(Metacontext)

    const {currentTag,  currentTagObj, gettextproseValues, settextproseLocationObj, currentLocationPath, setcurrentLocationPath } = React.useContext(TagContext)
    
    // console.log(currentTagObj)

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
      gettextproseValues(value, editor)
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


    //handle the updating of the location needed to switch from tagLocation to initial cursorLocation

    React.useEffect(() => {
      if(editor){
        settextproseLocationObj(editor.selection)
      }
      
    }, [value]);

    const swtichCursorLocation = () => {
      ReactEditor.focus(editor)
      console.log('damn')
      Transforms.select(editor, {path: currentLocationPath, offset: 0})
      setcurrentLocationPath(null)
    }

    //handle ui change for finding tagLocation
      React.useEffect(() => {
        // console.log('switch')
        // console.log(currentLocationPath,'switch')
        if(currentLocationPath){
         
          swtichCursorLocation();
        }

      
      }, [currentLocationPath]);


  
  // React.useEffect(() => {
    
  // }, []);

  // const updateisMarkBtnclicked = () => {
  //   setismarksBtnclicked(true)
  // }

    

    const Leaf = props => {
      const {isMetamodal, toggleMetamodal, CreateMetaID, CreateMetaObj, MetaArray, setMetaArray, updateMetaArray , currentMeta,  sortSelectedMeta, MetaID,updateTestNum, updateTextProseId, updatMetaId, createCurrentMetaObj, isSelectedMetalready} = React.useContext(Metacontext)

      //use tags array to decide colors base on taggs obj for styling
      const {tagsArray} = React.useContext(TagContext)

      // console.log(tagsArray, 'everything')
      // const editor = useSlate()

      // console.log(MetaID)

      const content = props.children.props.leaf 

      const tagtype = content.tagtype
      const istag = content.tag

    //  const getcolor = tagtype && istag? tagsArray.find(item => item.color == tagtype):''

     const getcolor = () => {
      // console.log(tagsArray)
      // console

      if(tagtype && istag){
       const colorstyelobj = tagsArray.find(item => item.name == tagtype)
        // console.log(tagtype)
      //  console.log(colorstyelobj)
      if(colorstyelobj){
        return (
          colorstyelobj.color
        )
      }else{
        return (
          ''
        )
      }
       
      }else{
        return (
          ''
        )
      }
     }

    //  console.log(getcolor())

      // const gettagstylecolor = if (tagtype && istag){
      //   const tagcolorobj = 
      // }else{

      // } {
       

      //  if(tagtype && istag && tagcolorobj){
      //   return tagcolorobj.color
      //  }
     
      // }

      // console.log(getcolor())

        const contentStyle = {
          fontWeight: content.bold ? 'bold' : 'normal',
          fontStyle: content.italics? 'italic': 'normal',
          opacity: content.qoutes? '0.5': '1',
          fontSize: content.header1? '32px': content.header2? '20px': content.header3? '18px': '16px',
          borderBottom: content.tag ?`2px dotted ${getcolor()}`:'none'
          // backgroundColor: content.meta? 'red': 'none',      
        }

        const [Metapairidxx, setMetapairidxx] = React.useState(1);

        // console.log(Metapairx, 'xd')
        // isMeta is run with cotent.meta noramlly to switch back to istag,  
        const isMeta = istag
        // const isMeta = content.meta

        const contentStyleMeta = `${isMeta?'text-green-600  hover:animate-slide underline': 'bg-none'}`
        
       
        

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
  

  // console.log(currentTagObj)
    
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
      {/* <ToolbarMarkBtnx activestyle = {buttonActiveStyle.header3} icon = 'M' format = 'meta' formatid = {MetaID} updatMetaId = {updatMetaId}  />  */}
      <ToolbarMarkBtnx activestyle = {buttonActiveStyle.header3} icon = 'T' format = 'tag' currentTagObj={currentTagObj}   formatid = {MetaID} updatMetaId = {updatMetaId} /> 
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
                }} className='App w-full h-full bg-white grid grid-flow-row overflow-hidden' >
              <div className="w-full rounded  font-bold overflow-hidden px-2"> 
                  <div className=' text-left flex justify-between py-1' >
                      <input className='border-none bg-transparent outline-none font-header5 font-bold text-gray-300'
                      onChange={ontitleChange}
                      value={title}
                      placeholder={'Enter title'}
                      />

                      <div className='text-gray-300 mr-16 font-header5' >
                        Last saved
                        </div>
                  </div>
                  <div className=' border-2 border-slate-400' >
                    <Toolbar
                    mark = {markx}
                    />
                  </div>
               
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
              console.log(editor.selection)
              console.log(value)
              // gettextproseEditor(editor)
            }, 20);
          //   const {selection} = editor
          // const anchoroffset = selection.anchor.offset
          // const focusoffset = selection.focus.offset
          // const focuspath = selection.focus.path

          }}

          style={{
            padding: '10px',
            borderTop: '2px solid #94A3B8',
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

  const toggleMark = (editor, format, formatid, updatMetaId, currentTagObj) => { 
    // console.log(active)
    const active = isMarkActive(editor, format)
    console.log(format)
    console.log(active)
    const formatvalue = active? false: true

  //  const {selection} = editor

  // Transforms.select(editor, {path: [0, 0], offset: 3});

  //  const anchoroffset = selection.anchor.offset
  //  const focusoffset = selection.focus.offset
  //  const focuspath = selection.focus.path


    console.log(currentTagObj)

  
    if(active){
      editor.removeMark(format)
      if(formatid){
        editor.removeMark('metaid')
        updatMetaId()
      } 
      if(currentTagObj){
        editor.removeMark('tagtype') 
       }
   
    }else{ 
      editor.addMark(format, formatvalue )
      if(formatid){
        editor.addMark('metaid', formatid )
        updatMetaId()
      }    
      if(currentTagObj){
        console.log('swagger back')
       editor.addMark('tagtype', currentTagObj.name) 
      }
    }

    ReactEditor.focus(editor);

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
}

//tool button i.e bold
  const ToolbarMarkBtnx = (props) => {
    const [format, setformat] = React.useState(props.format);
    const [formatid, setformatid] = React.useState(props.formatid);

    const currentTagObj = props.currentTagObj

    // console.log(currentTagObj, 'current')
    const updatMetaId =  props.updatMetaId
    // console.log(updatMetaId)
    const editor = useSlate();

    // console.log(props.currentTagObj)

    return (
      <Button className= {`text-slate-400 font-header3 transition-all hover:scale-105 hover:bg-slate-400 hover:text-white  ${props.activestyle?'font-bold':'font-normal'}`}  onMouseDown={(event)=>{
        // props.updateismarksBtnclicked()
        event.preventDefault()
        toggleMark(editor, format, formatid, updatMetaId, currentTagObj)}}
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
    const isMetaalready = isSelectedMetalready(slateMetaId)

    if(!isMetaalready){
      createCurrentMetaObj(slateMetaId)
    }

    sortSelectedMeta(slateMetaId)
    updateTextProseId(slateMetaId)
    
    toggleMetamodal()
 
  }
 }



export default Textproseslate