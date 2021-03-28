import React, { useContext, useState } from 'react'
import { NaissanceContext } from '../contexts/NaissanceContext'
import { Tabs, Tab, TextField, Grid, FormControl, InputLabel, Select, MenuItem, Button } from '@material-ui/core'
import { Naissance } from '../class/Naissance'
import PersonneForm from './PersonneForm'
import MessageDialog from './MessageDialog'

export default function NaissanceForm() {
	const context = useContext(NaissanceContext)
	const [naissance, setNaissance] = useState(new Naissance())
	const [openMessage, setOpenMessage] = useState(false)
	const [message, setMessage] = useState('')
	const [bgMessage, setBgMessage] = useState('')
	const [formCategory, setFormCategory] = useState(0)
	const handleChangeData = (e) => {
		const naissanceChange = Object.assign({}, naissance)
		naissanceChange[e.target.name] = e.target.value
		setNaissance(naissanceChange)
	}
	const hanldeChangeObjectData = (e, property, num) => {
		const naissanceChange = Object.assign({}, naissance)
		if (property === 'parents') naissanceChange[property][num][e.target.name] = e.target.value
		else naissanceChange[property][e.target.name] = e.target.value
		setNaissance(naissanceChange)
	}
	const handleSubmit = () => {
		setBgMessage('#0F0')
		setMessage('Enregistré avec succès')
		setOpenMessage(true)
		context.declare_naissance(naissance)
	}

	return (
		<div className="mt-5">
			<div className="row">
				<div className="col-lg-10 mx-auto">
					<div className="naissanceForm">
						<TextField name="date_declaration" type="date"
							label="Date de déclaration" InputLabelProps={{ shrink: true }}
							onChange={handleChangeData}
							value={naissance._date_declaration}
						/>
						<TextField name="heure_declaration" type="time"
							label="Heure de déclaration" InputLabelProps={{ shrink: true }}
							onChange={handleChangeData}
							value={naissance.heure_declaration}
						/>
						<FormControl>
							<InputLabel id="demo-simple-select-label">Type de déclaration</InputLabel>
							<Select name="type_declaration"
								labelId="demo-simple-select-label"
								value={naissance.type_declaration}
								onChange={handleChangeData}
							>
								<MenuItem value="Normal">Normal</MenuItem>
								<MenuItem value="Jugement">Jugement</MenuItem>
							</Select>
						</FormControl>
					</div>
					<div className="naissanceForm">
						<TextField name="date_naissance" type="date"
							label="Date de naissance" InputLabelProps={{ shrink: true }}
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
						<TextField name="prenom"
							label="Prénom de l'enfant"
							value={naissance.enfant.prenom}
							onChange={(e) => hanldeChangeObjectData(e, 'enfant')}
						/>
						<FormControl>
							<InputLabel id="demo-simple-select-label">Sexe de  l'enfant</InputLabel>
							<Select name="sexe"
								labelId="demo-simple-select-label"
								value={naissance.enfant.sexe}
								onChange={(e) => hanldeChangeObjectData(e, 'enfant')}
							>
								<MenuItem value="masculin">Masculin</MenuItem>
								<MenuItem value="feminin">Feminin</MenuItem>
							</Select>
						</FormControl>
					</div>
					<Tabs value={formCategory} onChange={(e, value) => setFormCategory(value)}>
						<Tab label="Père"></Tab>
						<Tab label="Mère"></Tab>
						<Tab label="Déclarant"></Tab>
						<Tab label="Officier"></Tab>
					</Tabs>
					{formCategory === 0 &&
						<PersonneForm property="parents" num={0} object={naissance} handleChange={hanldeChangeObjectData} />
					}
					{formCategory === 1 &&
						<PersonneForm property="parents" num={1} object={naissance} handleChange={hanldeChangeObjectData} />
					}
					{formCategory === 2 &&
						<PersonneForm property="declarant" num={0} object={naissance} handleChange={hanldeChangeObjectData} />
					}
					{formCategory === 3 &&
						<>
							<FormControl fullWidth={true}>
								<InputLabel id="demo-simple-select-label">Nom de l'Officier</InputLabel>
								<Select name="officier"
									labelId="demo-simple-select-label"
									onChange={handleChangeData}
									value={naissance.officier}
								>
									{
										context.officiers.map((officier) => (
											<MenuItem key={officier.id} value={officier.id}>{officier.information_personnel.nom + ' ' + officier.information_personnel.prenom}</MenuItem>
										))
									}
								</Select>
							</FormControl>
							<div align="center" className="mt-5">
								<Button variant="contained" color="secondary" onClick={handleSubmit}>Enregistrer</Button>
							</div>
						</>
					}
				</div></div>
			<MessageDialog bg={bgMessage} open={openMessage} message={message} toogle={setOpenMessage} />
		</div>
	)
}