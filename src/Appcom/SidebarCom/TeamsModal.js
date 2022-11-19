import { Button, InputBase } from '@mui/material'
import React from 'react'
import { TeamsContext } from '../../context/teamsContext'


const TeamsModal = () => {

   

    const {isAddNewTeamOpen, setisAddNewTeamOpen,  setaddTeamEmailValue, setaddTeamNameValue,addTeamNameValue, addTeamEmailValue, AddNewTeamMember} = React.useContext(TeamsContext)

  return (
    <div className="flex" >
    <div className={`${isAddNewTeamOpen?'w-5/6':'w-2/6'} transition-all`}>
        <div className=" border-b-2 text-3xl px-2 border-r-2 " >Teams
        <span className='cursor-pointer' onClick={()=>setisAddNewTeamOpen(prev => !prev)}>
            +
        </span>
        </div>

        {isAddNewTeamOpen ?
             <div style={{
                height:400
            }} className="h-full border-r-2 pt-4">
                <div className='flex items-center' >
                    <div className='text-xl' >Name:</div> 
                    <InputBase
                    value={addTeamNameValue}
                    onChange={(e)=>setaddTeamNameValue(e.target.value)}
                    className='border-b-2 w-full px-2' 
                    />
                </div>

                <div className='flex items-center pt-4' >
                    <div className='text-xl' >Email:</div> 
                    <InputBase
                    value={addTeamEmailValue}
                    onChange={(e)=>setaddTeamEmailValue(e.target.value)}
                    className='border-b-2 w-full px-2' 
                    />
                </div>

                <div className='flex justify-end m-4' >
                    <Button 
                    onClick={()=>{AddNewTeamMember()}} >
                        Add Team Member
                    </Button>
                </div>
            </div>:<div className='h-full border-r-2'
            style={{
                height:400
            }}
            >
                cv
            </div>
        }
       
    </div>
   
   <div className={`${isAddNewTeamOpen?'w-1/6':'w-5/6'} transition-all`}>
        <div className="border-b-2 text-3xl px-2" >Libary</div>
        <div style={{
            height:400
        }}>
            <div>ddd</div>
            <div>ddd</div>
        </div>
   </div>
   
</div>
  )
}

export default TeamsModal