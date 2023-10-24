import React from "react";



const notetextfx = 'absolute top-1/2 left-1/2 flex flex-col  -translate-y-1/2 -translate-x-1/2  cursor-pointer text-4xl'


function Loadingpage(props) {
  
const isloadingpagefx = `${props.isopen?'block': 'hidden'}`


    
    return (
        <div className={`bg-yellow-400 h-screen  ${isloadingpagefx}`}>
        <h1 className = {notetextfx} >Notes</h1>
        </div>
        
    )
}

export default Loadingpage