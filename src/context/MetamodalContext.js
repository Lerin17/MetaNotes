
import React from "react";

//this file will handle the styling of the prose componet when the theme or MetaState is changed

const Stylecontext = React.createContext()

function StylecontextProvider(props) {

 const [isMetamodal, setisMetamodal] = React.useState(false);
  
  const toggleMetamodal = () => {
    setisMetamodal(prev => !prev)
  }

return (
    <Stylecontext.Provider value = {{isMetamodal, toggleMetamodal}} >
        {props.children}
    </Stylecontext.Provider>
)
}


export {StylecontextProvider, Stylecontext}