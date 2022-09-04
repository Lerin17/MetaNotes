// import { Button } from "@material-ui/core";

import React from "react";
import { DashboardContext } from "../context/DashboardContext";





function Dashboard(params) {
    const {recentFilesOpened} = React.useContext(DashboardContext)
    let xRecentFilesOpened

    if(recentFilesOpened.length < 3){

    const n = 3 - recentFilesOpened.length 

    xRecentFilesOpened = [...recentFilesOpened, ...new Array(n)]
    
    
    }else{
    xRecentFilesOpened = recentFilesOpened
    }

    console.log(xRecentFilesOpened, 'recents')

    const FileComponent = (props) => {
        if(props.book){
            return (
                <div className="text-sm shadow bg-lime-500 h-20 px-2 w-1/3" >
                              {props.book.bookTitle}
                  </div>
    
            )
        }else{
            return (
                <div className="text-sm shadow white h-20 px-2 w-1/3" >
                              {/* {props.name} */}
                  </div>
            )
        }
    
    }

    const smooth =  xRecentFilesOpened.map(item => 
        <FileComponent
        book = {item}
        />
    )

    return (
        <div className="h-screen" >
            <div>
                <div style={{
                //   WebkitTextStroke : '1px cornflowerblue'
                }} className="font-header5  capitalize  text-4xl text-gray-800 bg-gray-100 py-6 px-2 text-start border-b-4 border-slate-400 " >
                    Dashboard
                </div>
                <div className="font-header4 text-blue-700 bg-white  px-2 text-lg border-b-2 shadow" >
                    Word Count: 3,000
                </div>
            </div>
          
            <div className="flex flex-col " >
                {/* {smooth} */}
                <div  >
                    <div className="font-header4 uppercase px-2 font-bold text-lime-500 text-2xl " >Recents</div>
                    <div className="font-header2 text-black cursor-pointer   text-2xl p-2 flex justify-start text-black ">

                            <div className="bg-gray-600" >
                                -
                            </div>

                            {smooth}
                        {/* <div className="text-sm shadow bg-lime-500  px-2 w-1/3" >
                            Namedam
                        </div>

                        <div className="text-sm shadow bg-lime-300 h-20 px-2 w-1/3" >
                            Name
                        </div>

                        <div className="text-sm shadow  px-2 w-1/3" >
                            Name
                        </div> */}

                        <div className="bg-gray-300" >
                                -
                            </div>
                    {/* Recent Files */}
                    </div>
                </div>
              
                {/* <div className="bg-slate-300 text-black py-5" >
                    Dark Mode
                </div>

                <div className="bg-zinc-400 text-black py-5" >
                    Dark Mode
                </div> */}

            </div>
        </div>
    )
}

export default Dashboard

{/* <div className="font-header3 uppercase font-bold text-2xl text-gray-500 bg-white py-6 px-2 text-start border-b-4 border-slate-400" >
Dashboard
</div> */}