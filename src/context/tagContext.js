import React from "react";

const TagContext = React.createContext()


const TagContextProvider = (props) => {
    const defaulttags = [
        {name: 'important',
        color:'red'},
        {name: 'revisit',
        color: 'blue'},
        {name:'disregard',
        color:'yellow'}
    ]

    const [userCreatedTagsArray, setuserCreatedTagsArray] = React.useState([]);

    const [tagsArray, settagsArray] = React.useState(defaulttags);
    const [currentTag, setcurrentTag] = React.useState('important');
    // const test =[]

   
    const [taggedObjArray, settaggedObjArray] = React.useState();


    const [textproseValue, settextproseValue] = React.useState();
    const [textproseEditor, settextproseEditor] = React.useState();
    const [textproseLocationObj, settextproseLocationObj] = React.useState();

    const [currentLocationPath, setcurrentLocationPath] = React.useState();

    const gettextproseValues = (value, editor) => {
        settextproseValue(value)
        settextproseEditor(editor)    
    }

    React.useEffect(() => {
        settaggedObjArray(()=>gettaggedObjArray()) 
        // console.log(gettaggedObjArray())
        // console.log(taggedObjArray)
    }, [textproseValue]);

    // React.useEffect(() => {
    //     console.log(holdtaggedObjArray)
    //     // settaggedObjArray(holdtaggedObjArray)
    // }, [ holdtaggedObjArray]);


    const gettaggedObjArray = () => {
        if(textproseValue){
        let textcontentArray = textproseValue[0].children
        //  console.log(textproseValue[0].children)

        let x = textcontentArray.filter(item => item.tag &&item.tagtype)
        
        x = x.map(item => ({
            item,
            index: textcontentArray.indexOf(item) 
        }))

        
        if(!x.length){
            return null
        }else{
            return x 
        } 
        }
    }

    const findCurrentTagObj = () => {
        const getcurrentObj = defaulttags.find(item => item.name == currentTag)
        return getcurrentObj
     }




    const [currentTagObj, setcurrentTagObj] = React.useState(()=>findCurrentTagObj());

    React.useEffect(() => {
        setcurrentTagObj(()=>findCurrentTagObj())
    }, [currentTag]);



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

    const locateTaggedItem = () => {

    }

    const changeCurrentLocation = (Locationpath) => {
        setcurrentLocationPath(Locationpath)
        console.log(Locationpath)
    }

    console.log(textproseLocationObj)
    // console.log(currentLocationPath)


    // console.log(currentTagObj)




    return (
        <TagContext.Provider value={{currentTag, isTagMenu, currentTagObj, toggleisTagMenu, tagsArray, changeCurrentTag, gettextproseValues, taggedObjArray, toggleisTagLibaryDisplay, isTagLibaryDisplay, settextproseLocationObj, changeCurrentLocation, currentLocationPath}}>
            {props.children}
        </TagContext.Provider>
    )
}

export {TagContext, TagContextProvider}