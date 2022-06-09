import React from "react"

// Define a React component to render leaves with bold text.




const Leaf = props => {
  const [firstx, setfirstx] = React.useState(true);

  const incomingText= props.children.props.leaf.text.length

  // React.useEffect(() => {
  //     if(incomingText > 0){
  //   setfirstx(false)
  //     }
  //   console.log('rrr')
  // }, []);
  

  
console.log(props.children.props.leaf.text.length)

  return (
    <span
      {...props.attributes}
      style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' , color: 'blue' }}
    >
      {props.children}
    </span>
  )
}

const DefaultElement = props => {
  return <p {...props.attributes} >{props.children}</p>
}



export  {Leaf, DefaultElement}