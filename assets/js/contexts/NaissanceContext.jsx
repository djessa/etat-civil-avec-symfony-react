import React, {createContext} from 'react'
import axios from 'axios'

export const NaissanceContext = createContext()

export default class NaissanceContextProvider extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			naissances: [],
			officiers: []
		}
		this.recupereOfficiers()
	}

	declare_naissance(naissance) {
		naissance.officier = this.state.officiers.filter((o) => o.id === naissance.officier)
		if(naissance.date_jugement === '') {
			naissance.date_jugement = null
		}
		axios.post('/naissance/declaration', naissance)
		.then((response) => {
			console.log(response.data)
		})
		.catch((error) => {
			console.log(error)
		})
	}

	recupereOfficiers () {
		axios.get('/officier')
		.then((response) => this.setState({officiers: response.data}))
		.catch((error) => console.log(error))
	}

	render() {
		return (
			<NaissanceContext.Provider value={{
				...this.state,
				declare_naissance: this.declare_naissance.bind(this)
			}}>
				{this.props.children}
			</NaissanceContext.Provider>
		)
	}
}