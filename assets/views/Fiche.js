import '../styles/fiche.css';
import { Button, Grid, IconButton } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AppProvider from '../components/AppProvider';
import Header from '../components/Header';
import { mini_date, WEBROOT } from '../uses/const';
import { Link } from 'react-router-dom';
import { Backspace, KeyboardBackspace } from '@material-ui/icons';

const Fiche = (props) => {
    const [individu, setIndividu] = useState('');
    const [pere, setPere] = useState('');
    const [mere, setMere] = useState('');
    const [id, setId] = useState(0);
    useEffect(() => {
        const { params } = props.match;
        let id_ind;
        if (id == 0) id_ind = params.id;
        else id_ind = id;
        setPere('');
        setMere('');
        axios.get(WEBROOT + 'api/personne/' + id_ind)
            .then(response => setIndividu(response.data))
            .catch(error => console.log(error));
        axios.get(WEBROOT + 'api/personne/parent/' + id_ind)
            .then(response => {
                setPere((response.data)[0]);
                setMere((response.data)[1]);
            })
            .catch(error => console.log(error));
    }, [id]);
    return (
        <AppProvider>
            {
                individu
                    ?
                    <>
                        <Header>
                            <Grid>
                                <Button component={Link} to={WEBROOT + 'show/copie/naissance/' + individu.id} variant="contained">
                                    Copie de naissance
                    </Button>
                            </Grid>
                        </Header>
                        <div className="main">
                            <div className="individu">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th colSpan={3}>Etat civil</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Nom</td><td colSpan={2}>{individu.nom}</td>
                                        </tr>
                                        <tr>
                                            <td>Prénom</td><td colSpan={2}>{individu.prenom}</td>
                                        </tr>
                                        <tr>
                                            <td>Sexe</td><td colSpan={2}>{individu.sexe}</td>
                                        </tr>
                                        <tr>
                                            <td>Date de naissance</td><td colSpan={2}>{mini_date(individu.date_naissance)}</td>
                                        </tr>
                                        <tr>
                                            <td>Lieu de naissance</td><td colSpan={2}>{individu.lieu_naissance}</td>
                                        </tr>
                                        {
                                            individu.profession &&
                                            <tr>
                                                <td>Profession</td><td colSpan={2}>{individu.profession}</td>
                                            </tr>
                                        }
                                        {
                                            individu.residence &&
                                            <tr>
                                                <td>Résidence</td><td colSpan={2}>{individu.residence}</td>
                                            </tr>
                                        }
                                        {
                                            pere &&
                                            <tr>
                                                <td>Père</td><td colSpan={2}><Link onClick={() => setId(pere.id)}>{pere.nom + ' ' + pere.prenom}</Link></td>
                                            </tr>
                                        }
                                        {
                                            mere &&
                                            <tr>
                                                <td>Mère</td><td colSpan={2}><Link onClick={() => setId(mere.id)}>{mere.nom + ' ' + mere.prenom}</Link></td>
                                            </tr>
                                        }
                                        {
                                            (id != 0) &&
                                            <tr>
                                                <td align="right" colSpan={3}>
                                                    <IconButton onClick={() => setId(props.match.params.id)}>
                                                        <KeyboardBackspace />
                                                    </IconButton>
                                                </td>
                                            </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                    :
                    ''
            }
        </AppProvider>
    );
}

export default Fiche;