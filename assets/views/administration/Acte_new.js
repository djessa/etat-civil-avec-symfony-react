import { IconButton, TextField } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import React from 'react'
import AdministrationLayout from '../../layouts/AdministrationLayout'
import '../../styles/admin.css';
import { Editor } from '@tinymce/tinymce-react';

export default function Acte_new() {
    return <AdministrationLayout>
        <div className="naissanceForm">
            <div className="naissanceFormGroup">
                <TextField
                    label="Catégorie de l'acte"
                    fullWidth={true}
                />
            </div>
            <div className="naissancFormGroup">
                <Editor
                    apiKey="9v5h0ap0p04wx297dglcaj1n7vqbtaxvxbkd1qs51pgyzx49"
                    init={{
                        height: 500,
                        plugins: [
                            'advlist autolink link image lists charmap print preview hr anchor pagebreak',
                            'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
                            'table emoticons template paste help'
                        ],
                        toolbar: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | ' +
                            'bullist numlist outdent indent | link image | print preview media fullpage | ' +
                            'forecolor backcolor emoticons | help',
                        menu: {
                            favs: { title: 'My Favorites', items: 'code visualaid | searchreplace | emoticons' }
                        },
                        menubar: 'favs file edit view insert format tools table help',
                        content_css: 'css/content.css'
                    }}
                />
            </div>
            <div className="naissanceFormGroup">
                <button className="btn btn-success">Ajouter</button>
            </div>
        </div>
    </AdministrationLayout>
}