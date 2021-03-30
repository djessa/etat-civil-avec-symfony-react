import React, { useState, useEffect } from 'react';
import NaissanceForm from '../../components/NaissanceForm';
import EnfantForm from '../../components/EnfantForm';
import AdultForm from '../../components/AdultForm';
import DeclarationLayout from '../../layouts/DeclarationLayout';
import { Button, Tab, Tabs } from '@material-ui/core'
import { Personne, Adult } from '../../class/Personne';
import SelectControl from '../../components/SelectControl';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { WEBROOT } from '../../uses/const';
import axios from 'axios';
import MessageDialog from '../../components/MessageDialog';


export default function DeclarationNaissance() {
	const [openDialog, setOpenDialog] = useState(false)
	const [messageDialog, setMessageDialog] = useState('')
	const [bgDialog, setBgDialog] = useState('')
	const [naissance, setNaissance] = useState({});
	const [pere, setPere] = useState(new Adult());
	const [mere, setMere] = useState(new Adult());
	const [declarant, setDeclarant] = useState(new Adult());
	const [enfant, setEnfant] = useState(new Personne());
	const [form, setForm] = useState(0);
	const [officierItems, setOfficiersItems] = useState([]);
	const [officier, setOfficier] = useState('');


	React.useEffect(() => {
		getOfficiers();
	}, []);

	const getOfficiers = () => {
		axios.get(WEBROOT + 'officier')
			.then(response => setOfficiersItems(response.data))
	}

	const handleSubmit = () => {
		const data = { naissance, enfant, pere, mere, declarant, officier }
		console.log(data)
		axios.post(WEBROOT + 'declaration/naissance', data)
			.then((response) => {
				setMessageDialog(response.data.message)
				if (response.data.status === 200) {
					setBgDialog('green')
					setNaissance({})
					setEnfant(new Personne())
					setPere(new Adult())
					setMere(new Adult())
					setDeclarant(new Adult())
					setOfficier('')
				}
				else setBgDialog('red')
				setOpenDialog(true)
			})
			.catch((error) => {
				setMessageDialog('Impossible d\'enregistrer');
				setBgDialog('red');
				setOpenDialog(true);
			})
	}

	return (
		<DeclarationLayout>
			<div className="declaration_naissance">
				<div className="information_naissance">
					<NaissanceForm setObject={setNaissance} />
					<EnfantForm setObject={setEnfant} />
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
											{officierItems.map(item => <MenuItem key={item.id} value={item.id}>{item.nom + ' ' + item.prenom}</MenuItem>)}
										</Select>
									</FormControl>
									<Button variant="contained" color="primary" onClick={handleSubmit}>Sauvegarder</Button>
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

