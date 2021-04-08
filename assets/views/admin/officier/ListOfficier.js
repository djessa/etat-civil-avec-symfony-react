import React, { useEffect, useState } from 'react';
import AdministrationLayout from '../../../layouts/AdministrationLayout';
import axios from 'axios';
import { WEBROOT } from '../../../uses/const';
import { Button, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Edit } from '@material-ui/icons';
import ModalDialog from '../../../components/ModalDialog';
import EditOfficier from './EditOfficier';
import AddOfficier from './AddOfficier';

const ListOfficier = () => {
    const [list, setList] = useState([]);
    const [change, setChange] = useState('none');
    const [addForm, setAddForm] = useState('none');
    const [id, setId] = useState(0);
    const [officier, setOfficier] = useState({});

    useEffect(() => {
        axios.get(WEBROOT + 'api/officier')
            .then(response => setList(response.data))
            .catch(error => console.log(error))
    }, [change, addForm]);

    useEffect(() => {
        if (change == 'none')
            setId(0);
    }, [change]);
    const add = () => {
        setAddForm('block');
    }
    const edit = (o) => {
        setId(1);
        setOfficier(o);
        setChange('block');
    }
    return (
        <AdministrationLayout>
            <Table>
                <TableHead>
                    <TableRow style={{ backgroundColor: '#0AF' }}>
                        <TableCell>ID</TableCell>
                        <TableCell>Nom</TableCell>
                        <TableCell>Prénom</TableCell>
                        <TableCell>Sexe</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        (list.length > 0)
                            ?
                            list.map(o => {
                                return <TableRow key={o.id}>
                                    <TableCell>{o.id}</TableCell>
                                    <TableCell>{o.information_personnel.nom}</TableCell>
                                    <TableCell>{o.information_personnel.prenom}</TableCell>
                                    <TableCell>{o.information_personnel.sexe}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => edit(o)}>
                                            <Edit />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            })
                            :
                            <TableRow><TableCell colSpan="5" align="center">Chargement...</TableCell></TableRow>
                    }
                </TableBody>
            </Table>
            <Button variant="outlined" className="m-3" onClick={add}>Nouveau</Button>
            <ModalDialog body={id != 0 ? <EditOfficier objet={officier} setRefresh={setChange} /> : ''} changeValue={change} setChangeValue={setChange} />
            <ModalDialog body={<AddOfficier setRefresh={setAddForm} />} changeValue={addForm} setChangeValue={setAddForm} />
        </AdministrationLayout>
    );
}

export default ListOfficier;