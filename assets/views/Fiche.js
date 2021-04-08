import '../styles/fiche.css';
import { Button, Grid } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AppProvider from '../components/AppProvider';
import Header from '../components/Header';
import { mini_date, WEBROOT } from '../uses/const';
import { Link } from 'react-router-dom';

const Fiche = (props) => {
    const [individu, setIndividu] = useState('');
    useEffect(() => {
        const { params } = props.match;
        axios.get(WEBROOT + 'api/personne/' + params.id)
            .then(response => setIndividu(response.data))
            .catch(error => console.log(error));
    }, []);
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
                                <table className="table">
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