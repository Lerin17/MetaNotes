import { createTheme } from "@mui/material";
import { blue } from "@mui/material/colors";
import { withThemeCreator } from "@mui/styles";
import { color } from "@mui/system";



const theme = createTheme({
    palette: {
        primary: {
         main: blue[50] }
    
    },
    myButton: {
        background: 'red',
        color: 'white',
        border: '1px solid black'
    }
})

export default theme