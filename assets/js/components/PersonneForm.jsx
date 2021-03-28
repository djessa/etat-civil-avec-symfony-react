import React, {useState} from 'react'
import {TextField,  FormControl, InputLabel, Select, MenuItem} from '@material-ui/core'

export default function PersonneForm({property, object, num, handleChange}) {

	

	return <>
			<div className="naissanceForm">
				<TextField  
					label="Nom" 
					name="nom" 
					value={property === 'parents' ? object[property][num].nom : object[property].nom}  
					onChange={(e) => handleChange(e, property, num)}
				/>
				<TextField  
					label="Prénom" 
					name="prenom" 
					value={property === 'parents' ? object[property][num].prenom : object[property].prenom} 
					onChange={(e) => handleChange(e, property, num)}
				/>
				<FormControl>
				    <InputLabel id="demo-simple-select-label">Sexe</InputLabel>
				    <Select name="sexe"    
				    	labelId="demo-simple-select-label"
				    	value={property === 'parents' ? object[property][num].sexe : object[property].sexe} 
					onChange={(e) => handleChange(e, property, num)}
				    >
				    <MenuItem value="masculin">Masculin</MenuItem>
				    <MenuItem value="feminin">Feminin</MenuItem>
				    </Select>
				</FormControl>
			</div>
			<div className="naissanceForm">
				<TextField  
					label="Profession" 
					name="profession" 
					value={property === 'parents' ? object[property][num].profession : object[property].profession} 
					onChange={(e) => handleChange(e, property, num)}
				/>
				<TextField  
					label="Résidence habituelle" 
					name="residence" 
					value={property === 'parents' ? object[property][num].residence : object[property].residence} 
					onChange={(e) => handleChange(e, property, num)}
				/>			
			</div>
	</>
}