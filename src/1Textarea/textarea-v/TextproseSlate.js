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

import { Popover } from 'react-tiny-popover';
import { bionicContext } from '../../context/bionicContext';


// const initialValue =!iscurrentMetaempty && currentMeta?currentMeta.content :  [
//   {
//     type: 'paragraph',
//     children: [{ text: '' }],
//   },
// ]

  
  const Textproseslate = () => {
    
    const {updateBookTextProse,  currentBook, bookID, LibaryArray, selectedBook, setselectedBook, isResettextareas,  setbookID, currentBookMetaArray} =  React.useContext(LibaryContext)

    const {isMetamodal, toggleMetamodal, CreateMetaID, CreateMetaObj, MetaArray, setMetaArray, currentMeta, sortSelectedMeta, MetaID, updateTestNum, updateTextProseId, updatMetaId, currentMetaPopoverContent } = React.useContext(Metacontext)

    const {currentTag,  currentTagObj, gettextproseValues, settextproseLocationObj, currentLocationPath, setcurrentLocationPath } = React.useContext(TagContext)

    const {updateInitialTextProseValue, bionicTextValueAltered, isActivateBionicText, initialTextProseValue} = React.useContext(bionicContext)
    
    // console.log(currentTagObj)

    const editor = useMemo(() => withHistory(withReact(createEditor())), [])

    let istextprosermpty = true
    let initialValue
    let initialTitle = ''

    // const initialValue = selectedBook?selectedBook.bookTextprosecontent:[
    //   {
    //     type: 'paragraph',
    //     children: [{ text: '' }],
    //   },
    // ]

    // console.log()

    //code below sets the intialtextValue, in the case of a textArea reset
   if(selectedBook || isActivateBionicText){
    console.log(initialTextProseValue, 'some')
      if(selectedBook){
        console.log(selectedBook.bookTextprosecontent, 'bookera')
        initialValue = selectedBook.bookTextprosecontent
      }else if(isActivateBionicText){
        console.log(bionicTextValueAltered, 'ddddx')
        // initialValue = [l 
        
        //   {
        //     type: 'paragraph',
        //     children: [{ text: '' }],
        //   },
        // ]
         initialValue = bionicTextValueAltered
         initialTitle = initialTextProseValue.title
      }
   
   }else{
    // console.log(initialTextProseValue, 'some')

  if(!initialTextProseValue){
    console.log('second')
    initialValue = [
      {
        type: 'paragraph',
        children: [{ text: '' }],
      },
    ]
  }
 else if(initialTextProseValue && !isActivateBionicText){
  console.log(isActivateBionicText,'false')
  console.log(initialTextProseValue, 'true')

  // console.log('damn why')
  // console.log(initialTextProseValue.value)
  initialValue = initialTextProseValue.value
  initialTitle = initialTextProseValue.title
  
 }
   
  
   }

 
   
    // let initialtextobj
    const [markx, setmarkx] = React.useState({xx:'xx'});
    const [value, setValue] = React.useState(initialValue);
    const [title, settitle] = React.useState(initialTitle);
    // const [currentTag, setcurrentTag] = React.useState();
    // const [ismarksBtnclicked, setismarksBtnclicked] = React.useState(false);

    const ontitleChange = (event) => {
      settitle(event.target.value)
    }



    React.useEffect(() => { 
      // console.log(value, 'damx')
      if(!isActivateBionicText){
        gettextproseValues(value, editor)//update content for Tag
        updateBookTextProse(value, title)//update content for Libary
        updateInitialTextProseValue(value, title)//update content for Bionic
      }

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
        // console.log('1st')
        
        // console.log(selectedBook.bookid)
      }

      setTimeout(() => {
        console.log('when')
        // setselectedBook() changed it 
        setselectedBook(null)
      }, 50);
      

      // if(textprosecontent){
      //   console.log('tease') 
      //   // console.log(textprosecontent, 'content')
       
      // }
    }, [isResettextareas]);

    //handle activating bionic start

    // React.useEffect(() => {
    //   console.log(isActivateBionicText, 'isactivebionic')
    //   if(isActivateBionicText){
    //     console.log(bionicTextValueAltered, 'feel hitler stamped on it')
    //     console.log(value, 'okay okay')

    //     // setTimeout(() => {
    //     //   // setValue(bionicTextValueAltered)
    //     // }, 50);
        
    //   }
    // }, [isActivateBionicText]);

    // React.useEffect(() => {
    //   if(isActivateBionicText){
    //     console.log(bionicTextValueAltered, 'feel')
    //     setValue(bionicTextValueAltered)
    //   }
    // }, [isResettextareas]);

    
    //handle activating bionic end


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

      //should handle MetaPopover when the Metaid of the text Leave is obtained
      React.useEffect(() => {
        
      }, []);


  
  // React.useEffect(() => {
    
  // }, []);

  // const updateisMarkBtnclicked = () => {
  //   setismarksBtnclicked(true)
  // }

    

    const Leaf = props => {
      const {isMetamodal, toggleMetamodal, CreateMetaID, CreateMetaObj, MetaArray, setMetaArray, updateMetaArray , currentMeta,  sortSelectedMeta, MetaID,updateTestNum, updateTextProseId, updatMetaId, createCurrentMetaObj, isSelectedMetalready} = React.useContext(Metacontext)

      //use tags array to decide colors base on taggs obj for styling
      const {tagsArray} = React.useContext(TagContext)

      // const [isPopOver, setisPopOver] = React.useState(false);

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
          fontWeight: content.bold ? '600' : 'normal',
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

        const contentStyleMeta = `${isMeta?'text-green-600  underline': 'bg-none'}`
        
       
        const [isPopover, setisPopover] = React.useState(false);

        const slateMetaId = props.leaf.metaid
        let PopoverContent 

        //function below gets PopoverContent
       const getMetaContentPopover = () => {
        let getPopover = MetaArray.find(item => item.id == content.metaid)
        console.log(getPopover)

        if(!getPopover){
          return {
            metaText: 'No metaContent assigned',
            metaTagType: content.tagtype,
            color: 'gray'
          }
        }else{
          return {
            //when adding audio and pics to meta, this will need to be revisited
            metaText: getPopover.content[0].children[0].text,
            metaTagType: content.tagtype,
            color: getcolor()
          }
        }   
       }

      //  console.log('coe')

       PopoverContent = getMetaContentPopover()

        //N in this isPopOver, asking whether isPopOver, should change it check out, change isPop back to n if any problems
        const toggleisPopover = (event, isPop, isMeta) => {
          // console.log(currentMetaPopoverContent)
          console.log(content, 'cow')
          if(isMeta){
            if(!isPop){
              PopoverContent = getMetaContentPopover()
              console.log(PopoverContent)
              setisPopover(true)
            }else{
              return
            }
          }
        }

        const closeIsPopover = (n, isMeta) => {
          if(isMeta){
            if(n){
              setisPopover(false)
            }else{
              return
            }
          }
        }
      
             return (
              <Popover isOpen={isPopover}
              reposition={true}

              onClickOutside={()=>setisPopover(false)}
              content={({ position, nudgedLeft, }) => ( // you can also provide a render function that injects some useful stuff!
              <div style={{width: 150,
                backGround: "rgba(255,255,255,0.5)",
                WebkitBackdropFilter: 'blur(10px)',
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.25)"
              }} className="border rounded" >
                <div>
                 {/* {propperSubText}  */}
                 <div
                 className='px-2' 
                 style={{
                  borderBottom: `solid 2px ${PopoverContent.color}`
                 }}
                 >
                    {PopoverContent.metaTagType}
                  </div>
                 <div className='px-2' >
                   {PopoverContent.metaText}
                 </div>
                  
                </div>
              </div>
            )}
              >
                     <span
              {...props.attributes}  className= {contentStyleMeta} onMouseLeave = {() => closeIsPopover(isPopover, isMeta)} onClick ={()=>closeIsPopover(isPopover, isMeta)}  onMouseEnter={(event)=>toggleisPopover(event, isPopover, isMeta)} onDoubleClick = {(event)=> openMetaModal( isMeta, toggleMetamodal ,sortSelectedMeta,updateTestNum, MetaArray, currentMeta,updateTextProseId, slateMetaId,createCurrentMetaObj,updateMetaArray, isSelectedMetalready, event)}
              style={contentStyle}
            >{props.children}</span>
              </Popover>
           
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
    // console.log(props, 'props')
    // console.log(buttonActiveStyle.bold)
    return (
      <div>
      <ToolbarMarkBtnx activestyle = {buttonActiveStyle? buttonActiveStyle.bold: false} icon = 'B' format ='bold'  />
      <ToolbarMarkBtnx activestyle = {buttonActiveStyle? buttonActiveStyle.italics:false} icon = 'I' format = 'italics' />
      <ToolbarMarkBtnx activestyle = {buttonActiveStyle? buttonActiveStyle.qoutes: false} icon = 'Q' format = 'qoutes' />
      <ToolbarMarkBtnx activestyle = {buttonActiveStyle? buttonActiveStyle.header1: false} icon = 'H1' format = 'header1' />
      <ToolbarMarkBtnx activestyle = {buttonActiveStyle? buttonActiveStyle.header3: false} icon = 'H2' format = 'header2' /> 
      {/* <ToolbarMarkBtnx activestyle = {buttonActiveStyle.header3} icon = 'M' format = 'meta' formatid = {MetaID} updatMetaId = {updatMetaId}  />  */}
      <ToolbarMarkBtnx activestyle = {buttonActiveStyle? buttonActiveStyle.header3: false} icon = 'T' format = 'tag' currentTagObj={currentTagObj}   formatid = {MetaID} updatMetaId = {updatMetaId} /> 
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

          onMouseEnter={() => {
            setTimeout(() => {
              console.log(Editor.marks(editor))
              // console.log(Editor)
              setmarkx(Editor.marks(editor))

              // const Metaid = editor.selection.metaid
              
              // displayMetaContentPopup(Metaid)
              // console.log(editor.selection)
              // console.log(value)
              // gettextproseEditor(editor)
            }, 20);
          }}

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
            color:'GrayText'
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