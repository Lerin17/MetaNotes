import React from 'react'

const LibaryContext = React.createContext()

const LibaryContextProvider = (props) => {

    const [LibaryArray, setLibaryArray] = React.useState([]);
    const [currentTextProse, setcurrentTextProse] = React.useState();
    
    const updateLibaryArray= () => {
        setLibaryArray()
    }
    
    return (
        <LibaryContext.Provider>
             {props.children}
        </LibaryContext.Provider>    
    )
}

export {LibaryContextProvider, LibaryContext}