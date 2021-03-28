import React, {useState} from 'react'
import {TextField,  FormControl, InputLabel, Select, MenuItem} from '@material-ui/core'

export default function PersonneForm({property, object, handleChange}) {

	return <>
			<div className="naissanceForm">
				<TextField  
					label="Nom" 
					name="nom" 
					value={object[property].nom}  
					onChange={(e) => handleChange(e, property)}
				/>
				<TextField  
					label="Prénom" 
					name="prenom" 
					value={object[property].prenom} 
					onChange={(e) => handleChange(e, property)}
				/>
			</div>
			<div className="naissanceForm">
				<TextField  
					label="Profession" 
					name="profession" 
					value={object[property].profession} 
					onChange={(e) => handleChange(e, property)}
				/>
				<TextField  
					label="Résidence habituelle" 
					name="residence" 
					value={object[property].residence} 
					onChange={(e) => handleChange(e, property)}
				/>			
			</div>
	</>
}