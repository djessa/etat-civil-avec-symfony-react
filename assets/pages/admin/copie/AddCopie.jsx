import { TextField } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import CopieContextProvider, { CopieContext } from '../../../contexts/CopieContext'
import { useStyles } from '../../../variables/Styles';

const Index = () => {
    const context = useContext(CopieContext);
    return (
        <div className="row mt-3">
            <div className="col-lg-10 mx-auto">
                <TextField label="Categorie de l'acte" fullWidth={true}/>
                <label htmlFor="myTextarea">Contenu</label>
            </div>
        </div>
    );
}
const AddCopie = () => {
    return (
        <CopieContextProvider>
            <Index />
        </CopieContextProvider>
    );
}
export default AddCopie;
