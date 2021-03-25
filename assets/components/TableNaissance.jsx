import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React from 'react';
import { mini_date } from '../variables/const';
import TableCellsHead from './TableCellsHead';

const TableNaissance = ({ rows }) => {
    return (
        <TableContainer>
            <Table>
                <TableHead className="registre">
                    <TableCellsHead bgClass="bg-primary" columns={['ID', 'Nom', 'Prénom', 'Sexe', 'Date de naissance', 'Lieu de naissance', 'Action']} />
                </TableHead>
                <TableBody>
                    {rows.map((data, index) => {
                        let fiche = JSON.parse(data);
                        let person = JSON.parse(fiche.enfant);
                        return <TableRow key={index}>
                            <TableCell>{person.id}</TableCell>
                            <TableCell>{person.first_name}</TableCell>
                            <TableCell>{person.last_name}</TableCell>
                            <TableCell>{person.sexe}</TableCell>
                            <TableCell>{mini_date(person.birthdate)}</TableCell>
                            <TableCell>{person.birthplace}</TableCell>
                            <TableCell>
                                <a className="btn btn-success" href={'/birth/copie/' + fiche.id} target="_blank">
                                    Copie
                                            </a>
                                <a className="btn ml-1 btn-success" href={'/birth/extrait/' + fiche.id} target="_blank">
                                    Extrait
                                            </a>
                            </TableCell>
                        </TableRow>
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TableNaissance;