import React from "react";
import _ from "lodash"
import { LibaryContext } from "./LibaryContext";
import { UserContext } from "./userContext";


const TagContext = React.createContext()



const TagContextProvider = (props) => {
    const {setcurrentBookCreatedTagArray, currentBookCreatedTagArray, selectedBook, currentBook, isResettextareas, LibaryArray, bookID} = React.useContext(LibaryContext)

    const {notification, setnotification} = React.useContext(UserContext)


    const tagsColorPool = [{
        textPaletteColor: 'white',
       color: 'purple'}, 
    { textPaletteColor: 'peru',
    color: 'black'}, 
    {textPaletteColor: 'white',
    color: 'green'},
    {textPaletteColor: 'white',
    color: 'maroon'},
    {textPaletteColor: 'navy',
    color: 'violet'},
    {textPaletteColor: 'black',
    color: 'moccasin'},
    {textPaletteColor: 'white',
    color: 'teal'},
    {textPaletteColor: 'royalblue',
    color: 'lightsteelblue'}
]

    const [userCreatedTagsArray, setuserCreatedTagsArray] = React.useState([]);
    
    const [newCreatedTagObj, setnewCreatedTagObj] = React.useState({
        name: null,
        color: null
    });

    const [newTagError, setnewTagError] = React.useState({
        message: null,
        notificationType: null
    });

    const defaulttags = [
        {name: 'important',
        color:'red'},
        {name: 'revisit',
        color: 'blue'},
        {name:'disregard',
        color:'yellow'}
    ]

    const [tagsArray, settagsArray] = React.useState([...defaulttags]);
    const [currentTag, setcurrentTag] = React.useState('important');
    // const test =[]

   //contains tagged objects filtered through textprose value
    const [taggedObjArray, settaggedObjArray] = React.useState();


    const [textproseValue, settextproseValue] = React.useState();
    const [textproseEditor, settextproseEditor] = React.useState();

    //tracks location in textprose as it changes for additional functionality of tracking back location after changes could be scrapped for an easy end and start placement
    const [textproseLocationObj, settextproseLocationObj] = React.useState();

    //contains path required for switching location for tagged items in textprose text area
    const [currentLocationPath, setcurrentLocationPath] = React.useState();



    const gettextproseValues = (value, editor) => {
        settextproseValue(value)
        settextproseEditor(editor)    
    }

    
    //handle updating of libary and loading up of user tags for each file
    React.useEffect(() => {
        // console.log(bookID, 'bookid')
        // console.log(LibaryArray, 'libaryarray')
        console.log(selectedBook, 'selectedBook')
        console.log(bookID, 'bookid')
        // LibaryArray, bookID

        if(selectedBook){
            // setcurrentBookCreatedTagArray(selectedBook.bookUserTags)
                console.log(selectedBook.bookUserTags, 'selected booktags')
                console.log(defaulttags, 'default')

                settagsArray([...defaulttags, ...selectedBook.bookUserTags]) 
                setuserCreatedTagsArray(selectedBook.bookUserTags)
        }else{
            const availableBookIDs = LibaryArray.map(item => item.bookid)
            console.log(bookID)
            console.log(availableBookIDs)
            console.log(LibaryArray)
            console.log(!availableBookIDs.some(item =>item == bookID))
            const isIdAvailable = availableBookIDs.some(item =>item == bookID)

            settagsArray([...defaulttags]) 
            setuserCreatedTagsArray([])
            
            // setcurrentBookCreatedTagArray([])
            // if(!isIdAvailable){
            //     console.log('reset')
            //     settagsArray([...defaulttags]) 
            // }
           
        
        }
    }, [ isResettextareas]);

    console.log(tagsArray, 'tagsArray')

    React.useEffect(() => {
        setcurrentBookCreatedTagArray(userCreatedTagsArray) 
    }, [tagsArray]);


    React.useEffect(() => {
        settaggedObjArray(()=>gettaggedObjArray()) 
        // console.log(gettaggedObjArray())
        // console.log(taggedObjArray)
    }, [textproseValue]);


    // React.useEffect(() => {
    //     if(selectedBook){
    //         console.log(selectedBook, 'selectedBook')
    //         // setcurrentBookCreatedTagArray(selectedBook.bookUserTags)
    //         settagsArray([...selectedBook.bookUserTags, ...defaulttags])
    //     }
        
    // }, [selectedBook]);

    React.useEffect(() => {
        if(newCreatedTagObj.color && newCreatedTagObj.name){
            // const colorPresent = 
            setuserCreatedTagsArray(prev => [...prev, newCreatedTagObj])
            setnewCreatedTagObj({
                name: null,
                color: null
            })  
        }  
    }, [newCreatedTagObj]);

    React.useEffect(() => {
        console.log('look down')
        settagsArray(prev => [...defaulttags, ...userCreatedTagsArray])
    }, [userCreatedTagsArray]);

    // console.log('user',userCreatedTagsArray)
    // console.log('usxr',newCreatedTagObj)

    // React.useEffect(() => {
    //     console.log(holdtaggedObjArray)
    //     // settaggedObjArray(holdtaggedObjArray)
    // }, [ holdtaggedObjArray]);


    const gettaggedObjArray = () => {
        if(textproseValue){
        let textcontentArray = textproseValue[0].children
        
        let n = 0
        let revised = textproseValue.map(item => {return (
            {
             children:item.children,
             index: n++
            }
        ) })

        let revisedContent = revised.map((item,i) => {


            
            const Children = item.children.map((item,i) => 
                {return (
                    {
                        ChildrenitemObj: item,
                        // location: item.children? item.children.indexOf(item): null,
                        location: i
                    }
                )
                  })

            // const taggedChildrenRevised = taggedChildren.map(item => {
            //     return{
            //         taggedItem: item,
            //         location: textproseValue[].indexOf("Apple")
            //     }
            // })

            return (
                {
                Children,
                index: i
                
                }
            )
        })


     

        revisedContent = revisedContent.filter(item => item.Children.some(item => item.ChildrenitemObj.tag))

        const getTaggedObj = revisedContent.map(item => {
            return (
                {
                    taggedObj: item.Children.filter(item => item.ChildrenitemObj.tag),
                    index: item.index
                }
            )
        })

        const tax = getTaggedObj.map(item => {
            const index = item.index
            return {
                taggedArray: item.taggedObj.map(item => {
                    return {
                        item: item,
                        index

                    }
                })
            }
        })

        // console.log(revisedContent)
        // console.log(getTaggedObj)
        // console.log(tax)
        // console.log(textproseValue)

        let A = tax.map(item => item.taggedArray)
        // console.log(A)
        A = A.map(item => item)
        A = _.flatten(A)

        A = A.map(item => ({
            text: item.item.ChildrenitemObj.text,
            tagType: item.item.ChildrenitemObj.tagtype,
            index: item.index,
            location: item.item.location,
            path: [item.index, item.item.location]
        }))

        // console.log(A)
        //  console.log(textproseValue[0].children)

        // let x = textcontentArray.filter(item => item.tag &&item.tagtype)
        
        // x = x.map(item => ({
        //     item,
        //     index: textcontentArray.indexOf(item) 
        // }))

        
        if(!A.length){
            return null
        }else{
            return A 
        } 
        }
    }

    const findCurrentTagObj = () => {
        const getcurrentObj = tagsArray.find(item => item.name == currentTag)
        return getcurrentObj
     }




    const [currentTagObj, setcurrentTagObj] = React.useState(()=>findCurrentTagObj());

    React.useEffect(() => {
        setcurrentTagObj(()=>findCurrentTagObj())
    }, [currentTag]);


    // console.log(tagsArray, 'damn')
    // console.log(newCreatedTagObj, 'damn')
 // Transforms.select(editor, {path: [0, 0], offset: 3});


    const [isTagMenu, setisTagMenu] = React.useState(false);
    const [isTagLibaryDisplay, setisTagLibaryDisplay] = React.useState(false);

    const toggleisTagLibaryDisplay = () => {
        toggleisTagMenu()
        setisTagLibaryDisplay(prev => !prev)
    }

    const toggleisTagMenu = () => {
        setisTagMenu(prev => !prev)
    }

    const changeCurrentTag = (tag) => {
       
        setcurrentTag(tag)
    }

    // const locateTaggedItem = () => {

    // }

    const changeCurrentLocation = (Locationpath) => {
        setcurrentLocationPath(Locationpath)
        // console.log(Locationpath)
    }

    // console.log(newTagError)

    const handleNewTaginput = (nameInput, colorInput) => {
     const unavailableColors =   userCreatedTagsArray.map(item => item.color)

     const unavailableNames =   [...defaulttags.map(item => item.name) ,...userCreatedTagsArray.map(item => item.name)]
    
    //  console.log(unavailableNames)

     if(!nameInput){
        setnotification({message: `Please input a value for name tag`,
        notificationtype: 'error',
        instance:'TAGS'})
        return
     }

     if(!colorInput){
        setnotification({message: `Please input a value for color tag`,
        type: 'error',
        instance:'TAGS'})
        return
     }
     
    //  console.log(unavailableColors, 'everything')
     if(unavailableColors.includes(colorInput)){
        setnotification({message: `"${colorInput}" is not available, please select a new tag color`,
            type: 'error',
            instance:'TAGS'})
            // console.log('damn')
     } 
     
     if(unavailableNames.includes(nameInput)){
        setnotification({message: `"${nameInput}" is not available, please select a new tag name`,
        type: 'error',
        instance:'TAGS'})
     }
     else{
        setnewCreatedTagObj({
            name: nameInput,
            color: colorInput
        })
     }
      
    }
    // console.log(textproseLocationObj)
    // console.log(textproseValue)


    // console.log(currentTagObj)




    return (
        <TagContext.Provider value={{currentTag, isTagMenu, currentTagObj, toggleisTagMenu, tagsArray, changeCurrentTag, gettextproseValues, taggedObjArray, toggleisTagLibaryDisplay, isTagLibaryDisplay, settextproseLocationObj, changeCurrentLocation, currentLocationPath, setcurrentLocationPath, tagsColorPool, handleNewTaginput, userCreatedTagsArray, setnewTagError, newTagError}}>
            {props.children}
        </TagContext.Provider>
    )
}

export {TagContext, TagContextProvider}