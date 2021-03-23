import React from 'react'
import {
    makeStyles,
    createMuiTheme,
    Select,
    FormControl,
    InputLabel,
    Input,
    TextField,
    Paper,
    Tabs, Tab
} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    appMain: {
      paddingLeft: '275px',
      width: '100%'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    textField: { margin: theme.spacing(1)},
    card: {
        maxWidth: 400
    },
    containedPrimary: {
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4)
    }
}));



export default function PersonForm({objet, fonction}) {
    
    const classes = useStyles();

    return <div style={{padding: '20px'}}>
        <TextField
            label="Nom"
            className={classes.textField}
            fullWidth={true}
            value={objet.nom}
            onChange={(e) => {
                const womanChange = Object.assign({}, objet);
                womanChange.nom = e.target.value;
                fonction(womanChange);
            }} 
        />
        <TextField
            label="Prénom"
            className={classes.textField}
            fullWidth={true}
            value={objet.prenom}
            onChange={(e) => {
                const womanChange = Object.assign({}, objet);
                womanChange.prenom = e.target.value;
                fonction(womanChange);
            }} 
        />
        <FormControl className={classes.formControl} fullWidth={true}>
            <InputLabel id="demo-simple-select-label">Sexe</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={objet.sexe}
            onChange={(e) => {
                const womanChange = Object.assign({}, objet);
                womanChange.sexe = e.target.value;
                fonction(womanChange);
            }} 
            >
            <MenuItem value="masculin">Masculin</MenuItem>
            <MenuItem value="feminin">Féminin</MenuItem>
            </Select>
        </FormControl>
        <TextField
            label="Date de naissance"
            className={classes.textField}
            fullWidth={true}
            value={objet.date_naissance}
            type="date"
            InputLabelProps={{
                shrink: true
            }}
            onChange={(e) => {
                const womanChange = Object.assign({}, objet);
                womanChange.date_naissance = e.target.value;
                fonction(womanChange);
            }} 
        />
        <TextField
            label="Lieu de naissance"
            className={classes.textField}
            fullWidth={true}
            value={objet.lieu_naissance}
            onChange={(e) => {
                const womanChange = Object.assign({}, objet);
                womanChange.lieu_naissance = e.target.value;
                fonction(womanChange);
            }} 
        />
        <TextField
            label="Profession"
            className={classes.textField}
            fullWidth={true}
            value={objet.profession}
            onChange={(e) => {
                const womanChange = Object.assign({}, objet);
                womanChange.profession = e.target.value;
                fonction(womanChange);
            }} 
        />
        <TextField
            label="Ville"
            className={classes.textField}
            fullWidth={true}
            value={objet.ville}
            onChange={(e) => {
                const womanChange = Object.assign({}, objet);
                womanChange.ville = e.target.value;
                fonction(womanChange);
            }} 
        />
        <TextField
            label="Adresse"
            className={classes.textField}
            fullWidth={true}
            value={objet.adresse}
            onChange={(e) => {
                const womanChange = Object.assign({}, objet);
                womanChange.adresse = e.target.value;
                fonction(womanChange);
            }} 
        />
    </div>
}
