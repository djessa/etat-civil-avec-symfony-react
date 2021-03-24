import React, { useState } from 'react';
import { Label } from '@material-ui/icons';
import { FormControl, InputLabel, makeStyles, MenuItem, Select, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    textField: { margin: theme.spacing(1)},
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    }
}));

const InputTextPerson = (props) => {
    
    const [property, setProperty] = useState('');
    const classes = useStyles();

    return (
        <TextField
            label={props.label}
            className={classes.textField}
            fullWidth={true}
            value={property}
            onChange={(e) => {
                const womanChange = Object.assign({}, props.objet);
                const propriete = props.property;
                womanChange.propriete = e.target.value;
                props.fonction(womanChange);
                setProperty(e.target.value);
            }} 
        />
    );
};

export const InputDatePerson = (props) => {

    const [property, setProperty] = useState('');
    const classes = useStyles();

    return (
        <TextField
            label={props.label}
            className={classes.textField}
            fullWidth={true}
            value={property}
            type="date"
            InputLabelProps={{
                shrink: true
            }}
            onChange={(e) => {
                const womanChange = Object.assign({}, props.objet);
                const propriete = props.property;
                womanChange.propriete = e.target.value;                
                props.fonction(womanChange);
                setProperty(e.target.value);
            }} 
        />
    ); 

}


export const SelectTypePerson = (props) => {

    const [property, setProperty] = useState('');

    const classes = useStyles();

    return (
        <FormControl className={classes.formControl} fullWidth={true}>
            <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                value={property}
                onChange={(e) => {
                    const womanChange = Object.assign({}, props.objet);
                    const propriete = props.property;
                    womanChange.propriete = e.target.value;
                    props.fonction(womanChange);
                    setProperty(e.target.value);
                }} 
            >
                { (props.items).map( (item, index) => <MenuItem key={index} value={item.value}>{item.text}</MenuItem>) }
            </Select>
        </FormControl>
    );
};

export default InputTextPerson;