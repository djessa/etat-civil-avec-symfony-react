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
import {Close, Done} from '@material-ui/icons';
import axios from 'axios';
import Header from "../../components/Header";
import SideMenu from "../../components/SideMenu";
import  { jours, mois, dateDuJour, personne_to_en, personne} from  '../../variables/const';
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


const NouveauNaissance = () => {
    const [openMessage, setOpenMessage] = useState(false);
    const [backgroundMessage, setBackgroundMessage] = useState('');
    const [message, setMessage] = useState('');
    const classes = useStyles();
    const [type, setType] = useState('');
    const [numeroJugement, setNumeroJugement] = useState('');
    const [enfant, setEnfant] = useState({
        nom: '',
        prenom: '',
        date_naissance: '',
        heure_naissance: '',
        lieu_naissance: '',
        sexe: '',
    });
    const [pere, setPere] = useState(Object.assign({}, personne));
    const [mere, setMere] = useState(Object.assign({}, personne));
    const [declarant, setDeclarant] = useState(Object.assign({}, personne));
    const onChangeType = e => {
        setNumeroJugement('')
        const erreur = errors.slice();
        erreur.numero = false
        erreur.textNumero = ''
        setErrors(erreur);
        setType(e.target.value);

    };

    const [errors, setErrors] = useState([
        {numero: false, textNumero: ''}
    ]);

    const handleChangeNumero = (e) => {
        const erreur = errors.slice();
        if(Number.isNaN(parseInt(e.target.value))) {
            erreur.numero = true
            erreur.textNumero = 'Saisissez un numéro valide'
        } else {
            erreur.numero = false
            erreur.textNumero = ''
        }
        setErrors(erreur);
    }
    const [formCategory, setFormCategory] = useState(0);
    const onChangeFormCategory = (e, value)  => {
        setFormCategory(value);
    }
    const save = () => {
        const data = {
            type_declaration: type,
            judgment_number: numeroJugement,
            person : {
                first_name: enfant.nom, 
                last_name: enfant.prenom,
                birthdate: enfant.date_naissance + ' ' + enfant.heure_naissance,
                sexe: enfant.sexe,
                birthplace: enfant.lieu_naissance
            },
            father: personne_to_en(pere),
            mother: personne_to_en(mere),
            declarant: personne_to_en(declarant)
        };
       axios.post('/birth/new', data)
             .then((response) => {
                 setBackgroundMessage('green');
                 setOpenMessage(true);
                 setMessage(response.data.message);
                 setType('');
                 setNumeroJugement('');
                 setEnfant(Object.assign({}, personne));
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
                            <div className="grid-menu">
                                <TextField
                                    value={dateDuJour()}
                                    label="Date de déclaration"
                                    className={classes.textField}
                                />
                            </div>
                        </Grid>
                        <Grid item lg={2}>
                            <div>
                                <FormControl className={classes.formControl} fullWidth={true}>
                                    <InputLabel id="demo-simple-select-label">Type de déclaration</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={type}
                                    onChange={onChangeType}
                                    >
                                    <MenuItem value={'normal'}>Normal</MenuItem>
                                    <MenuItem value={'jugement'}>Jugement</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </Grid>
                         {
                        (type === 'jugement')
                        ?
                        <>
                        <Grid item lg={3}>
                            <div className="grid-menu">
                                <TextField
                                    value={numeroJugement}
                                    onChange={(e) => setNumeroJugement(e.target.value)}
                                    onKeyUp={handleChangeNumero}
                                    label="Numéro du jugement"
                                    className={classes.textField}
                                    error={errors.numero}
                                    helperText={errors.textNumero}
                                />
                            </div>
                        </Grid>
                        <Grid item lg={3}>
                            <div className="grid-menu">
                                <TextField
                                    style={{marginLeft: '5px'}}
                                    label="Date du jugement"
                                    className={classes.textField}
                                    type="date"
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                />
                            </div>
                        </Grid>
                        </>
                          :
                          <Grid item lg={6}></Grid>
                        }
                        <Grid item lg={1}>
                            <div style={{display: "flex", flexDirection: "row", justifyContent: 'flex-end', alignItems: "center", height: "100%"}}>
                            <IconButton type="submit" style={{boxShadow: "3px", backgroundColor: 'green', color: '#fff'}}>
                                <Done/>
                            </IconButton>
                            </div>
                        </Grid>
                    </Grid>
                </Header>
                <Tabs  value={formCategory} onChange={onChangeFormCategory}>
                    <Tab label="Enfant"></Tab>
                    <Tab label="Père"></Tab>
                    <Tab label="Mère"></Tab>
                    <Tab label="Déclarant"></Tab>
                </Tabs>
                {formCategory === 0 && (
                    <div style={{padding: '20px'}}>
                        <TextField
                            onChange={(e) => {
                                const enfantChange = Object.assign({}, enfant);
                                enfantChange.nom = e.target.value;
                                setEnfant(enfantChange);
                                }
                            }
                            value={enfant.nom}
                            label="Nom" className={classes.textField} fullWidth={true}
                        />
                        <TextField
                            label="Prénom"
                            className={classes.textField}
                            fullWidth={true}
                            error={false}
                            helperText=""
                            value={enfant.prenom}
                            onChange={(e) => {
                                const enfantChange = Object.assign({}, enfant);
                                enfantChange.prenom = e.target.value;
                                setEnfant(enfantChange);
                                }
                          }
                        />
                        <TextField
                            label="Date de naissance"
                            type="date"
                            className={classes.textField}
                            InputLabelProps={{
                              shrink: true
                            }}
                            fullWidth={true}
                            value={enfant.date_naissance}
                            onChange={(e) => {
                                const enfantChange = Object.assign({}, enfant);
                                enfantChange.date_naissance = e.target.value;
                                setEnfant(enfantChange);
                              }
                            }
                        />
                        <TextField
                            label="Heure de naissance"
                            type="time"
                            className={classes.textField}
                            style= {{marginRight: '10px'}}
                                InputLabelProps={{
                                  shrink: true
                                }}
                            fullWidth={true}
                            value={enfant.heure_naissance}
                            onChange={(e) => {
                                        const enfantChange = Object.assign({}, enfant);
                                        enfantChange.heure_naissance = e.target.value;
                                        setEnfant(enfantChange);
                            }}
                        />

                        <TextField
                                    value={enfant.lieu_naissance}
                                    onChange={(e) => {
                                        const enfantChange = Object.assign({}, enfant);
                                        enfantChange.lieu_naissance = e.target.value;
                                        setEnfant(enfantChange);
                                    }}
                                    label="Lieu de naissance"
                                    className={classes.textField}
                                    fullWidth={true}
                        />
                        <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="multi">Sexe</InputLabel>
                                    <Select
                                        value={enfant.sexe}
                                        onChange={(e) => {
                                            const enfantChange = Object.assign({}, enfant);
                                            enfantChange.sexe = e.target.value;
                                            setEnfant(enfantChange);
                                        }}
                                    >
                                        <MenuItem value="masculin">
                                            Masculin
                                        </MenuItem>
                                        <MenuItem value="feminin">
                                            Féminin
                                        </MenuItem>
                                    </Select>
                        </FormControl>
                    </div>
                )}
                { formCategory === 1 && <PersonForm objet={pere} fonction={setPere} /> }
                { formCategory === 2 && <PersonForm objet={mere} fonction={setMere} /> }
                {formCategory === 3 && <PersonForm objet={declarant} fonction={setDeclarant} />}
            <MessageDialog message={message} toggle={setOpenMessage} open={openMessage} bg={backgroundMessage} />
            <CssBaseline />
            </form>
        </ThemeProvider>
    );
}

export default NouveauNaissance;
