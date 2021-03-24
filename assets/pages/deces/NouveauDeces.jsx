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
    TextField,
    Paper,
    Button,
    IconButton,
    Tabs, Tab
} from '@material-ui/core';
import Header from "../../components/Header";
import {Close, Done} from '@material-ui/icons';
import axios from 'axios';
import  { jours, mois, dateDuJour, personne, personne_to_en} from  '../../variables/const';
import PersonForm from '../../components/PersonForm';
import MessageDialog from '../../components/MessageDialog';




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
                        <Grid item lg={3}>
                            <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-start"}}>
                                <TextField
                                    value={dateDuJour()}
                                    label="Date de déclaration"
                                    className={classes.textField}
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
                            <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center", height: "100%"}}>
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
                { formCategory === 0 && <PersonForm objet={person} fonction={setPerson} /> }
                { formCategory === 1 && <PersonForm objet={pere} fonction={setPere} /> }
                { formCategory === 2 && <PersonForm objet={mere} fonction={setMere} /> }
                { formCategory === 3 && <PersonForm objet={epoux} fonction={setEpoux} /> }
                { formCategory === 4 && <PersonForm objet={declarant} fonction={setDeclarant} /> }
                <MessageDialog bg={backgroundMessage} message={message} open={openMessage} toggle={setOpenMessage} />
            <CssBaseline />
            </form>
        </ThemeProvider>
    );
}
