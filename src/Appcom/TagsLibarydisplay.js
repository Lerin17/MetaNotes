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
        if(TagItemArray.length > 0){
            setTagItemArray(prev => prev.map(item => item.text == text?{
                ...item,
                isPopper: !item.isPopper
            }:item))
        }
        
    }

    const toggleAllIsPopperFalse = () => {
        if(TagItemArray.length > 0){
            setTagItemArray(prev => prev.map(item => (
              {
                ...item,
                isPopper: false
              } 
            )
              ))
        }
    }



    // console.log(taggedObjArray)

    const Tagitemcomponent = (props) => {
        // const [isPopperOpen, setisPopperOpen] = React.useState(false);
        const text = props.text
        const LocationPath = props.path
        const subText =  text.substring(0, 15)
        const propperSubText = text.substring(0, 25)

        // console.log(props.isPopper)
        
        return (
            <Popover
                    //  key={key} 
                     isOpen={props.isPopper}
                     positions={[ 'left', 'bottom']} // if you'd like, you can limit the positions
                     padding={10} // adjust padding here!
                     reposition={true}
                     onClickOutside={() => toggleAllIsPopperFalse()}
                     content={({ position, nudgedLeft, nudgedTop }) => ( // you can also provide a render function that injects some useful stuff!
                     <div style={{width: 150}} className="border bg-gray-500" >
                       <div className="px-2" >
                        {propperSubText} 
                        damn baby whats the iss damm rockdd 
                        wwmx dmcd ddv f v ccx
                       </div>
                     </div>
                   )}
                    >
            <div className={`${props.isPopper?'text-white bg-gray-500':''} p-2 pr-0 my-2 border-2 border-gray-600 transition-all hover:scale-105 hover:border-none`} >
                {/* <div className="fixed" >
                    cdd
                </div> */}



                <div className="flex justify-between" >
                    <div>
                     Tagitem
                    </div>
                   
                    <div className="bg-red-400 flex items-center pb-1" >
                        {props.tagType}
                    </div>
                </div>
                <div className="flex w-1/2 justify-between" >
                 
                        <div className="cursor-pointer" onMouseLeave={() => toggleAllIsPopperFalse()} onClick={()=>toggleIsPopper(text)} >
                            {subText} {subText.length > 15?'....':''}
                        </div>

                        <div onClick={()=>changeCurrentLocation(LocationPath)} className="hover:text-white cursor-pointer" >
                        <i class="ri-map-pin-5-line"></i>
                        </div>
             
                </div>   
            </div>
            </Popover>
        )
    }



    // let jam = new Array(22)

    // jam.fill('damn baby')

    // console.log(jam)
    // console.log(TagItemArray, Boolean(TagItemArray))

    const TagsLibarydisplayComponent = TagItemArray? TagItemArray.map((item,i) => (
        <Tagitemcomponent
        text= {item.text}
        tagType = {item.tagtype}
        index = {item.index}
        location = {item.location}
        path = {item.path}
        key = {i}
        isPopper = {item.isPopper}
        />
    ) ):'No items have been tagged'



    // console.log(taggedObjArray)


    // const TagsLibarydisplayComponent = jam.map(item =>(
    //     <div className="border border-white p-2 my-3" >
    //         dam baby
    //     </div>
    // ))

    

    // console.log(TagsLibarydisplayComponent, 'test')

    return (
        <div className="" >
             <div className="fixed w-full bg-gray-400" >
                    <div className=" text-white font-bold border-b  border-dashed border-white text-white pb-1" >Tags Libary</div>
                    <div className="flex border-b items-center pb-1
                    justify-center " >     
                        <Button onClick={()=>toggleisTagLibaryDisplay()} >X</Button>
                    </div>

                </div>

               

            <div className=" h-screen overflow-scroll pt-20 bg-gray-400" >
                <div className="" >
                {TagsLibarydisplayComponent}
                </div>
             </div>

        </div>
     
    )
}

export default TagsLibary