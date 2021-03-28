import React, {useContext, useState} from 'react'
import  {NaissanceContext} from '../contexts/NaissanceContext'
import {Tabs, Tab, TextField, Grid, FormControl, InputLabel, Select, MenuItem, Button} from '@material-ui/core'
import {Naissance} from '../class/Naissance'
import PersonneForm from './PersonneForm'

export default function NaissanceForm() {
	const context = useContext(NaissanceContext)
	const [naissance, setNaissance] = useState(new Naissance())
	const [formCategory, setFormCategory] = useState(0)
	const handleChangeData = (e) => {
		const naissanceChange = Object.assign({}, naissance)
		naissanceChange[e.target.name] = e.target.value
		setNaissance(naissanceChange)
	}
	const hanldeChangeObjectData = (e, property) => {
		const naissanceChange = Object.assign({}, naissance)
		naissanceChange[property][e.target.name] = e.target.value
		setNaissance(naissanceChange)
	}
	return ( 
	    <div className="mt-5 mx-3">
		    <div className="naissanceForm">
			    <TextField name="_date_declaration"  type="date" 
			    	label="Date de déclaration"  InputLabelProps={{ shrink: true }}
			        onChange={handleChangeData}
			        value={naissance._date_declaration}
			    />
		       	<TextField name="heure_declaration" type="time" 
			       	label="Heure de déclaration" InputLabelProps={{ shrink: true }}
			       	onChange={handleChangeData}
			       	value={naissance.heure_declaration}
		       	/>
		    </div>
		    <div className="naissanceForm">
		        <TextField name="_date_naissance" type="date" 
			        label="Date de naissance"  InputLabelProps={{ shrink: true }}
			        onChange={handleChangeData}
			        value={naissance._date_naissance}
		        />
		        <TextField name="heure_naissance" type="time" 
		        	label="Heure de naissance" InputLabelProps={{ shrink: true }}
		        	 onChange={handleChangeData}
		        	 value={naissance.heure_naissance}
		       	/>
		        <TextField 
		        	name="lieu_naissance"  
		        	label="Lieu de naissance"
		         	onChange={handleChangeData}
		         	value={naissance.lieu_naissance}
		        />
		    </div>
		    <div className="naissanceForm">
				<TextField name="nom"
					label="Nom de l'enfant" 
					value={naissance.enfant.nom}
					onChange={(e) => hanldeChangeObjectData(e, 'enfant')}	
				/>
				<TextField name="prenom" id="enfant" 
					label="Prénom de l'enfant"  
					value={naissance.enfant.prenom}
					onChange={(e) => hanldeChangeObjectData(e, 'enfant')}	
				/>
			</div>
			<Tabs  value={formCategory}  onChange={(e, value) => setFormCategory(value)}>
				<Tab label="Père"></Tab>
				<Tab label="Mère"></Tab>
				<Tab label="Déclarant"></Tab>
				<Tab label="Officier"></Tab>
			</Tabs>
			{ formCategory === 0 && 
				<PersonneForm  property="pere" object={naissance}  handleChange={hanldeChangeObjectData}/>
			}
			{ formCategory === 1 && 
				<PersonneForm  property="mere" object={naissance}  handleChange={hanldeChangeObjectData}/>
			}
			{ formCategory === 2 && 
				<PersonneForm  property="declarant" object={naissance}  handleChange={hanldeChangeObjectData}/>
			}
			{ formCategory === 3 && 
				<>
				<FormControl  fullWidth={true}>
				    <InputLabel id="demo-simple-select-label">Nom de l'Officier</InputLabel>
				    <Select name="officier"    
				    	labelId="demo-simple-select-label"
				    	onChange={handleChangeData}
				    >
				    <MenuItem value="Jean Dupont">Jean Dupont</MenuItem>
				    <MenuItem value="Jeanne Doe">Jeanne Doe</MenuItem>
				    </Select>
				</FormControl>
				<div align="center" className="mt-5">
					<Button variant="contained" color="secondary">Enregistrer</Button>
				</div>
				</>
			}
	    </div>
	)
}