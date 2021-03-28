import React from 'react'
import AppProvider from '../AppProvider'
import Header from '../Header'
import { Link } from "react-router-dom"

export default function DeclarationLayout({children}) {
	return (
		<AppProvider>
			<Header>
				<div className="declaration_nav">
					<div className="declaration_nav_item"><Link to="/declaration/naissance">Naissance</Link></div>
					<div className="declaration_nav_item"><Link to="/declaration/deces">Décès</Link></div>
					<div className="declaration_nav_item"><Link to="/declaration/mariage">Mariage</Link></div>
					<div className="declaration_nav_item"><Link to="/declaration/divorce">Divorce</Link></div>
				</div>
			</Header>
			<div className="declaration_content">{children}</div>
		</AppProvider>
	)
}