import { ClassNames } from '@emotion/react'
import React, {Component} from 'react'
// Import React dependencies.

// Import the Slate editor factory.
import { createEditor } from 'slate'

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react'


// // Add the initial value.
// const initialValue = [
//     {
//       type: 'paragraph',
//       children: [{ text: 'A line of text in a paragraph.' }],
//     },
//   ]
  
//   const Textproseslate = () => {
//     const [editor] = React.useState(() => withReact(createEditor()))
  
//     return (
//         <div className='bg-red-200' >
//      <Slate editor={editor} value={initialValue}>
//         < Editable />
//       </Slate>
//         </div>
     
//     )
//   }


// export default Textproseslate