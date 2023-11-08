import React from 'react'
import { Slate } from 'slate-react'
import { LibaryContext } from '../../context/LibaryContext';
import { bionicContext } from '../../context/bionicContext';



export  function SlateEditorComponent({editor, Editor, value,handleChangeSlate,ontitleChange, title, markx,setmarkx, renderElement,renderLeaf, MetaID, updatMetaId, currentTagObj, HOTKEYS, Toolbar, Editable,isHotkey,toggleMark }) {

const {updateBookTextProse,  currentBook, bookID, LibaryArray, selectedBook, setselectedBook, isResettextareas,  setbookID, currentBookMetaArray} =  React.useContext(LibaryContext)

const {updateInitialTextProseValue, bionicTextValueAltered, isActivateBionicText, initialTextProseValue} = React.useContext(bionicContext)

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
        initialTitle = selectedBook.bookTitle
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
//No values have been entered and you activate bionnic text
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

  //when you swith bionic text off it restores the normal text
  console.log(isActivateBionicText,'false')
  console.log(initialTextProseValue, 'true')

  // console.log('damn why')
  // console.log(initialTextProseValue.value)
  initialValue = initialTextProseValue.value
  initialTitle = initialTextProseValue.title
  
 }
   
  
   }
    
    const [valuex, setvaluex] = React.useState(initialValue);

    React.useEffect(() => {
        if(selectedBook && currentBook){
            setvaluex(selectedBook.bookTextprosecontent)
        }
      
    }, [isResettextareas]);

    const handleChangeSlatex = (value) => {
        setvaluex(value)
    }

    if('exex'){
        return (
            <Slate editor={editor} value={valuex}  
            onChange={value => {handleChangeSlatex(value)
            }
            } >
        
            
                  <div 
                    style={{
                    gridTemplateRows: 'auto 1fr'
                    }} className='App w-full h-full  grid grid-flow-row overflow-hidden' >
                  <div className="w-full rounded  font-bold overflow-hidden px-2"> 
                      <div className=' text-left flex justify-between py-1' >
                          <input className='border-none bg-transparent outline-none font-header5 font-bold text-slate-800'
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
              onKeyDown={(event) => {
        
                // if(receivedOperations.state == ''){
                //   setreceivedOperations({state:'send', operations: null})
                // }
             
        
                for (const hotkey in HOTKEYS) {
        
                  // console.log(editor.operations, 'operationsKey')
        
                  if(isHotkey(hotkey, event)){
                    console.log(event, 'hotKeys')
                    event.preventDefault()
                    const format = HOTKEYS[hotkey]
                    console.log(format)
                    if(format == 'tag'){
                      toggleMark(editor, format, MetaID, updatMetaId, currentTagObj)
                    }else{
                      toggleMark(editor, format)
                    }
                   
                  }
                  // console.log(`obj.${prop} = ${obj[prop]}`);
                }
              }}
        
              onMouseEnter={() => {
                setTimeout(() => {
                  console.log(Editor.marks(editor))
                  setmarkx(Editor.marks(editor))
                }, 20);
              }}
        
              onClick={()=>{
                setTimeout(() => {
                  console.log(Editor.marks(editor))
                  setmarkx(Editor.marks(editor))
                  console.log(editor.selection)
                  console.log(value)
                }, 20);
              }}
        
              style={{
                padding: '10px',
                borderTop: '2px solid #94A3B8',
                textAlign: 'start',
                color:'GrayText',
              }}
                />
                </div>
                </div>
              </div>
              </Slate>  
          )
    }else{
        return (
            <div>
                exe
            </div>
            // <Slate editor={editor} value={value}  
            // onChange={value => {handleChangeSlate(value)
            // }
            // } >
        
            
            //       <div 
            //         style={{
            //         gridTemplateRows: 'auto 1fr'
            //         }} className='App w-full h-full  grid grid-flow-row overflow-hidden' >
            //       <div className="w-full rounded  font-bold overflow-hidden px-2"> 
            //           <div className=' text-left flex justify-between py-1' >
            //               <input className='border-none bg-transparent outline-none font-header5 font-bold text-slate-800'
            //               onChange={ontitleChange}
            //               value={title}
            //               placeholder={'Enter title'}
            //               />
        
            //               <div className='text-gray-300 mr-16 font-header5' >
            //                 Last saved
            //                 </div>
            //           </div>
            //           <div className=' border-2 border-slate-400' >
            //             <Toolbar
            //             mark = {markx}
            //             />
            //           </div>
                   
            //          </div>
            //   <div style={{
            //         gridTemplateRows: '1fr 0.1fr'
            //         }} className=" main-content grid grid-flow-col overflow-hidden  ">
            //     <div className="overflow-auto p-4 relative lg:h-full md:h-full  ">
            //       {/* <div className="w-full mb-12"></div> */}
              
            //     < Editable  
            //   renderElement={renderElement}
            //   renderLeaf={renderLeaf}
            //   autoFocus
            //   onKeyDown={(event) => {
        
            //     if(receivedOperations.state == ''){
            //       setreceivedOperations({state:'send', operations: null})
            //     }
             
        
            //     for (const hotkey in HOTKEYS) {
        
            //       // console.log(editor.operations, 'operationsKey')
        
            //       if(isHotkey(hotkey, event)){
            //         console.log(event, 'hotKeys')
            //         event.preventDefault()
            //         const format = HOTKEYS[hotkey]
            //         console.log(format)
            //         if(format == 'tag'){
            //           toggleMark(editor, format, MetaID, updatMetaId, currentTagObj)
            //         }else{
            //           toggleMark(editor, format)
            //         }
                   
            //       }
            //       // console.log(`obj.${prop} = ${obj[prop]}`);
            //     }
            //   }}
        
            //   onMouseEnter={() => {
            //     setTimeout(() => {
            //       console.log(Editor.marks(editor))
            //       setmarkx(Editor.marks(editor))
            //     }, 20);
            //   }}
        
            //   onClick={()=>{
            //     setTimeout(() => {
            //       console.log(Editor.marks(editor))
            //       setmarkx(Editor.marks(editor))
            //       console.log(editor.selection)
            //       console.log(value)
            //     }, 20);
            //   }}
        
            //   style={{
            //     padding: '10px',
            //     borderTop: '2px solid #94A3B8',
            //     textAlign: 'start',
            //     color:'GrayText',
            //   }}
            //     />
            //     </div>
            //     </div>
            //   </div>
            //   </Slate>  
          )
    }


}
