import { toggleButtonGroupClasses } from "@mui/material";
import React from "react";

const Bool = (defaultvalue) => {
const [bool, setbool] = React.useState(defaultvalue);

// const togglebool = () => {

// }

function togglebool(params) {
    setbool(prev => !prev) 
}

console.log(bool)
console.log('eeewzz')

return [bool, togglebool]
}


export default Bool