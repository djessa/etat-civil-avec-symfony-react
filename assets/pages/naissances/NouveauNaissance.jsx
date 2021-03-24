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
import PersonIcon from '@material-ui/icons/Person';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {Close, Done} from '@material-ui/icons';
import  { jours, mois, dateDuJour} from  '../../variables/const';
import axios from 'axios';


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



export default function NouveauNaissance () {
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
    const [pere, setPere] = useState({
        nom: '',
        prenom: '',
        date_naissance: '',
        lieu_naissance: '',
        profession: '',
        ville: '',
        adresse: ''
    })
    const [mere, setMere] = useState({
        nom: '',
        prenom: '',
        date_naissance: '',
        lieu_naissance: '',
        profession: '',
        ville: '',
        adresse: ''
    })
    const [declarant, setDeclarant] = useState({
        nom: '',
        prenom: '',
        sexe: '',
        date_naissance: '',
        lieu_naissance: '',
        profession: '',
        ville: '',
        adresse: ''
    })
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
                                        input={<Input id="multi" />}
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
                    {formCategory === 1 && (
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
                                    <TextField
                                        label="Date de naissance"
                                        type="date"
                                        className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                        fullWidth={true}
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
                    )}
                {formCategory === 2 && (
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
                                    <TextField
                                        label="Date de naissance"
                                        type="date"
                                        className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                        fullWidth={true}
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

                )}
                {formCategory === 3 && (
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
                                    <FormControl className={classes.formControl}>
                                        <InputLabel htmlFor="multi">Sexe</InputLabel>
                                        <Select
                                            value={declarant.sexe}
                                            onChange={(e) => {
                                                const declarantChange = Object.assign({}, declarant);
                                                declarantChange.sexe = e.target.value;
                                                setDeclarant(declarantChange);
                                            }}
                                            input={<Input id="multi" />}
                                        >
                                            <MenuItem value="masculin">
                                                Masculin
                                            </MenuItem>
                                            <MenuItem value="feminin">
                                                Féminin
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                    <TextField
                                        label="Date de naissance"
                                        type="date"
                                        className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                        fullWidth={true}
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
                )}
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
