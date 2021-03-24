import React, { Component, useState } from 'react'
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
    TextField,
    Button,
    IconButton,
    Tabs, Tab
} from '@material-ui/core';
import axios from 'axios';
import {Close, Done} from '@material-ui/icons';
import Header from "../../components/Header";
import SideMenu from "../../components/SideMenu";
import  { jours, mois, dateDuJour, personne, personne_to_en} from  '../../variables/const';
import PersonForm from '../../components/PersonForm';
import MessageDialog from '../../components/MessageDialog';

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

export default function NouveauDivorce () {
    const [openMessage, setOpenMessage] = useState(false);
    const [backgroundMessage, setBackgroundMessage] = useState('');
    const [message, setMessage] = useState('');
    const classes = useStyles();
    const [decision_number, setDecisionNumber] = useState('');
    const [date_decision, setDateDecision] = useState('');
    const [man, setMan] = useState(Object.assign({}, personne));
    const [woman, setWoman] = useState(Object.assign({}, personne));
    const [formCategory, setFormCategory] = useState(0);
    const onChangeFormCategory = (e, value)  => {
        setFormCategory(value);
    }
    const save = () => {
        const data = {
            decision_number,
            date_decision,
            man : personne_to_en(man),
            woman: personne_to_en(woman)
        };
       axios.post('/divorce/new', data)
             .then((response) => {
                 setBackgroundMessage('green');
                 setOpenMessage(true);
                 setMessage(response.data.message);
                 setDecisionNumber('');
                 setDateDecision('');
                 setMan(Object.assign({}, personne));
                 setWoman(Object.assign({}, personne))
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
                                    label="Date d'établissement"
                                    className={classes.textField}
                                    InputProps={{ readOnly: true }}
                                    fullWidth={true}
                                />
                            </div>
                        </Grid>
                        <Grid item lg={3}>
                            <div className="grid-menu">
                                <TextField
                                    value={decision_number}
                                    onChange={(e) => setDecisionNumber(e.target.value)}
                                    label="Numéro du décision"
                                    className={classes.textField}
                                    fullWidth={true}
                                />  
                            </div>        
                        </Grid>
                        <Grid item lg={3}>
                            <div className="grid-menu">
                                <TextField
                                    label="Date de décision"
                                    onChange={(e) => setDateDecision(e.target.value)}
                                    className={classes.textField}
                                    type="date"
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    fullWidth={true}
                                />
                            </div>
                        </Grid>
                        <Grid item lg={1}>
                            <div style={{display: "flex", flexDirection: "row",alignItems: "flex-end", height: "100%"}}>
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
                </Tabs>
                { formCategory === 0 &&  <PersonForm objet={man} fonction={setMan} /> }
                { formCategory === 1 &&  <PersonForm objet={woman} fonction={setWoman} /> }
                <MessageDialog bg={backgroundMessage} message={message} open={openMessage} toggle={setOpenMessage} />
            <CssBaseline />
            </form>
        </ThemeProvider>
    );
}
