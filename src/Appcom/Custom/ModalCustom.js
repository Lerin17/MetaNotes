import React from 'react'

const ModalCustom = (props) => {

  return (

    <div className='z-10 absolute top-32 left-48 blur-none' >{props.open && props.children}</div>
  )
}

export default ModalCustom