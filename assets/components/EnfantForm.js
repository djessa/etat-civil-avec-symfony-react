import '../styles/naissanceForm.css';
import React, { useState } from 'react';
import { TextField } from '@material-ui/core'
import  SelectControl  from './SelectControl';

export default function EnfantForm({setObject}) {
	
	const [enfant, setEnfant] = useState({nom: '', prenom: '', sexe: ''});

	const handleChange = (e) => {
		const objectChange = Object.assign({}, enfant);
		objectChange[e.target.name] = e.target.value;
		setEnfant(objectChange);
		setObject(enfant);
	}

	const handleChangeSexe = (objet) => {
		setEnfant(objet);
		setObject(objet);
	}

	return (
		<div className="naissanceForm">
			<div className="naissanceFormGroup">
				<TextField
					name="nom"
					label="Nom donné à l'enfant"
					value={enfant.nom}
					onChange={handleChange}
				/>
				<TextField
					name="prenom"
					label="Prénom(s) donné(s) à l'enfant"
					value={enfant.prenom}
					onChange={handleChange}
				/>
				<SelectControl
					label="Sexe de l'enfant"
					object={enfant}
					setObjectParent={setObject}
					setObject={setEnfant}
					property="sexe"
					items={['Masculin', 'Féminin']}
				/>
			</div>
		</div>
	)
}