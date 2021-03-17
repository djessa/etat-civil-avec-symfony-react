import React, { Component, useState } from 'react'
import SideMenu from "../../components/SideMenu";
import { makeStyles, CssBaseline, createMuiTheme, ThemeProvider, Grid, Select, MenuItem, FormControl, InputLabel, Input, TextField, Paper, Button, IconButton } from '@material-ui/core';
import Header from "../../components/Header";
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Done } from '@material-ui/icons';
import  {useStyles, theme, jours, mois, dateDuJour} from  '../../variables/const';
import axios from 'axios';

export default function NouveauNaissance () {
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
    })
    const [mere, setMere] = useState({
        nom: '',
        prenom: '',
        date_naissance: '',
        lieu_naissance: '',
        profession: '',
    })
    const [declarant, setDeclarant] = useState({
        nom: '',
        prenom: '',
        date_naissance: '',
        profession: '',
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

    const save = () => {
        const data = {type, numeroJugement, enfant, pere, mere, declarant};
        axios.post('/birth/new', data)
             .then((response) => {
                 console.log(response)
             })
             .then((error) => {
                 console.log(error)
             });
    }
    return (
        <ThemeProvider theme={theme}>
            <SideMenu />
            <form method="post"  className={classes.appMain}>
                <Header> 
                    <Grid container justify="space-between">
                        <Grid item lg={3}><h3>Enregistrement de  naissance</h3></Grid>
                        <Grid item lg={3}>
                            <TextField
                                value={dateDuJour()}
                                label="Date de déclaration"
                                className={classes.textField}
                                InputProps={{ readOnly: true }}
                                name="date"
                            />
                        </Grid>
                        <Grid item lg={2}>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="multi">Type</InputLabel>
                                <Select
                                value={type}
                                onChange={onChangeType}
                                input={<Input id="multi" />}
                                >
                                    <MenuItem value={'normal'}>
                                    Normal
                                    </MenuItem>
                                    <MenuItem value={'jugement'}>
                                    Jugement
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item lg={2}>
                            {
                                (type === 'jugement')
                                ?
                                <TextField
                                    value={numeroJugement}
                                    onChange={(e) => setNumeroJugement(e.target.value)}
                                    onKeyUp={handleChangeNumero}
                                    label="Numéro du jugement"
                                    className={classes.textField}
                                    fullWidth={true}
                                    error={errors.numero}
                                    helperText={errors.textNumero}
                                />
                                :
                                ''
                            }
                        </Grid>
                        <Grid item lg={2}>
                            <IconButton onClick={save} style={{transform: 'translateY(25%)'}}>
                                <Done/>
                            </IconButton>
                        </Grid>
                    </Grid>
                </Header>
                <Grid>
                        <CardHeader 
                            title="Enfant"
                            avatar={
                                <Avatar>
                                <PersonIcon />
                                </Avatar>
                            }
                        />
                        <div style={{flexGrow: 1}}>
                            <Grid container>
                                <Grid item lg={3}>
                                    <TextField 
                                        onChange={(e) => {
                                            const enfantChange = Object.assign({}, enfant);
                                            enfantChange.nom = e.target.value;
                                            setEnfant(enfantChange);
                                        }} 
                                        value={enfant.nom
                                        }  
                                        label="Nom" className={classes.textField} fullWidth={true}/>
                                </Grid>
                                <Grid item lg={3}>
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
                                            }} 
                                    />
                                </Grid>
                                <Grid item lg={3}>
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
                                        }} 
                                    />
                                </Grid>
                                <Grid item lg={3}>
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
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item lg={6}>
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
                                </Grid>
                                <Grid item lg={6}>
                                    <TextField 
                                        value={enfant.lieu_naissance}
                                        onChange={(e) => {
                                            const enfantChange = Object.assign({}, enfant);
                                            enfantChange.lieu_naissance = e.target.value;
                                            setEnfant(enfantChange);
                                        }} 
                                        label="Lieu de naissance" 
                                        className={classes.textField} 
                                        fullWidth={true}/>
                                </Grid>
                            </Grid>
                        </div>
                </Grid>
                <Grid>
                        <CardHeader 
                            title="Père"
                            avatar={
                                <Avatar>
                                <PersonIcon />
                                </Avatar>
                            }
                        />
                        <div style={{flexGrow: 1}}>
                            <Grid container>
                                <Grid item lg={3}>
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
                                </Grid>
                                <Grid item lg={3}>
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
                                </Grid>
                                <Grid item lg={2}>
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
                                </Grid>
                                <Grid item lg={2}>
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
                                </Grid>
                                <Grid item lg={2}>
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
                                </Grid>
                            </Grid>
                        </div>
                </Grid>
                <Grid>
                        <CardHeader 
                            title="Mère"
                            avatar={
                                <Avatar>
                                <PersonIcon />
                                </Avatar>
                            }
                        />
                        <div style={{flexGrow: 1}}>
                            <Grid container>
                                <Grid item lg={3}>
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
                                </Grid>
                                <Grid item lg={3}>
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
                                </Grid>
                                <Grid item lg={2}>
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
                                </Grid>
                                <Grid item lg={2}>
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
                                </Grid>
                                <Grid item lg={2}>
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
                                </Grid>
                            </Grid>
                        </div>
                </Grid>
                <Grid>
                        <CardHeader 
                            title="Déclarant"
                            avatar={
                                <Avatar>
                                <PersonIcon />
                                </Avatar>
                            }
                        />
                        <div style={{flexGrow: 1}}>
                            <Grid container>
                                <Grid item lg={3}>
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
                                </Grid>
                                <Grid item lg={3}>
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
                                </Grid>
                                <Grid item lg={3}>
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
                                </Grid>
                                <Grid item lg={3}>
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
                                </Grid>
                            </Grid>
                        </div>
                </Grid>
            <CssBaseline />
            </form>
        </ThemeProvider>
    );
}
