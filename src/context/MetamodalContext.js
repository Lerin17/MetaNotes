
import React from "react";

//this file will handle the styling of the prose componet when the theme or MetaState is changed

const Stylecontext = React.createContext()

function StylecontextProvider(props) {

 const [isMetamodal, setisMetamodal] = React.useState(false);
 const [MetaID, setMetaID] = React.useState(1);
 const [TextproseID, setTextproseID] = React.useState();
 
 const [MetaArray, setMetaArray] = React.useState([]);
//  const MetaArrayx =  [...MetaArray]
 const [currentMeta, setcurrentMeta] = React.useState();
 const [currentMetacontent, setcurrentMetacontent] = React.useState('');
 const [testNum, settestNum] = React.useState(1);

 
//  const MetacontentOnchange = (event) => {
//   setcurrentMetacontent(
//     event.target.value
//   )
//  }

function updateTestNum(params) {
  settestNum(prev => prev + 1)
  console.log(testNum);
}

// console.log(testNum);

React.useEffect(() => {
  console.log(MetaArray)
  console.log('damnn')
  console.log(TextproseID)

  const isalreadyx = MetaArray.filter(item => (item.id == TextproseID))

  console.log(isalreadyx, 'checks')

  if(isMetamodal == true){
 setMetaID(prev => prev + 1)
  }

  setcurrentMeta(
    {
      id: MetaID,
      content: {}
    }
  )
  
  console.log(currentMeta)
  console.log(MetaID)
 
}, [isMetamodal]);


function CreateMetaID(isMeta) {
  // if(isMeta){
  //   setTimeout(() => {
  //     setMetaID(prev => prev + 1)
  //   }, 50);    
  // }
  console.log(MetaID, 'test')
  return `${MetaID}`

}
  
  const toggleMetamodal = () => {
    setisMetamodal(prev => !prev)

    setTimeout(()=>{
      console.log(MetaArray, 's')
    }, 300)
    
  }
 
//  const CreateMetaObj = (MetaID) => {
//   // const isMetaalready = MetaArray.some(item => item.id === MetaID)
  
//   setcurrentMeta(
//     {
//       id: MetaID,
//       content: {}
//     }
//   )
//  }

const updateTextProseId = (id) => {
  console.log(id)
setTextproseID(id)
}

 const updateMetaArray = () => {
   setMetaArray(prev => [...prev, currentMeta])
 }

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

 console.log(MetaArray)





return (
    <Stylecontext.Provider value = {{isMetamodal, toggleMetamodal, MetaID, CreateMetaID, MetaArray, setMetaArray, updateMetaArray, currentMeta, currentMetacontent,  updateCurrentMeta, sortSelectedMeta, updateTestNum, MetaID, updateTextProseId}} >
        {props.children}
    </Stylecontext.Provider>
)
}


export {StylecontextProvider, Stylecontext}