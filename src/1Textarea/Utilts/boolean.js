import { toggleButtonGroupClasses } from "@mui/material";
import React from "react";

const Bool = (defaultvalue) => {
const [bool, setbool] = React.useState(defaultvalue);

const togglebool = () => {
setbool(prev => !prev)
}

return [bool, togglebool]
}


export default Bool