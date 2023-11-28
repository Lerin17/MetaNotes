
import React from "react";

//this file will handle the styling of the prose componet when the theme or MetaState is changed

const Metacontext = React.createContext()

function MetacontextProvider(props) {

 const [isMetamodal, setisMetamodal] = React.useState(false);
 const [MetaID, setMetaID] = React.useState(1);
 const [TextproseID, setTextproseID] = React.useState();
 
 const [MetaArray, setMetaArray] = React.useState([]);
//  const MetaArrayx =  [...MetaArray]
 const [currentMeta, setcurrentMeta] = React.useState();
 const [currentMetaPopoverContent, setcurrentMetaPopoverContent] = React.useState('');
 const [currentMetacontent, setcurrentMetacontent] = React.useState('');
//  const [testNum, settestNum] = React.useState(1);

 
//  const MetacontentOnchange = (event) => {
//   setcurrentMetacontent(
//     event.target.value
//   )
//  }

// function updateTestNum(params) {
//   settestNum(prev => prev + 1)
//   console.log(testNum);
// }

// console.log(testNum);

React.useEffect(() => {
  console.log('conductor')
}, []);

React.useEffect(() => {  
  console.log(currentMeta)
  console.log(MetaID)
 
}, [isMetamodal]);


function  updatMetaId (params) {
  setMetaID(prev => prev + 1)
}

function createCurrentMetaObj(Metaid) {
  setcurrentMeta(
    {
      id: Metaid,
      content: {}
    }
  )
}



console.log(MetaArray, 'metaArray')

// const displayMetaContentPopup = (contentData) => {
//   // console.log(Id, 'id passed')

//   console.log(MetaArray, 'metaArray')

//   const pickedMeta = MetaArray.find(item => item.id == contentData.metaid)
//   console.log('picked', pickedMeta)
//   return pickedMeta

//   // if(pickedMeta){
//   //   setcurrentMetaPopoverContent(pickedMeta)
//   // }
 
//   // console.log()
// }



// function CreateMetaID(isMeta) {
//   // if(isMeta){
//   //   setTimeout(() => {
//   //     setMetaID(prev => prev + 1)
//   //   }, 50);    
//   // }
//   console.log(MetaID, 'test')
//   return `${MetaID}`

// }
  
  const toggleMetamodal = () => {
    setisMetamodal(prev => !prev)

    // setTimeout(()=>{
    //   console.log(MetaArray, 's')
    // }, 300)
    
  }
 

  const isSelectedMetalready = (id) => {
  if(MetaArray.length < 1){
    return false
  }
  const getSelectedMeta = MetaArray.some(item => item.id === id)
  const SelectedMetaobj = MetaArray.find(item => item.id === id)

  if(getSelectedMeta){
    setcurrentMeta(SelectedMetaobj)
  }
  // console.log(xisSelectedMetalready, 'is')
  return getSelectedMeta
  }


const updateTextProseId = (id) => {
  console.log(id)
setTextproseID(id)
}

 const updateMetaArray = () => {

  // updateCurrentMeta(value)

  const isCurrentMetaAlready = MetaArray.some(item => item.id == currentMeta.id)

  if(isCurrentMetaAlready){
    setMetaArray(prev => prev.map(item =>item.id == currentMeta.id? {...item, content: currentMeta.content}:item))
    return
  }

   setMetaArray(prev => [...prev, currentMeta])
 }


// React.useEffect(() => {

//  }, [MetaArray]);



 const updateCurrentMeta = (Metacontent) => {
   setcurrentMeta(prev => ({...prev, content: Metacontent }))
 }

 const sortSelectedMeta = (id) => {
  console.log(id)
  setTextproseID(id)
  // console.log(MetaArray)
  // if(id){
  // const selectedMeta = MetaArray.filter(item => (id == item.id))
  // console.log(selectedMeta)
  // }
 }

//  console.log(MetaArray)





return (
    <Metacontext.Provider value = {{isMetamodal, toggleMetamodal, MetaID, MetaArray, setMetaArray, updateMetaArray, currentMeta, currentMetacontent,  updateCurrentMeta, sortSelectedMeta, MetaID, updateTextProseId, updatMetaId, createCurrentMetaObj, isSelectedMetalready, currentMetaPopoverContent }} >
        {props.children}
    </Metacontext.Provider>
)
}


export {MetacontextProvider, Metacontext}