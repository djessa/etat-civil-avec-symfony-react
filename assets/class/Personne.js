export class Personne {

	constructor() {
		this.nom = ''
		this.prenom = ''
		this.sexe = ''
		this.profession = ''
		this.residence = ''
	}

}

export class Adult extends Personne {
	constructor() {
		super()
		this.naissance = { date_naissance: '', lieu_naissance: '' }
	}
}
