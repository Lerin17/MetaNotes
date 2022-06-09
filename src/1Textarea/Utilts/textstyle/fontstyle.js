import React from "react"

// Define a React component to render leaves with bold text.




const Leaf = props => {
  // const [firstx, setfirstx] = React.useState(true);

  // const incomingText= props.children.props.leaf.text.length

  

  
console.log(props.children.props)

const content = props.children.props.leaf


const contentStyle = {
  fontWeight: content.bold ? 'bold' : 'normal',
  fontStyle: content.italics? 'italic': 'normal'
}

  
    
     return (
      <span onClick={()=>console.log(content.italics)}
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



export  {Leaf, DefaultElement}