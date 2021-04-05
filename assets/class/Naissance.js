import { currentDate, currentTime } from '../uses/const.js'

export class Naissance {

	constructor() {
		this.date_declaration = currentDate
		this.type_declaration = ''
		this.numero_jugement = ''
		this.date_jugement = ''
		this.heure_declaration = currentTime
		this.heure_naissance = ''
	}
}