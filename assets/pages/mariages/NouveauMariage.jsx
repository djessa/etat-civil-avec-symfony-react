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
import PersonForm from '../../components/PersonForm';

const useStyles = makeStyles((theme) => ({
    appMain: {
      paddingLeft: '200px',
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
                        <Grid item lg={3}>
                            <div className="grid-menu">
                                <TextField
                                    value={dateDuJour()}
                                    label="Date de déclaration"
                                    className={classes.textField}
                                    fullWidth={true}
                                />
                            </div>
                        </Grid>
                        <Grid item lg={3}>
                            <div className="grid-menu">
                                <TextField
                                    label="Lieu de mariage"
                                    value={lieu}
                                    onChange={(e)=> setLieu(e.target.value)}
                                    className={classes.textField}
                                    fullWidth={true}
                                />
                            </div>
                        </Grid>
                        <Grid lg={3}>
                            <div className="grid-menu">
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
                            </div>
                        </Grid>
                        <Grid item lg={2}>
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
                    <PersonForm objet={man} fonction={setMan} />
                }
                {
                    formCategory === 1 && 
                    <PersonForm objet={woman} fonction={setWoman} />
                }
                {
                    formCategory === 2 && 
                    <PersonForm objet={witness_man} fonction={setWitness_man} />
                }
                {
                    formCategory === 3 && 
                    <PersonForm objet={witness_woman} fonction={setWitness_woman} />
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
