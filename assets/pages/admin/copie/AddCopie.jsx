import { TextField } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import CopieContextProvider, { CopieContext } from '../../../contexts/CopieContext'
import { useStyles } from '../../../variables/Styles';

const Index = () => {
    const context = useContext(CopieContext);
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');

    const save = () => {
        context.addCopie(category, content);
        setCategory('');
        setContent('');
    }

    return (
        <div className="row mt-1">
            <div className="col-lg-10 mx-auto">
                <TextField label="Categorie de l'acte" value={category}  className="mb-2"  onChange={(e) => setCategory(e.target.value)}/>
                <Editor
                    value={content}
                    init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount'
                        ],
                        toolbar:
                            'undo redo | formatselect | bold italic backcolor | \
                            alignleft aligncenter alignright alignjustify | \
                            bullist numlist outdent indent | removeformat | help'
                    }}
                    onEditorChange={(c, e) => setContent(c)}
                />
                <div className="mt-2 text-center">
                    <button className="btn btn-success" onClick={save}>Enregistrer</button>
                </div>
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
