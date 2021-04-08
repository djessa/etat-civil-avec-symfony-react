import React, { useEffect, useState } from 'react';
import AdministrationLayout from '../../../layouts/AdministrationLayout';
import { Personne } from '../../../class/Personne';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import SelectControl from '../../../components/SelectControl';
import { Save } from '@material-ui/icons';
import axios from 'axios';
import { dateFormat, WEBROOT } from '../../../uses/const';
import MessageDialog from '../../../components/MessageDialog';

const EditOfficier = (props) => {
    const [officier, setOffcier] = useState(new Personne());
    const [run, setRun] = useState(false);
    const handleChange = (e) => {
        const o = Object.assign({}, officier);
        o[e.target.name] = e.target.value;
        setOffcier(o);
    }
    useEffect(() => {
        setOffcier(props.objet.information_personnel)
    }, []);
    const handleSubmit = () => {
        setRun(true)
        axios.put(WEBROOT + 'api/officier/' + props.objet.id, officier)
            .then((response) => {
                setRun(false);
                props.setRefresh('none');
            })
            .catch(error => console.log(error));
    }
    const suppression = () => {
        setRun(true)
        axios.delete(WEBROOT + 'api/officier/' + props.objet.id)
            .then((response) => {
                setRun(false);
                props.setRefresh('none');
            })
            .catch(error => console.log(error));
    }
    return (<>
        {
            officier.nom != '' &&
            <div>
                <TextField label="Nom" name="nom" value={officier.nom} onChange={handleChange} fullWidth={true} />
                <TextField label="Prénom" name="prenom" value={officier.prenom} onChange={handleChange} fullWidth={true} />
                <FormControl fullWidth={true}>
                    <InputLabel id="demo-simple-select-label">Sexe</InputLabel>
                    <Select labelId="demo-simple-select-label" name="sexe" value={officier.sexe} onChange={handleChange}>
                        <MenuItem value="Masculin">Masculin</MenuItem>
                        <MenuItem value="Féminin">Féminin</MenuItem>
                    </Select>
                </FormControl>
                <TextField className="mt-3 mb-2" label="Date de naissance" type="date" InputLabelProps={{ shrink: true }} name="date_naissance" defaultValue={dateFormat(new Date(officier.date_naissance))} onChange={handleChange} fullWidth={true} />
                <TextField label="Lieu de  naissance" name="lieu_naissance" value={officier.lieu_naissance} onChange={handleChange} fullWidth={true} />
                <TextField label="Profession" name="profession" value={officier.profession} onChange={handleChange} fullWidth={true} />
                <TextField label="Résidence" name="residence" value={officier.residence} onChange={handleChange} fullWidth={true} />
                <div className="mt-3 d-flex justify-content-around align-items-center">
                    {
                        run
                            ?
                            <p className="text-center display-5">En cours de traitement...</p>
                            :
                            <>
                                <Button variant="outlined" color="primary" onClick={handleSubmit}>
                                    Modifier
                                </Button>
                                <Button variant="outlined" color="secondary" onClick={suppression}>
                                    Supprimer
                                </Button>
                            </>
                    }
                </div>
            </div>
        }
    </>);
}

export default EditOfficier;