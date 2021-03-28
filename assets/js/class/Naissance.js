import {Personne} from './Personne'

export class Naissance {

	constructor() {
		this.date_declaration = ''
		this.heure_declaration = ''
		this.type_declaration = ''
		this.numero_jugement  = null
		this.date_jugement = null
		this.date_naissance = ''
		this.heure_naissance = ''
		this.lieu_naissance = ''
		this.enfant = new Personne()
		this.parents =  [new Personne(), new Personne()]
		this.officier = ''
		this.declarant = new Personne()
	}
}