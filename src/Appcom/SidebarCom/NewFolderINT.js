import { IconButton, TextareaAutosize, TextField } from "@material-ui/core";
import {Button} from "@mui/material"
import React from "react";
import { DashboardContext } from "../../context/DashboardContext";
import { LibaryContext } from "../../context/LibaryContext";
// LibaryContext



function NewFolderInteface(props) {
  

    const {getFolderDescription, getFolderName, currentFolderContent, openBook, isNewFolderInterface, toggleisNewFolderInterface, updateCurrentFolderContent, saveCurrentFolder, currentFolderName, currentFolderDescription, setcurrentFolderDescription, setcurrentFolderName , openFolder, FolderArray, currentFolderID} = React.useContext(LibaryContext)

    const {recentFilesOpened} = React.useContext(DashboardContext)

    const [NewFolderName, setNewFolderName] = React.useState(currentFolderName);
    const [NewFolderDescription, setNewFolderDescription] = React.useState(currentFolderDescription);

    const handleUpdateName = (event) => {
      setcurrentFolderName(event.target.value)
        // setNewFolderName
    }

    const handleUpdateDescription = (event) => {
        setcurrentFolderDescription(event.target.value)
        // setNewFolderDescription
    }

    // React.useEffect(() => {
    //     if(!currentFolderName){
    //         setNewFolderDescription('')
    //         setNewFolderName('')
    //     }
        
    // }, [currentFolderDescription, currentFolderName, isNewFolderInterface]);

    console.log(currentFolderContent, 'currwnt folder content')

    // React.useEffect(() => {
    //     getFolderName(NewFolderName)
    //     getFolderDescription(NewFolderDescription)
    // }, [NewFolderName, NewFolderDescription]);


    const FolderFilecomponent = (props) => {
        const currentFolderContentIDs = currentFolderContent.map(item => item.bookid)

        let fileTitle = props.title
        fileTitle = fileTitle.length > 8? `${fileTitle.substring(0, 8)}...`: fileTitle
        return (
            <div className={`w-20 h-16  bg-amber-700 flex flex-col `} >
                <div className="  self-center "  >
                {/* <IconButton onClick={()=>openBook(props.bookid)} className="hover:bg-transparent py-0 " > */}
                <div  onClick={()=>openBook(props.bookid)} >
                    <i className=" ri-file-list-2-line text-gray-300 "></i>
                </div>
{/*                 
                </IconButton> */}
                </div>
                
                <div className="text-xs px-1 w-full text-center self-center text-gray-200" >{fileTitle}</div>  

            <div className="w-full flex justify-between" >
                <div className={`${isNewFolderInterface?'block w-full ':'hidden'}`} >
                    <div onClick={()=>updateCurrentFolderContent(props. allbookData)} className={`${currentFolderContentIDs.includes(props.bookid)?'text-white bg-red-500 hover:bg-red-600':'bg-green-500 hover:bg-green-600'} uppercase  transition-all text-center cursor-pointer font-bold`} >
                         {currentFolderContentIDs.includes(props.bookid)?'Remove':'add'}
                    </div>
                      
                {/* <i className="ri-add-circle-fill"></i> */}
                </div>

                <div className={`${isNewFolderInterface?'hidden':'block'}`} >
                    <i className="ri-delete-bin-2-line hover:text-red-500"></i>
                </div>  
                </div>
              
            </div>     
        )
    }


    const NewfolderContentDisplay = currentFolderContent.length? currentFolderContent.map((item,i) => <FolderFilecomponent
        key ={i}
        title= {item.bookTitle}
        bookid = {item.bookid}
        allbookData = {item}
    />):<div>
        No items have been added
    </div>

    const FolderArrayIDs = FolderArray.map(item => item.folderId)
    console.log(FolderArrayIDs, 'idsx')
    console.log(FolderArrayIDs.includes(currentFolderID), 'includes')


    return (
        <div className="flex flex-col  " >
            <div>
                {FolderArrayIDs.includes(currentFolderID)?
                <div onClick={()=>{
                    saveCurrentFolder()
                    toggleisNewFolderInterface()}} className="hover:text-red-500 fill-current cursor-pointer transition-all" >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"/>
                </svg>
            </div>:<div onClick={()=>toggleisNewFolderInterface()} className="hover:text-red-500 fill-current cursor-pointer transition-all" >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"/>
                    </svg>
                </div>

                }
                {/* <div onClick={()=>toggleisNewFolderInterface()} className="hover:text-red-500 fill-current cursor-pointer transition-all" >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"/>
                    </svg>
                </div> */}
            {/* <IconButton className="hover:bg-transparent" >
            <i className="ri-close-line hover:bg-transparent"></i> 
            </IconButton> */}
            </div>
        <div className="self-center" >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="64" height="64"><path fill="none" d="M0 0h24v24H0z"/><path d="M12.414 5H21a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h7.414l2 2zM4 7v12h16V7H4z"/>
            </svg>
        </div>
   
    
        

        <div className=" px-2" >
            {/* <div>
                Name: 
            </div> */}
           
            <TextField id="outlined-basic" label="Folder Name" variant="outlined"
            value={currentFolderName}
            onChange={handleUpdateName}
            />
        </div>

        <div className="px-2" >
            {/* <div>
                Description: 
            </div> */}
           
            <TextField  id="margin-none" label="Folder Description" variant="outlined" 
            value={currentFolderDescription}
            onChange={handleUpdateDescription}
            multiline={true}
            />
            {/* className="bg-transparent border-b"
            // value={NewFolderName}
            /> */}
        </div>

        <div  >
            <div className="px-4">
                Content
            </div>
            <div className=" mx-2 " >
                <div className="flex justify-between " >
                {!FolderArrayIDs.includes(currentFolderID) &&  <button className={`${currentFolderName?'block bg-green-500 hover:bg-green-600 transition-all w-full animate-fadeVerticalDown ':'hidden'}`}  onClick={saveCurrentFolder}>
                 Save
                 </button>}
               
                </div>

                <div className=" flex flex-wrap" >
                {NewfolderContentDisplay}
                </div>
            </div>
           
            {/* <Button className={`${currentFolderName?'block bg-red-300':'hidden bg-red-300'}`}  onClick={saveCurrentFolder} >
                Save
            </Button> */}
        </div>


            
    </div>
    )
}

export default NewFolderInteface