import { AppBar, InputBase, Toolbar, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { SearchRounded } from "@material-ui/icons";



const usestyle = makeStyles((theme)=> ({
appbar: {
    border: '4px black dotted',
    color: 'green', [theme.breakpoints.down("sm")]: {
        color: (props) => (props.open? 'red': 'yellow')
    }
}

}))

export default function Navbar(){

const [open, setopen] = React.useState(false);
const classes =   usestyle({open})
    return (
        <div>
            <AppBar position="static">
                <Toolbar className= {`bg-red-400 ${classes.appbar}`}>
                    <Typography variant="h4" >
                        lama dev
                    </Typography>
             <SearchRounded/>
             <InputBase size="small"  className="bg-white rounded-2 w-1/2 text-md p-0" />
              {/* heyyy */}
                </Toolbar>
            </AppBar>
        </div>
    )

}