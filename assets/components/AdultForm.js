import '../styles/naissanceForm.css';
import React, { useState } from 'react';
import { TextField } from '@material-ui/core'
import SelectControl from './SelectControl';

export default function AdultForm({ object, setObject }) {

	const [adult, setAdult] = useState(Object.assign({}, object));

	const handleChange = (e) => {
		const objectChange = Object.assign({}, adult);
		objectChange[e.target.name] = e.target.value;
		setAdult(objectChange);
		setObject(objectChange);
	}

	return (
		<>
			<div className="naissanceForm">
				<div className="naissanceFormGroup">
					<TextField
						name="nom"
						label="Nom"
						value={adult.nom}
						onChange={handleChange}
					/>
					<TextField
						name="prenom"
						label="Prénom"
						value={adult.prenom}
						onChange={handleChange}
					/>
					<SelectControl
						label="Sexe"
						object={adult}
						setObjectParent={setObject}
						setObject={setAdult}
						property="sexe"
						items={['Masculin', 'Féminin']}
					/>
				</div>
			</div>
			<div className="naissanceFormGroup">
				<TextField
					type="date"
					label="Date de naissance"
					InputLabelProps={{ shrink: true }}
					name="date_naissance"
					value={adult.date_naissance}
					onChange={handleChange}
				/>
				<TextField
					label="Lieu de naissance"
					name="lieu_naissance"
					value={adult.lieu_naissance}
					onChange={handleChange}
				/>
			</div>
			<div className="naissanceForm">
				<div className="naissanceFormGroup">
					<TextField
						name="profession"
						label="Profession"
						value={adult.profession}
						onChange={handleChange}
					/>
					<TextField
						name="residence"
						label="Résidence"
						value={adult.residence}
						onChange={handleChange}
					/>
				</div>
			</div>
		</>
	)
}