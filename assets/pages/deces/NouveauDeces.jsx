import React, { Component, useState } from 'react'
import SideMenu from "../../components/SideMenu";
import {
    makeStyles,
    CssBaseline,
    createMuiTheme,
    ThemeProvider,
    Grid,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Input,
    TextField,
    Paper,
    Button,
    IconButton,
    AppBar, Tabs, Tab, Snackbar, SnackbarContent
} from '@material-ui/core';
import Header from "../../components/Header";
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {Close, Done} from '@material-ui/icons';
import  { jours, mois, dateDuJour, personne, personne_to_en} from  '../../variables/const';
import axios from 'axios';



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



export default function NouveauDeces () {
    const [openMessage, setOpenMessage] = useState(false);
    const [backgroundMessage, setBackgroundMessage] = useState('');
    const [message, setMessage] = useState('');
    const classes = useStyles();
    const [date_deces, setDateDeces] = useState(''); 
    const [heure_deces, setHeureDeces] = useState(''); 
    const [lieu, setLieu] = useState('');
    const [person, setPerson] = useState(Object.assign({}, personne));
    const [pere, setPere] = useState(Object.assign({}, personne));
    const [mere, setMere] = useState(Object.assign({}, personne));
    const [epoux, setEpoux] = useState(Object.assign({}, personne));
    const [declarant, setDeclarant] = useState(Object.assign({}, personne));
    const [formCategory, setFormCategory] = useState(0);
    const onChangeFormCategory = (e, value)  => {
        setFormCategory(value);
    }
    const save = () => {
        const data = {
            place_of_death: lieu,
            date_of_death: date_deces + ' ' + heure_deces, 
            person : personne_to_en(person),
            father: personne_to_en(pere),
            mother: personne_to_en(mere),
        };
        if(epoux.nom !== '')
            data.epoux = personne_to_en(epoux);
        if(declarant.nom !== '')
            data.declarant = personns_to_en(declarant);
        axios.post('/deces/new', data)
             .then((response) => {
                 setBackgroundMessage('green');
                 setOpenMessage(true);
                 setMessage(response.data.message);
                 setDateDeces('');
                 setHeureDeces('');
                 setLieu('');
                 setPerson(Object.assign({}, personne));
                 setEpoux(Object.assign({}, personne));
                 setPere(Object.assign({}, personne));
                 setMere(Object.assign({}, personne));
                 setDeclarant(Object.assign({}, personne));
             })
             .catch((error) => {
                 setBackgroundMessage('red');
                 setOpenMessage(true);
                 setMessage('Impossible d\'enregistrer');
            });
    }
    return (
        <ThemeProvider theme={theme}>
            <SideMenu />
            <form method="post" onSubmit={(e) => {e.preventDefault(); save();}}  className={classes.appMain}>
                <Header> 
                    <Grid container justify="space-between">
                        <Grid item lg={2}>
                            <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                                <TextField
                                    value={dateDuJour()}
                                    label="Date de déclaration"
                                    className={classes.textField}
                                    InputProps={{ readOnly: true }}
                                    fullWidth={true}
                                />
                            </div>
                        </Grid>
                        <Grid item lg={2}>
                            <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                                <TextField
                                    value={date_deces}
                                    onChange={(e) => setDateDeces(e.target.value)}
                                    label="Date de décès"
                                    className={classes.textField}
                                    type="date"
                                    InputLabelProps={{
                                      shrink: true
                                    }}
                                    fullWidth={true}
                                />
                            </div>
                        </Grid>
                        <Grid item lg={2}>
                            <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                                <TextField
                                    label="Heure de décès"
                                    className={classes.textField}
                                    value={heure_deces}
                                    onChange={(e) => setHeureDeces(e.target.value)}
                                    type="time"
                                    InputLabelProps={{
                                      shrink: true
                                    }}
                                    fullWidth={true}
                                />    
                            </div>
                        </Grid>
                        <Grid item lg={3}>
                            <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                                <TextField
                                    label="Lieu de décès"
                                    value={lieu}
                                    onChange={(e) => setLieu(e.target.value)}
                                    className={classes.textField}
                                    fullWidth={true}
                                />    
                            </div>
                        </Grid>       
                        <Grid item lg={1}>
                            <div style={{display: "flex", flexDirection: "row",alignItems: "center", height: "100%"}}>
                            <IconButton type="submit" style={{boxShadow: "3px", backgroundColor: 'green', color: '#fff'}}>
                                <Done/>
                            </IconButton>
                            </div>
                        </Grid>
                    </Grid>
                </Header>
                <Tabs  value={formCategory} onChange={onChangeFormCategory}>
                    <Tab label="Défunt(e)"></Tab>
                    <Tab label="Père du défunt(e)"></Tab>
                    <Tab label="Mère du défunt(e)"></Tab>
                    <Tab label="Epoux du défunt(e)"></Tab>
                    <Tab label="Déclarant"></Tab>
                </Tabs>
 {
                    formCategory === 0 && 
                    <div style={{padding: '20px'}}>
                        <TextField
                            label="Nom"
                            value={person.nom}
                            onChange={(e) => {
                                const personChange = Object.assign({}, person);
                                personChange.nom = e.target.value;
                                setPerson(personChange);
                            }}
                            className={classes.textField}
                            fullWidth={true}
                        />
                        <TextField
                            label="Prénom"
                            className={classes.textField}
                            fullWidth={true}
                            value={person.prenom}
                            onChange={(e) => {
                                const personChange = Object.assign({}, person);
                                personChange.prenom = e.target.value;
                                setPerson(personChange);
                            }}
                        />
                        <FormControl className={classes.formControl} fullWidth={true}>
                            <InputLabel id="demo-simple-select-label">Sexe</InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={person.sexe}
                              onChange={(e) => {
                                    const personChange = Object.assign({}, person);
                                    personChange.sexe = e.target.value;
                                    setPerson(personChange);
                              }}
                            >
                              <MenuItem value="masculin">Masculin</MenuItem>
                              <MenuItem value="feminin">Féminin</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            label="Date de naissance"
                            className={classes.textField}
                            type="date"
                            InputLabelProps={{
                                shrink: true
                            }}
                            value={person.date_naissance}
                            onChange={(e) => {
                                const personChange = Object.assign({}, person);
                                personChange.date_naissance = e.target.value;
                                setPerson(personChange);
                            }}
                        />
                        <TextField
                            label="Lieu de naissance"
                            className={classes.textField}
                            fullWidth={true}
                            value={person.lieu_naissance}
                            onChange={(e) => {
                                const personChange = Object.assign({}, person);
                                personChange.lieu_naissance = e.target.value;
                                setPerson(personChange);
                            }}
                        />
                        <TextField
                            label="Profession"
                            className={classes.textField}
                            fullWidth={true}
                            value={person.profession}
                            onChange={(e) => {
                                const personChange = Object.assign({}, person);
                                personChange.profession = e.target.value;
                                setPerson(personChange);
                            }}
                        />
                        <TextField
                            label="Ville"
                            className={classes.textField}
                            fullWidth={true}
                            value={person.ville}
                            onChange={(e) => {
                                const personChange = Object.assign({}, person);
                                personChange.ville = e.target.value;
                                setPerson(personChange);
                            }}
                        />
                        <TextField
                            label="Adresse"
                            className={classes.textField}
                            fullWidth={true}
                            value={person.adresse}
                            onChange={(e) => {
                                const personChange = Object.assign({}, person);
                                personChange.adresse = e.target.value;
                                setPerson(personChange);
                            }}
                        />
                    </div>
                }
                {
                    formCategory === 1 && 
                    <div style={{padding: '20px'}}>
                        <TextField
                            label="Nom"
                            className={classes.textField}
                            fullWidth={true}
                            value={pere.nom}
                            onChange={(e) => {
                                const pereChange = Object.assign({}, pere);
                                pereChange.nom = e.target.value;
                                setPere(pereChange);
                            }}
                        />
                        <TextField
                            label="Prénom"
                            className={classes.textField}
                            fullWidth={true}
                            value={pere.prenom}
                            onChange={(e) => {
                                const pereChange = Object.assign({}, pere);
                                pereChange.prenom = e.target.value;
                                setPere(pereChange);
                            }}
                        />
                        <FormControl className={classes.formControl} fullWidth={true}>
                            <InputLabel id="demo-simple-select-label">Sexe</InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={pere.sexe}
                              onChange={(e) => {
                                const pereChange = Object.assign({}, pere);
                                pereChange.sexe = e.target.value;
                                setPere(pereChange);
                              }}
                            >
                              <MenuItem value="masculin">Masculin</MenuItem>
                              <MenuItem value="feminin">Féminin</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            label="Date de naissance"
                            className={classes.textField}
                            type="date"
                            InputLabelProps={{
                                shrink: true
                            }}
                            value={pere.date_naissance}
                            onChange={(e) => {
                                const pereChange = Object.assign({}, pere);
                                pereChange.date_naissance = e.target.value;
                                setPere(pereChange);
                            }}
                        />
                        <TextField
                            label="Lieu de naissance"
                            className={classes.textField}
                            fullWidth={true}
                            value={pere.lieu_naissance}
                            onChange={(e) => {
                                const pereChange = Object.assign({}, pere);
                                pereChange.lieu_naissance = e.target.value;
                                setPere(pereChange);
                            }}
                        />
                        <TextField
                            label="Profession"
                            className={classes.textField}
                            fullWidth={true}
                            value={pere.profession}
                            onChange={(e) => {
                                const pereChange = Object.assign({}, pere);
                                pereChange.profession = e.target.value;
                                setPere(pereChange);
                            }}
                        />
                        <TextField
                            label="Ville"
                            className={classes.textField}
                            fullWidth={true}
                            value={pere.ville}
                            onChange={(e) => {
                                const pereChange = Object.assign({}, pere);
                                pereChange.ville = e.target.value;
                                setPere(pereChange);
                            }}
                        />
                        <TextField
                            label="Adresse"
                            className={classes.textField}
                            fullWidth={true}
                            value={pere.adresse}
                            onChange={(e) => {
                                const pereChange = Object.assign({}, pere);
                                pereChange.adresse = e.target.value;
                                setPere(pereChange);
                            }}
                        />
                    </div>
                }
                {
                    formCategory === 2 && 
                    <div style={{padding: '20px'}}>
                        <TextField
                            label="Nom"
                            className={classes.textField}
                            fullWidth={true}
                            value={mere.nom}
                            onChange={(e) => {
                                const mereChange = Object.assign({}, mere);
                                mereChange.nom = e.target.value;
                                setMere(mereChange);
                            }}
                        />
                        <TextField
                            label="Prénom"
                            className={classes.textField}
                            fullWidth={true}
                            value={mere.prenom}
                            onChange={(e) => {
                                const mereChange = Object.assign({}, mere);
                                mereChange.prenom = e.target.value;
                                setMere(mereChange);
                            }}
                        />
                        <FormControl className={classes.formControl} fullWidth={true}>
                            <InputLabel id="demo-simple-select-label">Sexe</InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={mere.sexe}
                            onChange={(e) => {
                                const mereChange = Object.assign({}, mere);
                                mereChange.sexe = e.target.value;
                                setMere(mereChange);
                            }}
                            >
                              <MenuItem value="masculin">Masculin</MenuItem>
                              <MenuItem value="feminin">Féminin</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            label="Date de naissance"
                            className={classes.textField}
                            type="date"
                            InputLabelProps={{
                                shrink: true
                            }}
                            value={mere.date_naissance}
                            onChange={(e) => {
                                const mereChange = Object.assign({}, mere);
                                mereChange.date_naissance = e.target.value;
                                setMere(mereChange);
                            }}
                        />
                        <TextField
                            label="Lieu de naissance"
                            className={classes.textField}
                            fullWidth={true}
                            value={mere.lieu_naissance}
                            onChange={(e) => {
                                const mereChange = Object.assign({}, mere);
                                mereChange.lieu_naissance = e.target.value;
                                setMere(mereChange);
                            }}
                        />
                        <TextField
                            label="Profession"
                            className={classes.textField}
                            fullWidth={true}
                            value={mere.profession}
                            onChange={(e) => {
                                const mereChange = Object.assign({}, mere);
                                mereChange.profession = e.target.value;
                                setMere(mereChange);
                            }}
                        />
                        <TextField
                            label="Ville"
                            className={classes.textField}
                            fullWidth={true}
                            value={mere.ville}
                            onChange={(e) => {
                                const mereChange = Object.assign({}, mere);
                                mereChange.ville = e.target.value;
                                setMere(mereChange);
                            }}
                        />
                        <TextField
                            label="Adresse"
                            className={classes.textField}
                            fullWidth={true}
                            value={mere.adresse}
                            onChange={(e) => {
                                const mereChange = Object.assign({}, mere);
                                mereChange.adresse = e.target.value;
                                setMere(mereChange);
                            }}
                        />
                    </div>
                }
                {
                    formCategory === 3 && 
                    <div style={{padding: '20px'}}>
                        <TextField
                            label="Nom"
                            className={classes.textField}
                            fullWidth={true}
                            value={epoux.nom}
                            onChange={(e) => {
                                const epouxChange = Object.assign({}, epoux);
                                epouxChange.nom = e.target.value;
                                setEpoux(epouxChange);
                            }}
                        />
                        <TextField
                            label="Prénom"
                            className={classes.textField}
                            fullWidth={true}
                            value={epoux.prenom}
                            onChange={(e) => {
                                const epouxChange = Object.assign({}, epoux);
                                epouxChange.prenom = e.target.value;
                                setEpoux(epouxChange);
                            }}
                        />
                        <FormControl className={classes.formControl} fullWidth={true}>
                            <InputLabel id="demo-simple-select-label">Sexe</InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={epoux.sexe}
                              onChange={(e) => {
                                    const epouxChange = Object.assign({}, epoux);
                                    epouxChange.sexe = e.target.value;
                                    setEpoux(epouxChange);
                              }}
                            >
                              <MenuItem value="masculin">Masculin</MenuItem>
                              <MenuItem value="feminin">Féminin</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            label="Date de naissance"
                            className={classes.textField}
                            type="date"
                            value={epoux.date_naissance}
                            InputLabelProps={{
                                shrink: true
                            }}
                            onChange={(e) => {
                                    const epouxChange = Object.assign({}, epoux);
                                    epouxChange.date_naissance = e.target.value;
                                    setEpoux(epouxChange);
                            }}
                        />
                        <TextField
                            label="Lieu de naissance"
                            className={classes.textField}
                            fullWidth={true}
                            value={epoux.lieu_naissance}
                            onChange={(e) => {
                                    const epouxChange = Object.assign({}, epoux);
                                    epouxChange.lieu_naissance = e.target.value;
                                    setEpoux(epouxChange);
                            }}
                        />
                        <TextField
                            label="Profession"
                            className={classes.textField}
                            fullWidth={true}
                            value={epoux.profession}
                            onChange={(e) => {
                                    const epouxChange = Object.assign({}, epoux);
                                    epouxChange.profession = e.target.value;
                                    setEpoux(epouxChange);
                            }}
                        />
                        <TextField
                            label="Ville"
                            className={classes.textField}
                            fullWidth={true}
                            value={epoux.ville}
                            onChange={(e) => {
                                    const epouxChange = Object.assign({}, epoux);
                                    epouxChange.ville = e.target.value;
                                    setEpoux(epouxChange);
                            }}
                        />
                        <TextField
                            label="Adresse"
                            className={classes.textField}
                            fullWidth={true}
                            value={epoux.adresse}
                            onChange={(e) => {
                                    const epouxChange = Object.assign({}, epoux);
                                    epouxChange.adresse = e.target.value;
                                    setEpoux(epouxChange);
                            }}
                        />
                    </div>
                }
                {
                    formCategory === 4 && 
                    <div style={{padding: '20px'}}>
                        <TextField
                            label="Nom"
                            className={classes.textField}
                            fullWidth={true}
                            value={declarant.nom}
                            onChange={(e) => {
                                    const declarantChange = Object.assign({}, declarant);
                                    declarantChange.nom = e.target.value;
                                    setDeclarant(declarantChange);
                            }}
                        />
                        <TextField
                            label="Prénom"
                            className={classes.textField}
                            fullWidth={true}
                            value={declarant.prenom}
                            onChange={(e) => {
                                    const declarantChange = Object.assign({}, declarant);
                                    declarantChange.prenom = e.target.value;
                                    setDeclarant(declarantChange);
                            }}
                        />
                        <FormControl className={classes.formControl} fullWidth={true}>
                            <InputLabel id="demo-simple-select-label">Sexe</InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={declarant.sexe}
                              onChange={(e) => {
                                    const declarantChange = Object.assign({}, declarant);
                                    declarantChange.sexe = e.target.value;
                                    setDeclarant(declarantChange);
                              }}
                            >
                              <MenuItem value="masculin">Masculin</MenuItem>
                              <MenuItem value="feminin">Féminin</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            label="Date de naissance"
                            type="date"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true
                            }}
                            value={declarant.date_naissance}
                            onChange={(e) => {
                                    const declarantChange = Object.assign({}, declarant);
                                    declarantChange.date_naissance = e.target.value;
                                    setDeclarant(declarantChange);
                            }}
                        />
                        <TextField
                            label="Lieu de naissance"
                            className={classes.textField}
                            fullWidth={true}
                            value={declarant.lieu_naissance}
                            onChange={(e) => {
                                    const declarantChange = Object.assign({}, declarant);
                                    declarantChange.lieu_naissance = e.target.value;
                                    setDeclarant(declarantChange);
                            }}
                        />
                        <TextField
                            label="Profession"
                            className={classes.textField}
                            fullWidth={true}
                            value={declarant.profession}
                            onChange={(e) => {
                                    const declarantChange = Object.assign({}, declarant);
                                    declarantChange.profession = e.target.value;
                                    setDeclarant(declarantChange);
                            }}
                        />
                        <TextField
                            label="Ville"
                            className={classes.textField}
                            fullWidth={true}
                            value={declarant.ville}
                            onChange={(e) => {
                                    const declarantChange = Object.assign({}, declarant);
                                    declarantChange.ville = e.target.value;
                                    setDeclarant(declarantChange);
                            }}
                        />
                        <TextField
                            label="Adresse"
                            className={classes.textField}
                            fullWidth={true}
                            value={declarant.adresse}
                            onChange={(e) => {
                                    const declarantChange = Object.assign({}, declarant);
                                    declarantChange.adresse = e.target.value;
                                    setDeclarant(declarantChange);
                            }}
                        />
                    </div>
                }
                <Snackbar autoHideDuration={6000} open={openMessage}>
                    <SnackbarContent style={{backgroundColor: backgroundMessage, color: '#fff'}} message={message} action={[
                        <Button onClick={()=>(setOpenMessage(false))} color="inherit" key='dismiss'>
                            <Close/>
                        </Button>
                    ]}>
                    </SnackbarContent>
                </Snackbar>
            <CssBaseline />
            </form>
        </ThemeProvider>
    );
}
