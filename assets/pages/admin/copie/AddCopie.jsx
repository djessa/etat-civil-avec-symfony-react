import { TextField } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import CopieContextProvider, { CopieContext } from '../../../contexts/CopieContext'
import { useStyles } from '../../../variables/Styles';
import MessageDialog from '../../../components/MessageDialog';

const Index = () => {
    const context = useContext(CopieContext);
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [messageDialog, setmessageDialog] = useState('');
    const [bgDialog, setbgDialog] = useState('');
    const [openDialog, setOpenDialog] = useState(false);

    const save = () => {
        context.addCopie(category, content);
        setCategory('');
        setContent('');
        setmessageDialog('Enregistré avec succès');
        setbgDialog('green');
        setOpenDialog(true);
    }

    return (
        <div className="row mt-1">
            <div className="col-lg-11 mx-auto">
                <TextField label="Categorie de l'acte" value={category}  className="mb-2"  onChange={(e) => setCategory(e.target.value)}/>
                <Editor
                    value={content}
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
                    onEditorChange={(c, e) => setContent(c)}
                />
                <div className="mt-2 text-center">
                    <button className="btn btn-success" onClick={save}>Enregistrer</button>
                </div>
                <MessageDialog bg={bgDialog} open={openDialog} message={messageDialog} toggle={setOpenDialog}/>
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
