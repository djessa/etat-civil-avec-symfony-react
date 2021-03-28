import React, { Component } from 'react'
import SideMenu from "./SideMenu";
import { CssBaseline, createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    textField: { margin: theme.spacing(1)},
    containedPrimary: {
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4)
    }
}));


const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#333996",
        light: '#3c44b126'
      },
      secondary: {
        main: "#f83245",
        light: '#f8324526'
      },
      background: {
        default: "#f4f5fd"
      },
    },
    overrides:{
      MuiAppBar:{
        root:{
          transform:'translateZ(0)'
        }
      }
    },
    props:{
      MuiIconButton:{
        disableRipple:true
      }
    }
});

export default function AppProvider ({children}) {
    return (
        <ThemeProvider theme={theme}>
            <SideMenu />
            <div className="appMain">
                {children}
            </div>
            <CssBaseline />
        </ThemeProvider>
    );
}
