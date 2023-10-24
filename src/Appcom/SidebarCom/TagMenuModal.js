import React from 'react'
import { TagContext } from '../../context/tagContext'

import { AppBar, Badge, Box, Button, Card, CardContent, CardMedia, IconButton, InputBase, Modal, Paper, TextField, Toolbar, Typography } from "@mui/material"



const TagMenuModal = () => {

    const {currentTag, isTagMenu, toggleisTagMenu, tagsArray, changeCurrentTag, taggedObjArray, toggleisTagLibaryDisplay,tagsColorPool, handleNewTaginput, userCreatedTagsArray, setnewTagError, newTagError} = React.useContext(TagContext)



    const MainModalstyles = [`absolute top-32 md:left-96 lg:left-1/6 ${isTagMenu?'left-72':'left-96'}   -translate-x-1/2   bg-transparent   pb-3 md:ml-5 lg:ml-10`]

    const [isNewtagPalette, setisNewtagPalette] = React.useState(false);

    const [currentNewTagColor, setcurrentNewTagColor] = React.useState(null);
    const [currentNewTagName, setcurrentNewTagName] = React.useState(null);

    React.useEffect(() => {
        setcurrentNewTagName('')
        setcurrentNewTagColor(null)
        setisNewtagPalette(false)
    }, [tagsArray]);

    
    const TagsColorPoolPalette = () => {
        const unavailableColors = userCreatedTagsArray.map(item => item.color)

    const Tagsdisplay = tagsArray.length? tagsArray.map((item, i)=>{
        return (
            <div key={i} >
                <Tagcomponent
                name={item.name}
                color={item.color}
                />
            </div>
        )
        }):'tags not available'

        const Tagcomponent = (props) => {
            const tag = props.color
          
    
            const colors = [
                {name:'red', value: '#ff4500'}, 
                {name:'blue', value: "#4169e1"}, 
                // {name:'grey', value:grey}, 
                {name:'yellow', value:"	#ffd700"},
                {name: 'purple', value:"#9932cc"},
                {name: 'black', value:"#000000"},
                {name:'green', value:'#06c034'},
                {name:"violet", value:""},
                {name:"moccasin", value:""},
                {name:"maroon", value:""},
                {name:'teal', value:''},
                {name:'loghtsteelblue', value:''}
    
            ]
    
            const currentcolor = colors.find(item => item.name == tag)
            const iscurrenttag = currentTag == props.name
        
    
            // console.log(currentcolor)
            const style = `${iscurrenttag?'border-2':'border-none'} w-full px-1`
            // <Box sx={{ color: 'text.secondary' }}>Sessions</Box>
    
            return(
                <Box  sx={{ backgroundColor: currentcolor.value}} className={style}>
                {/* <div className="  "  >
                <IconButton className="hover:bg-transparent py-0 " >
                <i className=" ri-file-list-2-line text-gray-300 "></i>
                </IconButton>
                </div> */}
                
                <div className={`text-sm font-bold self-center text-black`} >{props.name} {props.color}</div>  
    
                <div className="flex" >
                <div className="mr-2" ><i className="ri-delete-bin-2-line hover:text-red-700"></i></div>
    
                <div onClick={()=>changeCurrentTag(props.name)} className="mx-2" ><i className="ri-price-tag-3-line hover:text-gray-200"></i></div>
    
                <div onClick={()=>toggleisTagLibaryDisplay()} className="ml-2" ><i className="ri-folder-open-line hover:text-gray-200"></i></div>
                </div>
                 
            </Box>     
            )
        }

  return (

    <div
   
  >
    <div   className={` ${MainModalstyles} `} style={{ width: 400 , height: 500, "& .MuiOutlinedInput-notchedOutline": {
        border: "0 none",
      } }}
      >
   
        <div style={{height:600}} className="border-none" >
            <div className="text-2xl">
            Tags
            </div>
           
        {/* <ToastContainer /> */}
            <div className="bg-gray-800 py-1 text-white font-bold px-2 flex justify-between font-header5" >
               <div>
                 Tags
                </div>

                <div className="cursor-pointer" onClick={()=>toggleisTagLibaryDisplay()}>
                 TagsLibary
                </div>
            </div>

            <div className="flex flex-col" > 
                {Tagsdisplay}
                {/* <div className="w-20 p-2 bg-gray-600 " >
                <IconButton className="hover:bg-transparent py-0" >
                <i className=" ri-file-list-2-line text-white"></i>
                </IconButton>
                <div>Name</div>    
                </div> */}
                <div className="px-2 bg-white border-2 border-black border-dashed text-2xl font-bold flex items-center" >
                    <div className="w-2/3" >
                    <InputBase  placeholder="Create new tag" variant="outlined"
        value={currentNewTagName}
        onChange={(event)=>setcurrentNewTagName(event.target.value)}
        />
                        {/* <input type="text" 
                        className="bg-transparent font-bold w-full"
                        placeholder="Create new tag"
                        value={currentNewTagName}
                        onChange={(event)=>setcurrentNewTagName(event.target.value)}
                        /> */}
                    </div>
                   
                    <div className="w-1/3" >
                    <IconButton onClick={()=>setisNewtagPalette(prev => !prev)} className="hover:bg-transparent"  >
                    <i className="ri-palette-fill text-yellow-500"></i>
                    </IconButton>

                    <IconButton className="hover:bg-transparent" onClick={()=>handleNewTaginput(currentNewTagName, currentNewTagColor)} >
                    <i  className="ri-save-2-line text-black"></i>
                    </IconButton>

                    
                    </div>
                    
                </div>
               <div className={`${isNewtagPalette?'animate-fadeVertical block ':'hidden'}`} >
                <TagsColorPoolPalette/>
               </div>
                
                
            </div>
        </div>
    </div>
  </div>
  )
}}

export default TagMenuModal