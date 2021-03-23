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

export default function NouveauMariage () {

    const [openMessage, setOpenMessage] = useState(false);
    const [backgroundMessage, setBackgroundMessage] = useState('');
    const [message, setMessage] = useState('');
    const classes = useStyles();
    const [lieu, setLieu] = useState('');
    const [regime, setRegime] = useState('');
    const [man, setMan] = useState(Object.assign({}, personne));
    const [woman, setWoman] = useState(Object.assign({}, personne));
    const [witness_man, setWitness_man] = useState(Object.assign({}, personne));
    const [witness_woman, setWitness_woman] = useState(Object.assign({}, personne));

    const [formCategory, setFormCategory] = useState(0);
    const onChangeFormCategory = (e, value)  => {
        setFormCategory(value);
    }
    const save = () => {
        const data = {
            lieu: lieu,
            regime: regime,
            man : personne_to_en(man),
            woman : personne_to_en(woman),
            witness_man: personne_to_en(witness_man),
            witness_woman: personne_to_en(witness_woman)
        };
       axios.post('/marriage/new', data)
             .then((response) => {
                 setBackgroundMessage('green');
                 setOpenMessage(true);
                 setMessage(response.data.message);
                 setLieu('');
                 setMan(Object.assign({}, personne));
                 setWoman(Object.assign({}, personne));
                 setWitness_man(Object.assign({}, personne))
                 setWitness_woman(Object.assign({}, personne))
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
                            <TextField
                                value={dateDuJour()}
                                label="Date de déclaration"
                                className={classes.textField}
                                InputProps={{ readOnly: true }}
                                fullWidth={true}
                            />
                        </Grid>
                        <Grid item lg={1}></Grid>
                        <Grid item lg={2}>
                            <TextField
                                label="Lieu de mariage"
                                value={lieu}
                                onChange={(e)=> setLieu(e.target.value)}
                                className={classes.textField}
                                fullWidth={true}
                            />
                        </Grid>
                        <Grid lg={3}>
                             <FormControl className={classes.formControl} fullWidth={true}>
                                <InputLabel id="demo-simple-select-label">Régime matrimoniale</InputLabel>
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  value={regime}
                                  onChange={(e) => setRegime(e.target.value)}
                                >
                              <MenuItem value="communs">Séparation des biens</MenuItem>
                              <MenuItem value="separation">Biens communs</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item lg={1}></Grid>
                        <Grid item lg={1}>
                            <div style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", height: "100%"}}>
                            <IconButton type="submit" style={{boxShadow: "3px", backgroundColor: 'green', color: '#fff'}}>
                                <Done/>
                            </IconButton>
                            </div>
                        </Grid>
                    </Grid>
                </Header>
                <Tabs  value={formCategory} onChange={onChangeFormCategory}>
                    <Tab label="Epoux"></Tab>
                    <Tab label="Epouse"></Tab>
                    <Tab label="Temoin 1"></Tab>
                    <Tab label="Temoin 2"></Tab>
                </Tabs>
                {
                    formCategory === 0 && 
                    <div style={{padding: '20px'}}>
                        <TextField
                            label="Nom"
                            className={classes.textField}
                            fullWidth={true}
                            value={man.nom}
                            onChange={(e) => {
                                const manChange = Object.assign({}, man);
                                manChange.nom = e.target.value;
                                setMan(manChange);
                            }}
                        />
                        <TextField
                            label="Prénom"
                            className={classes.textField}
                            value={man.prenom}
                            onChange={(e) => {
                                const manChange = Object.assign({}, man);
                                manChange.prenom = e.target.value;
                                setMan(manChange);
                            }}
                            fullWidth={true}
                        />
                        <FormControl className={classes.formControl} fullWidth={true}>
                            <InputLabel id="demo-simple-select-label">Sexe</InputLabel>
                            <Select
                              value={man.sexe}
                              onChange={(e) => {
                                  const manChange = Object.assign({}, man);
                                  manChange.sexe = e.target.value;
                                  setMan(manChange);
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
                            value={man.date_naissance}
                            type="date"
                            InputLabelProps={{
                                shrink: true
                              }}
                            onChange={(e) => {
                                const manChange = Object.assign({}, man);
                                manChange.date_naissance = e.target.value;
                                setMan(manChange);
                            }}                
                        />
                        <TextField
                            label="Lieu de naissance"
                            className={classes.textField}
                            fullWidth={true}
                            value={man.lieu_naissance}
                            onChange={(e) => {
                                const manChange = Object.assign({}, man);
                                manChange.lieu_naissance = e.target.value;
                                setMan(manChange);
                            }} 
                        />
                        <TextField
                            label="Profession"
                            className={classes.textField}
                            fullWidth={true}
                            value={man.profession}
                            onChange={(e) => {
                                const manChange = Object.assign({}, man);
                                manChange.profession = e.target.value;
                                setMan(manChange);
                            }} 
                        />
                        <TextField
                            label="Ville"
                            className={classes.textField}
                            fullWidth={true}
                            value={man.ville}
                            onChange={(e) => {
                                const manChange = Object.assign({}, man);
                                manChange.ville = e.target.value;
                                setMan(manChange);
                            }} 
                        />
                        <TextField
                            label="Adresse"
                            className={classes.textField}
                            fullWidth={true}
                            value={man.adresse}
                            onChange={(e) => {
                                const manChange = Object.assign({}, man);
                                manChange.adresse = e.target.value;
                                setMan(manChange);
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
                            value={woman.nom}
                            onChange={(e) => {
                                const womanChange = Object.assign({}, woman);
                                womanChange.nom = e.target.value;
                                setWoman(womanChange);
                            }} 
                        />
                        <TextField
                            label="Prénom"
                            className={classes.textField}
                            fullWidth={true}
                            value={woman.prenom}
                            onChange={(e) => {
                                const womanChange = Object.assign({}, woman);
                                womanChange.prenom = e.target.value;
                                setWoman(womanChange);
                            }} 
                        />
                        <FormControl className={classes.formControl} fullWidth={true}>
                            <InputLabel id="demo-simple-select-label">Sexe</InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={woman.sexe}
                              onChange={(e) => {
                                  const womanChange = Object.assign({}, woman);
                                  womanChange.sexe = e.target.value;
                                  setWoman(womanChange);
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
                            value={woman.date_naissance}
                            type="date"
                            InputLabelProps={{
                                shrink: true
                            }}
                            onChange={(e) => {
                                const womanChange = Object.assign({}, woman);
                                womanChange.date_naissance = e.target.value;
                                setWoman(womanChange);
                            }} 
                        />
                        <TextField
                            label="Lieu de naissance"
                            className={classes.textField}
                            fullWidth={true}
                            value={woman.lieu_naissance}
                            onChange={(e) => {
                                const womanChange = Object.assign({}, woman);
                                womanChange.lieu_naissance = e.target.value;
                                setWoman(womanChange);
                            }} 
                        />
                        <TextField
                            label="Profession"
                            className={classes.textField}
                            fullWidth={true}
                            value={woman.profession}
                            onChange={(e) => {
                                const womanChange = Object.assign({}, woman);
                                womanChange.profession = e.target.value;
                                setWoman(womanChange);
                            }} 
                        />
                        <TextField
                            label="Ville"
                            className={classes.textField}
                            fullWidth={true}
                            value={woman.ville}
                            onChange={(e) => {
                                const womanChange = Object.assign({}, woman);
                                womanChange.ville = e.target.value;
                                setWoman(womanChange);
                            }} 
                        />
                        <TextField
                            label="Adresse"
                            className={classes.textField}
                            fullWidth={true}
                            value={woman.adresse}
                            onChange={(e) => {
                                const womanChange = Object.assign({}, woman);
                                womanChange.adresse = e.target.value;
                                setWoman(womanChange);
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
                            value={witness_man.nom}
                            onChange={(e) => {
                                const witnessManChange = Object.assign({}, witness_man);
                                witnessManChange.nom = e.target.value;
                                setWitness_man(witnessManChange);
                            }} 
                        />
                        <TextField
                            label="Prénom"
                            className={classes.textField}
                            fullWidth={true}
                            value={witness_man.prenom}
                            onChange={(e) => {
                                const witnessManChange = Object.assign({}, witness_man);
                                witnessManChange.prenom = e.target.value;
                                setWitness_man(witnessManChange);
                            }} 
                        />
                        <FormControl className={classes.formControl} fullWidth={true}>
                            <InputLabel id="demo-simple-select-label">Sexe</InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={witness_man.sexe}
                              onChange={(e) => {
                                  const witnessManChange = Object.assign({}, witness_man);
                                  witnessManChange.sexe = e.target.value;
                                  setWitness_man(witnessManChange);
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
                            type="date"
                            InputLabelProps={{
                                shrink: true
                            }}
                            value={witness_man.date_naissance}
                            onChange={(e) => {
                                const witnessManChange = Object.assign({}, witness_man);
                                witnessManChange.date_naissance = e.target.value;
                                setWitness_man(witnessManChange);
                            }} 
                        />
                        <TextField
                            label="Lieu de naissance"
                            className={classes.textField}
                            fullWidth={true}
                            value={witness_man.lieu_naissance}
                            onChange={(e) => {
                                const witnessManChange = Object.assign({}, witness_man);
                                witnessManChange.lieu_naissance = e.target.value;
                                setWitness_man(witnessManChange);
                            }} 
                        />
                        <TextField
                            label="Profession"
                            className={classes.textField}
                            fullWidth={true}
                            value={witness_man.profession}
                            onChange={(e) => {
                                const witnessManChange = Object.assign({}, witness_man);
                                witnessManChange.profession = e.target.value;
                                setWitness_man(witnessManChange);
                            }} 
                        />
                        <TextField
                            label="Ville"
                            className={classes.textField}
                            fullWidth={true}
                            value={witness_man.ville}
                            onChange={(e) => {
                                const witnessManChange = Object.assign({}, witness_man);
                                witnessManChange.ville = e.target.value;
                                setWitness_man(witnessManChange);
                            }} 
                        />
                        <TextField
                            label="Adresse"
                            className={classes.textField}
                            fullWidth={true}
                            value={witness_man.adresse}
                            onChange={(e) => {
                                const witnessManChange = Object.assign({}, witness_man);
                                witnessManChange.adresse = e.target.value;
                                setWitness_man(witnessManChange);
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
                            value={witness_woman.nom}
                            onChange={(e) => {
                                const witnessWomanChange = Object.assign({}, witness_woman);
                                witnessWomanChange.nom = e.target.value;
                                setWitness_woman(witnessWomanChange);
                            }} 
                        />
                        <TextField
                            label="Prénom"
                            className={classes.textField}
                            fullWidth={true}
                            value={witness_woman.prenom}
                            onChange={(e) => {
                                const witnessWomanChange = Object.assign({}, witness_woman);
                                witnessWomanChange.prenom = e.target.value;
                                setWitness_woman(witnessWomanChange);
                            }} 
                        />
                        <FormControl className={classes.formControl} fullWidth={true}>
                            <InputLabel id="demo-simple-select-label">Sexe</InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={witness_woman.sexe}
                              onChange={(e) => {
                                  const witnessWomanChange = Object.assign({}, witness_woman);
                                  witnessWomanChange.sexe = e.target.value;
                                  setWitness_woman(witnessWomanChange);
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
                            type="date"
                            InputLabelProps={{
                                shrink: true
                            }}
                            value={witness_woman.date_naissance}
                            onChange={(e) => {
                                const witnessWomanChange = Object.assign({}, witness_woman);
                                witnessWomanChange.date_naissance = e.target.value;
                                setWitness_woman(witnessWomanChange);
                            }} 
                        />
                        <TextField
                            label="Lieu de naissance"
                            className={classes.textField}
                            fullWidth={true}
                            value={witness_woman.lieu_naissance}
                            onChange={(e) => {
                                const witnessWomanChange = Object.assign({}, witness_woman);
                                witnessWomanChange.lieu_naissance = e.target.value;
                                setWitness_woman(witnessWomanChange);
                            }} 
                        />
                        <TextField
                            label="Profession"
                            className={classes.textField}
                            fullWidth={true}
                            value={witness_woman.profession}
                            onChange={(e) => {
                                const witnessWomanChange = Object.assign({}, witness_woman);
                                witnessWomanChange.profession = e.target.value;
                                setWitness_woman(witnessWomanChange);
                            }} 
                        />
                        <TextField
                            label="Ville"
                            className={classes.textField}
                            fullWidth={true}
                            value={witness_woman.ville}
                            onChange={(e) => {
                                const witnessWomanChange = Object.assign({}, witness_woman);
                                witnessWomanChange.ville = e.target.value;
                                setWitness_woman(witnessWomanChange);
                            }} 
                        />
                        <TextField
                            label="Adresse"
                            className={classes.textField}
                            fullWidth={true}
                            value={witness_woman.adresse}
                            onChange={(e) => {
                                const witnessWomanChange = Object.assign({}, witness_woman);
                                witnessWomanChange.adresse = e.target.value;
                                setWitness_woman(witnessWomanChange);
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
