import React from 'react';

import { makeStyles } from '@material-ui/styles';

/* Assets imports */
 import logo from '../assets/images/logo.png';

 // style constant
const useStyles = makeStyles((theme) => ({
    img: {
        width: "180px",
        paddingTop: "5px"
    }
}));
// ===========================|| LOGO IMAGE ||=========================== //

const Logo = () => {
    const classes = useStyles();

    return (
         <img className={classes.img} src={logo} alt="Adis Analytics" />
    );
};

export default Logo;
