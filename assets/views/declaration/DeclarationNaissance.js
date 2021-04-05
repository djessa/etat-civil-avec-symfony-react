import React, { useState, useEffect } from 'react';
import AdultForm from '../../components/AdultForm';
import '../../styles/naissanceForm.css';
import DeclarationLayout from '../../layouts/DeclarationLayout';
import { Button, Tab, Tabs } from '@material-ui/core'
import { Personne } from '../../class/Personne';
import SelectControl from '../../components/SelectControl';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { WEBROOT } from '../../uses/const';
import axios from 'axios';
import MessageDialog from '../../components/MessageDialog';
import { TextField } from '@material-ui/core'
import { Naissance } from '../../class/Naissance';


export default function DeclarationNaissance() {
	const [openDialog, setOpenDialog] = useState(false)
	const [messageDialog, setMessageDialog] = useState('')
	const [bgDialog, setBgDialog] = useState('')
	const [naissance, setNaissance] = useState(new Naissance());
	const [pere, setPere] = useState(new Personne());
	const [mere, setMere] = useState(new Personne());
	const [declarant, setDeclarant] = useState(new Personne());
	const [enfant, setEnfant] = useState(new Personne());
	const [form, setForm] = useState(0);
	const [officierItems, setOfficiersItems] = useState([]);
	const [officier, setOfficier] = useState('');
	const [chargement, setChargement] = useState(false);


	React.useEffect(() => {
		getOfficiers();
	}, []);

	const getOfficiers = () => {
		axios.get(WEBROOT + 'api/officier')
			.then(response => setOfficiersItems(response.data))
	}

	const handleSubmit = () => {
		const data = { naissance, enfant, pere, mere, declarant, officier }
		setChargement(true);
		axios.post(WEBROOT + 'api/naissance', data)
			.then((response) => {
				if (response.data.status === 200) {
					setMessageDialog(response.data.message)
					setBgDialog('green')
					setNaissance(new Naissance())
					setEnfant(new Personne())
					setPere(new Personne())
					setMere(new Personne())
					setDeclarant(new Personne())
					setOfficier('')
				}
				else {
					setMessageDialog("Impossible d'enregistrer")
					setBgDialog('red');
				}
				setChargement(false);
				setOpenDialog(true);
			})
			.catch((error) => {
				setMessageDialog('Impossible d\'enregistrer');
				setBgDialog('red');
				setChargement(false);
				setOpenDialog(true);
			})
	}

	const handleChange = (e) => {
		const objectChange = Object.assign({}, naissance);
		objectChange[e.target.name] = e.target.value;
		setNaissance(objectChange);
	}
	const handleChangeEnfant = (e) => {
		const objectChange = Object.assign({}, enfant);
		objectChange[e.target.name] = e.target.value;
		setEnfant(objectChange);
	}

	return (
		<DeclarationLayout>
			<div className="declaration_naissance">
				<div className="information_naissance">
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
								value={enfant.date_naissance}
								onChange={(e) => {
									const objet = Object.assign({}, enfant)
									objet.date_naissance = e.target.value
									setEnfant(objet)
								}}
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
								value={enfant.lieu_naissance}
								onChange={handleChangeEnfant}
							/>
						</div>
					</div>
					<div className="naissanceForm">
						<div className="naissanceFormGroup">
							<TextField
								name="nom"
								label="Nom donné à l'enfant"
								value={enfant.nom}
								onChange={handleChangeEnfant}
							/>
							<TextField
								name="prenom"
								label="Prénom(s) donné(s) à l'enfant"
								value={enfant.prenom}
								onChange={handleChangeEnfant}
							/>
							<SelectControl
								label="Sexe de l'enfant"
								object={enfant}
								setObject={setEnfant}
								property="sexe"
								items={['Masculin', 'Féminin']}
							/>
						</div>
					</div>
				</div>
				<div>
					<div className="complementaireNaissanceForm">
						<Tabs className="header" value={form} onChange={(e, v) => setForm(v)}>
							<Tab label="Information sur père"></Tab>
							<Tab label="Information sur mère"></Tab>
							<Tab label="Information sur déclarant"></Tab>
							<Tab label="Fin d'enregistrement"></Tab>
						</Tabs>
						<div className="body">
							{
								form === 0 &&
								<AdultForm object={pere} setObject={setPere} />
							}
							{
								form === 1 &&
								<AdultForm object={mere} setObject={setMere} />
							}
							{
								form === 2 &&
								<AdultForm object={declarant} setObject={setDeclarant} />
							}
							{
								form === 3 &&
								<div className="fin">
									<FormControl>
										<InputLabel id="demo-simple-select-label">{'Nom de l\'officier'}</InputLabel>
										<Select
											labelId="demo-simple-select-label"
											value={officier}
											onChange={(e) => setOfficier(e.target.value)}
										>
											{officierItems.map(item => <MenuItem key={item.id} value={item.id}>{item.information_personnel.nom + ' ' + item.information_personnel.prenom}</MenuItem>)}
										</Select>
									</FormControl>
									{
										chargement
											?
											<Button variant="contained" color="default">Enregistrement en cours...</Button>
											:
											!openDialog &&
											<Button variant="contained" color="primary" onClick={handleSubmit}>Sauvegarder</Button>
									}
								</div>
							}
							<MessageDialog bg={bgDialog} message={messageDialog} open={openDialog} toggle={setOpenDialog} />
						</div>
					</div>
				</div>
			</div>
		</DeclarationLayout>
	);
}

