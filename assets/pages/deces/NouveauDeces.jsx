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
import  { jours, mois, dateDuJour} from  '../../variables/const';
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
    const [lieu, setLieu] = useState('');
    const [man, setMan] = useState({
        nom: '',
        prenom: '',
        date_naissance: '',
        lieu_naissance: '',
        sexe: '',
        profession: '',
        ville: '',
        adresse: ''
    });
    const [woman, setWoman] = useState({
        nom: '',
        prenom: '',
        date_naissance: '',
        lieu_naissance: '',
        sexe: '',
        profession: '',
        ville: '',
        adresse: ''
    });
    const [witness_man, setWitness_man] = useState({
        nom: '',
        prenom: '',
        date_naissance: '',
        lieu_naissance: '',
        sexe: '',
        profession: '',
        ville: '',
        adresse: ''
    });
    const [witness_woman, setWitness_woman] = useState({
        nom: '',
        prenom: '',
        date_naissance: '',
        lieu_naissance: '',
        sexe: '',
        profession: '',
        ville: '',
        adresse: ''
    });

    const [formCategory, setFormCategory] = useState(0);
    const onChangeFormCategory = (e, value)  => {
        setFormCategory(value);
    }
    const save = () => {
        const data = {
            lieu: lieu,
            man : {
                first_name: enfant.nom, 
                last_name: enfant.prenom,
                birthdate: enfant.date_naissance + ' ' + enfant.heure_naissance,
                sexe: enfant.sexe,
                birthplace: enfant.lieu_naissance
            },
            father: {
                first_name: pere.nom, 
                last_name: pere.prenom,
                birthdate: pere.date_naissance,
                birthplace: pere.lieu_naissance,
                profession: pere.profession,
                city: pere.ville,
                address: pere.adresse
            },
            mother: {
                first_name: mere.nom, 
                last_name: mere.prenom,
                birthdate: mere.date_naissance,
                birthplace: mere.lieu_naissance,
                profession: mere.profession,
                city: mere.ville,
                address: mere.adresse
            },
            declarant: {
                first_name: declarant.nom, 
                last_name: declarant.prenom,
                sexe: declarant.sexe,
                birthdate: declarant.date_naissance,
                birthplace: declarant.lieu_naissance,
                profession: declarant.profession,
                city: declarant.ville,
                address: declarant.adresse
            }
        };
       axios.post('/birth/new', data)
             .then((response) => {
                 setBackgroundMessage('green');
                 setOpenMessage(true);
                 setMessage(response.data.message);
                 setType('');
                 setNumeroJugement('');
                 setEnfant({
                     nom: '',
                     prenom: '',
                     date_naissance: '',
                     heure_naissance: '',
                     lieu_naissance: '',
                     sexe: '',
                 });
                 setPere({
                     nom: '',
                     prenom: '',
                     date_naissance: '',
                     lieu_naissance: '',
                     profession: '',
                     ville: '',
                     adresse: ''
                 })
                 setMere({
                     nom: '',
                     prenom: '',
                     date_naissance: '',
                     lieu_naissance: '',
                     profession: '',
                     ville: '',
                     adresse: ''
                 })
                 setDeclarant({
                     nom: '',
                     prenom: '',
                     sexe: '',
                     date_naissance: '',
                     lieu_naissance: '',
                     profession: '',
                     ville: '',
                     adresse: ''
                 })
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
