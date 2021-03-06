import React from "react"

// Define a React component to render leaves with bold text.




const Leaf = props => {

const content = props.children.props.leaf


  const contentStyle = {
    fontWeight: content.bold ? 'bold' : 'normal',
    fontStyle: content.italics? 'italic': 'normal',
  }

    
     return (
      <span onMouseEnter={()=>getstyle(content)}
      {...props.attributes} onClick = {console.log('eeee')}
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

const STY = getstyle()




export  {Leaf, DefaultElement, STY}