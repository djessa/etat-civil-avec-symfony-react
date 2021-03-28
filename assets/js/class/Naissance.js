import {Personne} from './Personne'

export class Naissance {

	constructor() {
		this.date_declaration = ''
		this._date_declaration = ''
		this.heure_declaration = ''
		this.type_declaration = ''
		this.numero_jugement  = ''
		this.date_jugement = ''
		this.date_naissance = ''
		this._date_naissance = ''
		this.heure_naissance = ''
		this.lieu_naissance = ''
		this.enfant = new Personne(),
		this.pere =  new Personne(),
		this.mere = new Personne(),
		this.officier = '',
		this.declarant = new Personne()
	}

}