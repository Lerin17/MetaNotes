import React from 'react'

const LibaryContext = React.createContext()

const LibaryContextProvider = (props) => {

    const [LibaryArray, setLibaryArray] = React.useState([]);

    const [currentBookTitle, setcurrentBookTitle] = React.useState('');
    const [currentBookTextProse, setcurrentBookTextProse] = React.useState({});
    const [currentBookMetaArray, setcurrentBookMetaArray] = React.useState([]);

    const randomnumid = () => Math.floor(Math.random() * 100000000000)
    const [bookID, setbookID] = React.useState(randomnumid());

    const [currentBook, setcurrentBook] = React.useState();
    const [selectedBook, setselectedBook] = React.useState();
    // const [history, sethistory] = React.useState();



    //START additional for ui config and reset of textprose
    const [isLibarymodal, setisLibarymodal] = React.useState(false);
    const [isResettextareas, setisResettextareas] = React.useState(false);
    //additional for ui config and reset of textprose end

    //is book already present on reset
    //   const isbookalready = Libaryarrayids.some(item => item == currentBook.bookid)


    React.useEffect(() => {
     

        console.log(Boolean(currentBook), 'check')
    
        //check if libaryarray is empty and currentbook is valid, then set,***else if add it to the list
        if(LibaryArray.length == 0 && currentBook){
          setLibaryArray([currentBook])
        }else if(currentBook){
        const Libaryarrayids = LibaryArray.map(item => item.bookid ) 
        console.log(currentBook)
        console.log(Libaryarrayids)

        console.log(LibaryArray.some(item => Libaryarrayids.includes(item.bookid)), 'does it include')

        console.log(Libaryarrayids.includes(bookID))
        console.log(bookID, 'bookid')


        if(Libaryarrayids.some(item => item == bookID)){
            // console.log('cothela')
            setLibaryArray(prev => prev.map(item => item.bookid == bookID?{...item,
                bookTitle:currentBookTitle,
                bookTextprosecontent:currentBookTextProse,
                 bookMetaarray:currentBookMetaArray}:item))
        }else{
            setLibaryArray(prev => [...prev, currentBook])
        }
      

        // console.log('whats reals')
 
        }       
    }, [currentBook]);



    
    // console.log(LibaryArray, 'libary')

    //handle ui and reset start
   
    const toggleLibaryModal = () => {
        setisLibarymodal(prev => !prev)
    }

    const toggleResetTextareas = () => {
        setisResettextareas(prev => !prev)
    }

    const Createnewtextareas = () => {
        // console.log('create')
    }
    //handle and ui end


    //handle mounting an already existing book start
    const openBook = (id) => {
        console.log(id)
        const book = LibaryArray.find(item => item.bookid == id)
        
        setselectedBook(book)
        console.log(book)

        // setTimeout(() => {
        //     setcurrentBook(book)
        //     setbookID(book.bookid)    
        //     console.log(LibaryArray)
        // }, 50);

        // setTimeout(() => {
            
        // }, 100);
        setTimeout(() => {
         toggleResetTextareas() 
        }, 100);

        
        // console.log(book, 'open book')
    }

    // React.useEffect(() => {
    //     setselectedBook()
    // }, [currentBook]);

    console.log(LibaryArray)
        //handle mounting an already existing book end


    

    // console.log(randomnumid(), 'randomid')




    //handle updates of book components start

    const updateBookTextProse = (value, title) => {
        setcurrentBookTextProse(value)
        setcurrentBookTitle(title)
    }

    const updateBookMetaArray = (value) => {
        setcurrentBookMetaArray(value)
    }

    const updateBookID = () => {
        setbookID(randomnumid() )
    }

    React.useEffect(() => {
     console.log(selectedBook, 'selcted book')
      updateBookID()

      if(selectedBook && currentBook){
        console.log('2nd')
        setbookID(selectedBook.bookid)
      }
    }, [isResettextareas]);

    //handle updates of book  components end
    

//create book entry updates the current book, which in turn with the use of a useEffect updates the libaryarray 

   const Createbookentry = () => {
        console.log(bookID)

       setcurrentBook({
        bookid: bookID,
        bookTitle:currentBookTitle,
        bookTextprosecontent: currentBookTextProse ,
        bookMetaarray : currentBookMetaArray      
       })
   }

//    console.log(currentBook)


    
    
    return (
        <LibaryContext.Provider value={{LibaryArray,updateBookTextProse, updateBookMetaArray, Createbookentry, isLibarymodal,  toggleLibaryModal, toggleResetTextareas, isResettextareas, openBook, currentBook, bookID, selectedBook, setselectedBook,  setbookID, currentBookMetaArray}} >
             {props.children}
        </LibaryContext.Provider>    
    )
}

export {LibaryContextProvider, LibaryContext}