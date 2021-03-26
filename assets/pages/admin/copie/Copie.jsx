import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { IconButton, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import { Add, Photo, Edit, Delete } from '@material-ui/icons';
import CopieContextProvider, { CopieContext } from '../../../contexts/CopieContext'
import { useStyles } from '../../../variables/Styles';
import AddCopie from './AddCopie';

const Index = () => {
    const context = useContext(CopieContext);
    return (
        <div className="row mt-3">
            <div className="col-lg-10 mx-auto">
                <div className="d-flex justify-content-end mb-2">
                    <IconButton component= {Link} to="copie/add" variant="contained" className="bg-primary text-white">
                        <Add />
                    </IconButton>
                </div>
                <Table className="table">
                    <TableHead className="bg-light">
                        <TableRow>
                            <TableCell style={{ color: '#000' }}>Catégorie</TableCell>
                            <TableCell style={{ color: '#000' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {context.copies.map(copie => (
                            <TableRow key={copie.id}>
                                <TableCell>{copie.category}</TableCell>
                                <TableCell align="right"><NavLink to={'/copie' }><Edit /></NavLink><IconButton onClick={() => {context.deleteCopie(copie.id)}}><Delete /></IconButton></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
const Copie = () => {
    return (
        <CopieContextProvider>
            <Index />
        </CopieContextProvider>
    );
}
export default Copie