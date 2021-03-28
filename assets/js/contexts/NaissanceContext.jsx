import React, {createContext} from 'react'

export const NaissanceContext = createContext()

export default class NaissanceContextProvider extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			naissances: []
		}
	}

	declare_naissance(naissance) {
		console.log(naissance)
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