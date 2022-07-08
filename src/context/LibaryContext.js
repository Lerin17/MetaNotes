import React from 'react'

const LibaryContext = React.createContext()

const LibaryContextProvider = (props) => {

    const [LibaryArray, setLibaryArray] = React.useState([]);
    const [currentBookTextProse, setcurrentBookTextProse] = React.useState({});
    const [currentBookMetaArray, setcurrentBookMetaArray] = React.useState([]);
    const [currentBook, setcurrentBook] = React.useState();

    const [bookID, setbookID] = React.useState(2);

    const [isLibarymodal, setisLibarymodal] = React.useState(false);

    React.useEffect(() => {
        setbookID(prev => prev + 1 )
    }, []);

    React.useEffect(() => {
     

        console.log(Boolean(currentBook), 'check')
    
        //check if libaryarray is empty and currentbook is valid, then set,***else if add it to the list
        if(LibaryArray.length == 0 && currentBook){
          setLibaryArray([currentBook])
        }else if(currentBook){
        const Libaryarrayids = LibaryArray.map(item => item.bookid ) 
        console.log(currentBook)
        console.log(Libaryarrayids)

        setLibaryArray(prev => prev.map(item => Libaryarrayids.includes(item.bookid)?{...item,
            bookTextprosecontent:currentBookTextProse,
             bookMetaarray:currentBookMetaArray}:item))

        // setLibaryArray(prev => [...prev, currentBook])
        }       
    }, [currentBook]);



    
    console.log(LibaryArray, 'libary')
   
    const toggleLibaryModal = () => {
        setisLibarymodal(prev => !prev)
    }

    const updateBookTextProse = (value) => {
        // console.log(value, 'val')
        setcurrentBookTextProse(value)
    }

    const updateBookMetaArray = (value) => {
        setcurrentBookMetaArray(value)
        // console.log(currentBookMetaArray, 'metaarray')
    }
    
    // const updateLibaryArray = () => {
    //     if(LibaryArray.length == 0){
    //     setLibaryArray([currentBook])
    //     }
       
    // }


   const Createbookentry = () => {
       setcurrentBook({
        bookid: 2,
        bookTextprosecontent: currentBookTextProse ,
        bookMetaarray : currentBookMetaArray      
       })
   }

   console.log(currentBook)


    
    
    return (
        <LibaryContext.Provider value={{updateBookTextProse, updateBookMetaArray, Createbookentry, isLibarymodal,  toggleLibaryModal}} >
             {props.children}
        </LibaryContext.Provider>    
    )
}

export {LibaryContextProvider, LibaryContext}