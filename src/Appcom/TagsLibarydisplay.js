// import { Button } from "@material-ui/core";
import React from "react";
import { TagContext } from "../context/tagContext";
import { Box, Button, Fade, Popper } from "@mui/material";



import { Popover } from 'react-tiny-popover'


function TagsLibary(params) {
    const {taggedObjArray, toggleisTagLibaryDisplay, isTagLibaryDisplay, changeCurrentLocation} = React.useContext(TagContext)


    const [TagItemArray, setTagItemArray] = React.useState([]);


    // console.log(isPopperOpen, 'poperopen')
    const togglePopper = () => {

    }
    console.log(taggedObjArray,'taggedObjArray')

    const getTagitemArray = taggedObjArray? taggedObjArray.map(item => {
        return {
            text: item.text,
            tagType: item.tagType,
            // istag: item.item.tag,
            index: item.index,
            location: item.location,
            path: item.path,
            isPopper: false
        }
    }): null

    React.useEffect(() => {
        setTagItemArray(getTagitemArray)
    }, [taggedObjArray]);


    const toggleIsPopper = (text) => {
        console.log('cow')


        if(TagItemArray.length > 0){
            const itemswPopperOpen = TagItemArray.some(item => item.isPopper == true)

            console.log(itemswPopperOpen)

            if(itemswPopperOpen){
                return
            }else{
                setTagItemArray(prev => prev.map(item => item.text == text?{
                    ...item,
                    isPopper: true
                }:item))
            }

        }
        
    }

    const toggleAllIsPopperFalse = () => {

        if(TagItemArray.length > 0){
            const itemswPopperFalse = TagItemArray.some(item => item.isPopper == false)

            if(itemswPopperFalse){
                return
            }else{
                setTagItemArray(prev => prev.map(item => (
                    {
                      ...item,
                      isPopper: false
                    } 
                  )))
            }

            
        }
    }



    // console.log(taggedObjArray)

    const Tagitemcomponent = (props) => {
        // const [isPopperOpen, setisPopperOpen] = React.useState(false);
        const text = props.text
        const LocationPath = props.path
        const subText =  text.substring(0, 15)
        const propperSubText = text.substring(0, 25)
        console.log(props)
        // console.log(props.isPopper)

        const defaulttags = [
            {name: 'important',
            color:'red'},
            {name: 'revisit',
            color: 'blue'},
            {name:'disregard',
            color:'yellow'}
        ]

        const TagColor = defaulttags.find(item => item.name == props.tagType).color
        
        return (
            <Popover
                    //  key={key} 
                     isOpen={props.isPopper}
                     positions={[ 'left', 'bottom']} // if you'd like, you can limit the positions
                     padding={10} // adjust padding here!
                     reposition={true}
                     onClickOutside={() => toggleAllIsPopperFalse()}
                     content={({ position, nudgedLeft, nudgedTop }) => ( // you can also provide a render function that injects some useful stuff!
                     <div style={{width: 150}} className="border rounded bg-gray-300" >
                       <div className="px-2" >
                        {propperSubText} 
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos eius accusamus beatae totam autem corporis id odio.
                       </div>
                     </div>
                   )}
                    >
            <div className={`${props.isPopper?'text-white ':''}text-white  my-2  transition-all  `} >
                {/* <div className="fixed" >
                    cdd
                </div> */}



                <div className="flex border" >
                    <div 
                    style={{
                        backgroundColor:TagColor
                    }}
                    className="text-white flex items-center p-1 text-sm" >
                        {props.tagType}
                    </div>

                    <div onClick={()=>changeCurrentLocation(LocationPath)} className="hover:text-white cursor-pointer px-1" >
                        <i className="ri-map-pin-5-line"></i>
                    </div>

                    <div className="flex  justify-between text-sm" >
                     <div className="cursor-pointer" onMouseLeave={() => toggleAllIsPopperFalse()} onMouseOver={()=>toggleIsPopper(text)} >
                     {subText} {subText.length > 15?'....':''}
                     </div>
                    </div>   
                </div>
              
            </div>
            </Popover>
        )
    }

  

    // let jam = new Array(22)

    // jam.fill('damn baby')

    // console.log(jam)
    console.log(TagItemArray, Boolean(TagItemArray))



    const TagsLibarydisplayComponent = TagItemArray? TagItemArray.map((item,i) => (
        <Tagitemcomponent
        text= {item.text}
        tagType = {item.tagType}
        index = {item.index}
        location = {item.location}
        path = {item.path}
        key = {i}
        isPopper = {item.isPopper}
        />
    ) ):<div className="p-2 text-white">
        No items have been tagged
    </div> 



    // console.log(taggedObjArray)


    // const TagsLibarydisplayComponent = jam.map(item =>(
    //     <div className="border border-white p-2 my-3" >
    //         dam baby
    //     </div>
    // ))

    

    // console.log(TagsLibarydisplayComponent, 'test')

    return (
        <div className="" >
             <div className="fixed w-full bg-black" >
                    <div className=" text-white font-bold border-b  border-dashed border-white text-white pb-1 px-2" >Tags Libary</div>
                    <div className="flex border-b items-center pb-1
                    justify-center " >     
                        <Button onClick={()=>toggleisTagLibaryDisplay()} >X</Button>
                    </div>

                </div>

               

            <div className=" h-screen overflow-scroll pt-20 bg-black" >
                 <div className="text-white border flex">
                    <div className="bg-red-600 px-2">
                        x
                    </div>

                    <div className="bg-blue-600 px-2">
                        x
                    </div>
                 
                </div>
                <div className="" >
                {TagsLibarydisplayComponent}
                </div>
             </div>

        </div>
     
    )
}

export default TagsLibary