import { ClassNames } from '@emotion/react'
import React, {Component, useCallback} from 'react'
// Import React dependencies.


// Import the Slate editor factory.
import { createEditor, Editor, Path, Text, Transforms } from 'slate'

// Import the Slate components and React plugin.
import { Slate, Editable, withReact, } from 'slate-react'
import { Leaf } from '../Utilts/textstyle/fontstyle'
import {Firstletter, CodeElement, DefaultElement } from '../Utilts/Uniquestyle/firstletter'






// Add the initial value.
const initialValue = [
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ]
  
  const Textproseslate = () => {
    const [editor] = React.useState(() => withReact(createEditor()))
    const [first, setfirst] = React.useState(false);


    
    // editor.apply({
    //   type: 'insert_text',
    //   path: [0, 0],
    //   offset: 15,
    //   text: 'A new string of text to be inserted.',
    // })

    // React.useEffect(() => {
    //   console.log(editor.children[0])
    //   if(editor.children[0]){
    //    console.log(Transforms.select(editor, [0,0]))
    //   }
    // }, [editor.children]);


    const renderElement = props => {
      switch (props.element.type) {
        case 'code':
          return <CodeElement {...props} />
        default:
          return <DefaultElement {...props} />
      }
    }

 

    const [xbold, setxbold] = React.useState(false);


    const renderLeaf = useCallback(props => {
      return <Leaf {...props} />
    }, [])

    console.log(editor)

    return (
        <div className='bg-red-200' >
     <Slate editor={editor} value={initialValue}>

  

      <button
      onMouseDown={e => {
        console.log('click')
        e.preventDefault()
        Transforms.setNodes(
          editor,
          { bold: xbold },
          { match: n => Text.isText(n), split: true },
        )
        setxbold(prev => !prev)

      }}
      >
        boldx
      </button>

        < Editable  
      renderElement={renderElement}
      renderLeaf={renderLeaf}
  
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