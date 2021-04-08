import React, { useState } from 'react';
import AdministrationLayout from '../../../layouts/AdministrationLayout';
import { Personne } from '../../../class/Personne';
import { Button, TextField } from '@material-ui/core';
import SelectControl from '../../../components/SelectControl';
import { Save } from '@material-ui/icons';
import axios from 'axios';
import { WEBROOT } from '../../../uses/const';

const AddOfficier = (props) => {
    const [officier, setOffcier] = useState(new Personne());
    const [run, setRun] = useState(false);
    const handleChange = (e) => {
        const o = Object.assign({}, officier);
        o[e.target.name] = e.target.value;
        setOffcier(o);
    }
    const handleSubmit = () => {
        setRun(true);
        axios.post(WEBROOT + 'api/officier', officier)
            .then((response) => {
                setRun(false);
                setOffcier(new Personne());
                props.setRefresh('none');
            })
            .catch(error => console.log(error));
    }
    return (<>
        <div>
            <TextField label="Nom" name="nom" value={officier.nom} onChange={handleChange} fullWidth={true} />
            <TextField label="Prénom" name="prenom" value={officier.prenom} onChange={handleChange} fullWidth={true} />
            <SelectControl label="Sexe" object={officier} setObject={setOffcier} property="sexe" items={['Masculin', 'Féminin']} />
            <TextField className="mt-3 mb-2" label="Date de naissance" type="date" InputLabelProps={{ shrink: true }} name="date_naissance" value={officier.date_naissance} onChange={handleChange} fullWidth={true} />
            <TextField label="Lieu de  naissance" name="lieu_naissance" value={officier.lieu_naissance} onChange={handleChange} fullWidth={true} />
            <TextField label="Profession" name="profession" value={officier.profession} onChange={handleChange} fullWidth={true} />
            <TextField label="Résidence" name="residence" value={officier.residence} onChange={handleChange} fullWidth={true} />
            {run
                ?
                <p className="text-center mt-3">En cours de traitement...</p>
                :
                <Button className="mt-3" variant="outlined" color="primary" onClick={handleSubmit}>Ajouter</Button>
            }
        </div>
    </>);
}

export default AddOfficier;