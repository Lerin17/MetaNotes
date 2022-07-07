import React from 'react'

const LibaryContext = React.createContext()

const LibaryContextProvider = (props) => {

    const [LibaryArray, setLibaryArray] = React.useState([]);
    const [currentBookTextProse, setcurrentBookTextProse] = React.useState({});
    const [currentBookMetaArray, setcurrentBookMetaArray] = React.useState([]);
    const [currentBook, setcurrentBook] = React.useState();

    const [bookID, setbookID] = React.useState(1);

    React.useEffect(() => {
        setbookID(prev => prev + 1 )
    }, []);
    
    const updateLibaryArray= () => {
        setLibaryArray()
    }

    const updateBookTextProse = (value) => {
        setcurrentBookTextProse(
            {
                content: value,
            }
        )
    }

    const updateBookMetaArray = (value) => {
        setcurrentBookMetaArray(value)
    }

   const Createbookentry = (value) => {
       setcurrentBook({
        bookid: 2,
        bookTextprosecontent: currentBookTextProse ,
        bookMetaarray : currentBookMetaArray      
       })
   }

    

    
    
    return (
        <LibaryContext.Provider value={{updateBookTextProse, updateBookMetaArray}} >
             {props.children}
        </LibaryContext.Provider>    
    )
}

export {LibaryContextProvider, LibaryContext}