import '../styles/naissanceForm.css';
import React, { useState } from 'react';
import { TextField } from '@material-ui/core'
import { Naissance } from '../class/Naissance';
import SelectControl from './SelectControl';

export default function NaissanceForm({ setObject }) {
	const [openDialog, setOpenDialog] = useState(false)
	const [messageDialog, setMessageDialog] = useState('')
	const [bgDialog, setBgDialog] = useState('')
	const [naissance, setNaissance] = useState(new Naissance());


	const handleChange = (e) => {
		const objectChange = Object.assign({}, naissance);
		objectChange[e.target.name] = e.target.value;
		setNaissance(objectChange);
		setObject(naissance);
	}


	return (
		<div className="naissanceForm mt-3">
			<div className="naissanceFormGroup">
				<TextField
					name="date_declaration"
					type="date"
					label="Date de déclaration"
					InputLabelProps={{ shrink: true }}
					value={naissance.date_declaration}
					onChange={handleChange}
				/>
				<TextField
					name="heure_declaration"
					type="time"
					label="Heure de déclaration"
					InputLabelProps={{ shrink: true }}
					value={naissance.heure_declaration}
					onChange={handleChange}
				/>
				<SelectControl
					label="Type de déclaration"
					object={naissance}
					setObject={setNaissance}
					setObjectParent={setObject}
					property="type_declaration"
					items={['Normal', 'Jugement']}
				/>
			</div>
			{
				naissance.type_declaration === 'Jugement' &&
				<div className="naissanceFormGroup">
					<TextField
						name="date_jugement"
						type="date"
						label="Date du jugement"
						InputLabelProps={{ shrink: true }}
						value={naissance.date_jugement}
						onChange={handleChange}
					/>
					<TextField
						name="numero_jugement"
						label="Numéro du jugement"
						value={naissance.numero_jugement}
						onChange={handleChange}
					/>
				</div>
			}
			<div className="naissanceFormGroup">
				<TextField
					name="date_naissance"
					type="date"
					label="Date de naissance"
					InputLabelProps={{ shrink: true }}
					value={naissance.date_naissance}
					onChange={handleChange}
				/>
				<TextField
					name="heure_naissance"
					type="time"
					label="Heure de naissance"
					InputLabelProps={{ shrink: true }}
					value={naissance.heure_naissance}
					onChange={handleChange}
				/>
				<TextField
					name="lieu_naissance"
					label="Lieu de naissance"
					value={naissance.lieu_naissance}
					onChange={handleChange}
				/>
			</div>
		</div>
	)
}