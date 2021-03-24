import { makeStyles, TextField } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    textField: { margin: theme.spacing(1)},
}));

export const InputCurrentDate = ({label}) => {
    const classes = useStyles();
    return (
        <TextField
            value={dateDuJour()}
            label={label}
            InputLabelProps={{
                shrink: true
            }}
            className={classes.textField}
            fullWidth={true}
        />
    ); 
}