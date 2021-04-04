import { IconButton, TextField, Button } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import React, { useRef, useState } from 'react'
import AdministrationLayout from '../../layouts/AdministrationLayout'
import '../../styles/admin.css';
import { Editor } from '@tinymce/tinymce-react';
import MessageDialog from '../../components/MessageDialog';
import axios from 'axios';
import { WEBROOT } from '../../uses/const';

export default function Acte_new() {
    const [categorie, setCategorie] = useState('');
    const [openMessage, setOpenMessage] = useState(false);
    const [message, setMessage] = useState('');
    const [bg, setBg] = useState('blue');
    const file = useRef('');

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('category', categorie);
        formData.append('contenu', file.current.files[0]);
        axios.post(WEBROOT + 'administration/acte/new', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            setBg('green');
            setMessage(response.data.message)
            setOpenMessage(true)
        }).catch(error => console.log(error))
    }

    return <AdministrationLayout>
        <div className="naissanceForm">
            {
                !openMessage ?
                    <>
                        <div className="naissanceFormGroup">
                            <TextField
                                label="Catégorie de l'acte"
                                fullWidth={true}
                                value={categorie}
                                onChange={(e) => setCategorie(e.target.value)}
                            />
                        </div>
                        <div className="naissancFormGroup">
                            <input
                                style={{ display: "none" }}
                                id="contained-button-file"
                                type="file"
                                ref={file}
                            />
                            <label htmlFor="contained-button-file">
                                <Button variant="contained" color="primary" component="span">
                                    Contenu
                                </Button>
                            </label>
                        </div>
                        <div className="naissanceFormGroup">
                            <button className="btn btn-success" onClick={handleSubmit}>Ajouter</button>
                        </div>
                    </>
                    :

                    <MessageDialog bg={bg} message={message} open={openMessage} toggle={setOpenMessage} />
            }
        </div>
    </AdministrationLayout>
}
