import React from 'react'
import _ from "lodash";

import { LibaryContext } from './LibaryContext';

const bionicContext = React.createContext()

const BionicContextProvider = (props) => {

let bionicContentValue
let xbionicContentValue
// let bionicTextValueAltered

const {toggleResetTextareas, isResettextareas} = React.useContext(LibaryContext)

const [initialTextProseValue, setinitialTextProseValue] = React.useState();

const [isActivateBionicText, setisActivateBionicText] = React.useState(false);

const [bionicTextValueAltered, setbionicTextValueAltered] = React.useState();


const updateInitialTextProseValue = (value, title) => {
    setinitialTextProseValue({
        value, title
    })
}

const clearInitialTextProseValue = () => {
    setinitialTextProseValue(false)
}

console.log(initialTextProseValue, 'john henry')

const toggleisActivateBionic = () => {
    if(initialTextProseValue && !isActivateBionicText){
        console.log(initialTextProseValue, 'initialTextProseValue')
        bionicContentValue = initialTextProseValue.value.map(item => item.children.map(item => item.text)) 

        bionicContentValue = bionicContentValue.map(item => item[0].split(" "))

      bionicContentValue = bionicContentValue.map(item => {
           if(item.length == 1 && item[0] == ''){
               return {
                   TextArray: item,
                   isSpace: true
               }
           }else{
              return {
               TextArray: item,
               isSpace: false
              }
       }
       })

     xbionicContentValue = bionicContentValue.map(item => {
           if(item.TextArray.length == 1 && item.TextArray[0] == ''){
           return (
               item
           )

           }else{
            const itemMod =   item.TextArray.map(word =>  {if(word){
                   // console.log(word)
               const wordLength =  word.length
               let halfLength
       
               if(wordLength % 2 == 0){
                    halfLength = wordLength/2
               }else{
                    halfLength = Math.floor(wordLength/2) + 1
               }

                return ({
                   wordL: word.length,
                   firstHalf: word.substring(0, halfLength),
                   secondHalf: word.substring(halfLength, wordLength)

                })   
               } })

               return itemMod
       }
       })

       xbionicContentValue = xbionicContentValue.map(item => {
           if(item.isSpace){
               return item
           }else{
            // console.log(item, 'integrate')
            let itemMod = item.filter(item => {
                if(item !== undefined){
                    return item
                }
            })
            
            // console.log(itemMod, 'newintegratexxxxd')

             itemMod =   itemMod.map(wordObj => {
                   if(wordObj){
                       if(wordObj.secondHalf == ''){
                           return {text: `${wordObj.firstHalf} `}
                       }else{
                           return [
                                {text: wordObj.firstHalf, bold: true},
                                {text: `${wordObj.secondHalf} ` }
                           ]
                       }
                   }
               })

               return itemMod
           }
       })

     const  xbionicTextValueAltered = xbionicContentValue.map(item => {
           if(item.isSpace){
               return {type: 'paragraph', children: [{text: ''}]}
           }else{
               return {type: 'paragraph', children: _.flatten(item)}
           }
       })

       setbionicTextValueAltered(xbionicTextValueAltered)
       console.log(xbionicTextValueAltered, 'the main value of everything')
       // const bionictextValue = ''
       //  bionicContentValue = bionicContentValue.map(item => item.split(' '))
   }


    // setTimeout(() => {
        console.log('click')
        // toggleResetTextareas()
        setisActivateBionicText(prev => !prev) 
    // }, 20);
 
}

console.log(isActivateBionicText, 'isactive')


// React.useEffect(() => {

    

// }, [isActivateBionicText]);

// console.log(initialTextProseValue)
// console.log(bionicContentValue)
// console.log( xbionicContentValue)
// console.log(bionicTextValueAltered)



// console.log(initialTextProseValue)



  return (
    <bionicContext.Provider value={{updateInitialTextProseValue, bionicTextValueAltered, isActivateBionicText, setisActivateBionicText, toggleisActivateBionic, initialTextProseValue, clearInitialTextProseValue}} >
        {props.children}
    </bionicContext.Provider>
  )
}

export  {BionicContextProvider, bionicContext}