import React from "react";
import _ from "lodash"

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

   //contains tagged objects filtered through textprose value
    const [taggedObjArray, settaggedObjArray] = React.useState();


    const [textproseValue, settextproseValue] = React.useState();
    const [textproseEditor, settextproseEditor] = React.useState();

    //tracks location in textprose as it changes for additional functionality of tracking back location after changes
    const [textproseLocationObj, settextproseLocationObj] = React.useState();

    //contains path required for switching location for tagged items in textprose text area
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

        console.log(revisedContent)
        console.log(getTaggedObj)
        console.log(tax)
        console.log(textproseValue)

        let A = tax.map(item => item.taggedArray)
        console.log(A)
        A = A.map(item => item)
        A = _.flatten(A)

        A = A.map(item => ({
            text: item.item.ChildrenitemObj.text,
            tagType: item.item.ChildrenitemObj.tagtype,
            index: item.index,
            location: item.item.location,
            path: [item.index, item.item.location]
        }))

        console.log(A)
        //  console.log(textproseValue[0].children)

        let x = textcontentArray.filter(item => item.tag &&item.tagtype)
        
        x = x.map(item => ({
            item,
            index: textcontentArray.indexOf(item) 
        }))

        
        if(!A.length){
            return null
        }else{
            return A 
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
        // console.log(Locationpath)
    }

    // console.log(textproseLocationObj)
    // console.log(textproseValue)


    // console.log(currentTagObj)




    return (
        <TagContext.Provider value={{currentTag, isTagMenu, currentTagObj, toggleisTagMenu, tagsArray, changeCurrentTag, gettextproseValues, taggedObjArray, toggleisTagLibaryDisplay, isTagLibaryDisplay, settextproseLocationObj, changeCurrentLocation, currentLocationPath, setcurrentLocationPath}}>
            {props.children}
        </TagContext.Provider>
    )
}

export {TagContext, TagContextProvider}