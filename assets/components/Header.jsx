import React from 'react'
import { AppBar, Toolbar, Grid, InputBase, IconButton, makeStyles } from '@material-ui/core'


const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#fff',
        color: '#000'
    }
}))

export default function Header({children}) {

    const classes = useStyles();

    return (
        <AppBar position="static" className={classes.root}>
            <Toolbar>
                <Grid container alignItems="center" justify="space-between">
                {children}
                </Grid>
            </Toolbar>
        </AppBar>
    )
}
