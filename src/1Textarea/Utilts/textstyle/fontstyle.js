import React from "react"

// Define a React component to render leaves with bold text.




const Leaf = props => {


  
// console.log(props.children.props)

const content = props.children.props.leaf


const contentStyle = {
  fontWeight: content.bold ? 'bold' : 'normal',
  fontStyle: content.italics? 'italic': 'normal',
}

// const styleobjects = () => {
//  styleobj = {
//    isItalics : content.italics
//  }
//  console.log(styleobj)
// }



    
     return (
      <span onMouseEnter={()=>getstyle(content)}
      {...props.attributes}
      style={contentStyle}
    >
      {props.children}
    </span>
     )
        
}

const DefaultElement = props => {
  return <p {...props.attributes} >{props.children}</p>
}

const getstyle  = (props) => {

let styleobj 
// console.log('eeee')
if(props){
  console.log(props)
}

if(props){
  styleobj = {
    isItalics: props.italics,
    isBold: props.bold
  }
}



 return (
  styleobj
 ) 

}




export  {Leaf, DefaultElement, getstyle}