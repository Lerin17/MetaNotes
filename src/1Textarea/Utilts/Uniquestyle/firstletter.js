import React from "react"

const Firstletter = props => {
    return <p  style={{ fontSize: '16px' }} {...props.attributes} >{props.children}</p>
  }

  const CodeElement = props => {
    return (
      <pre {...props.attributes}>
        <code>{props.children}</code>
      </pre>
    )
  }
  
  const DefaultElement = props => {
    return <p {...props.attributes}>{props.children}</p>
  }

  export  {CodeElement, Firstletter, DefaultElement}