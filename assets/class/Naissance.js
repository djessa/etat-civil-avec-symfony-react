import { currentDate, currentTime } from '../uses/const.js'

export class Naissance {

	constructor() {
		this.date_declaration = currentDate
		this.heure_declaration = currentTime
		this.type_declaration = ''
		this.numero_jugement = ''
		this.date_jugement = ''
		this.date_naissance = ''
		this.heure_naissance = ''
		this.lieu_naissance = ''
	}
}