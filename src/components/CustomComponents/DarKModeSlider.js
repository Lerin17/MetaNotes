import { motion } from 'framer-motion';
import React from 'react'



const SliderCustom = (props) => {

 

  return (
    <div className='flex w-full relative justify-between items-center py-1'>
      <div 
      onClick={() => props.setisfrom(false)}
      className={`${props.isfrom?'':''} cursor-pointer border border-slate-600 rounded-full bg-white px-1 z-10 relative`}>
      {props.from}
      </div>
  
      <motion.div 
      
      animate={props.isfrom ? {
        display:'block',
        x:10
      }:{
        display:'block',
        x:-10
      }}

      initial={{
        display:'hidden'
      }}

      className='absolute border-r  z-20 border-slate-600 text-transparent right-10'>
        x
      </motion.div>

      <div className='w-full  rounded-full h-6 absolute border border-slate-400' >

      </div>

      <div 
         onClick={() => props.setisfrom(true)}
      className={`${props.isfrom?'':''} cursor-pointer px-1 z-10 relative`}>
        {props.to}
      </div>
      
    </div>
  )
}

export default SliderCustom