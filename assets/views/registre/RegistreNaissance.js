import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import RegistreLayout from '../../layouts/RegistreLayout'
import { mini_date, WEBROOT } from '../../uses/const';
import TableCellsHead from '../../components/TableCellsHead';
import '../../styles/registre.css';
export default function RegistreNaissance() {

    const [registre, setRgistre] = useState([]);

    useEffect(() => {
        getRegistre();
    }, []);

    const getRegistre = () => {
        axios.get(WEBROOT + 'registre/naissance')
            .then(response => setRgistre(response.data))
            .catch(error => console.log(error))
    }

    return <RegistreLayout>
        <TableContainer>
            <Table>
                <TableHead className="registre">
                    <TableCellsHead bgClass="bg-primary" columns={['ID', 'Nom', 'Prénom', 'Sexe', 'Date de naissance', 'Lieu de naissance', 'Action']} />
                </TableHead>
                <TableBody>
                    {
                        (registre.length > 0)
                            ?
                            registre.map((data, index) => {
                                return <TableRow key={index}>
                                    <TableCell>{data.id}</TableCell>
                                    <TableCell>{data.enfant.nom}</TableCell>
                                    <TableCell>{data.enfant.prenom}</TableCell>
                                    <TableCell>{data.enfant.sexe}</TableCell>
                                    <TableCell>{mini_date(data.date_naissance)}</TableCell>
                                    <TableCell>{data.lieu_naissance}</TableCell>
                                    <TableCell>
                                        <a className="btn btn-success" href={'/birth/copie/' + data.id} target="_blank">
                                            Copie
                                            </a>
                                        <a className="btn ml-1 btn-success" href={'/birth/extrait/' + data.id} target="_blank">
                                            Extrait
                                            </a>
                                    </TableCell>
                                </TableRow>
                            })
                            :
                            <TableRow>
                                <TableCell colSpan="7" align="center" style={{ fontSize: '1.1em' }}>Chargement en cours...</TableCell>
                            </TableRow>
                    }
                </TableBody>
            </Table>
        </TableContainer>
    </RegistreLayout>
}