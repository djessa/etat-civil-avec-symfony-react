import { FormControl, InputLabel, makeStyles, MenuItem, Select, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { dateDuJour } from '../variables/const';

const useStyles = makeStyles((theme) => ({
    textField: { margin: theme.spacing(1)},
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    }
}));

export const InputTextType = ({value, label, handleChange}) => {
    const [state, setstate] = useState(value);
    const classes = useStyles();
    return (
        <TextField
            value={state}
            label={label}
            className={classes.textField}
            fullWidth={true}
            onChange={(e) => {
                setstate(e.target.value);
                handleChange(state);
            }}
        />
    );
};

export const InputDateType = ({value, label, handleChange}) => {
    const [state, setState] = useState(value);
    const classes = useStyles();
    return (
        <TextField
            value={state}
            label={label}
            type="date"
            InputLabelProps={{
                shrink: true
            }}
            className={classes.textField}
            fullWidth={true}
            onChange={(e) => {
                setState(e.target.value);
                handleChange(state);
            }}
        />
    );
};


export const InputTimeType = ({value, label, handleChange}) => {
    const [state, setState] = useState('');
    const classes = useStyles();
    return (
        <TextField
            value={state}
            label={label}
            type="time"
            InputLabelProps={{
                shrink: true
            }}
            className={classes.textField}
            fullWidth={true}
            onChange={(e) => {
                setState(e.target.value);
                handleChange(state);
            }}
        />
    );
};


export const SelectType = ({label, handleChange, items}) => {

    const [property, setProperty] = useState('');

    const classes = useStyles();

    return (
        <FormControl className={classes.formControl} fullWidth={true}>
            <InputLabel id="demo-simple-select-label">{label}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                value={property}
                onChange={(e) => {
                    setProperty(e.target.value);
                    handleChange(e);
                }} 
            >
                { items.map( (item, index) => <MenuItem key={index} value={item.value}>{item.text}</MenuItem>) }
            </Select>
        </FormControl>
    );
};