import { Button, Snackbar, SnackbarContent } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import React from 'react'

export default function MessageDialog({bg, message, open, toggle}) {
    return <Snackbar autoHideDuration={6000} open={open}>
        <SnackbarContent 
            style={{backgroundColor: bg, color: '#fff'}} 
            message={message} 
            action={[
                <Button onClick={()=>(toggle(false))} color="inherit" key='dismiss'>
                    <Close/>
                </Button>
            ]}>
        </SnackbarContent>
    </Snackbar>
}
