import React from 'react'
import AppProvider from '../AppProvider'
import Header from '../Header'
import { NavLink } from "react-router-dom"

export default function DeclarationLayout({children}) {
	return (
		<AppProvider>
			<Header>
				<div className="declaration_nav">
					<div className="declaration_nav_item"><NavLink to="/declaration/naissance">Naissance</NavLink></div>
					<div className="declaration_nav_item"><NavLink to="/declaration/deces">Décès</NavLink></div>
					<div className="declaration_nav_item"><NavLink to="/declaration/mariage">Mariage</NavLink></div>
					<div className="declaration_nav_item"><NavLink to="/declaration/divorce">Divorce</NavLink></div>
				</div>
			</Header>
			<div className="declaration_content">{children}</div>
		</AppProvider>
	)
}