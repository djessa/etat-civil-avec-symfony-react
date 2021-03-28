import React from 'react'
import DeclarationLayout from '../../components/Layouts/DeclarationLayout'
import NaissanceContextProvider  from '../../contexts/NaissanceContext'
import NaissanceForm from '../../components/NaissanceForm'

export default function DeclarationNaissance() {
	return (
		<DeclarationLayout>
			<NaissanceContextProvider>
				<NaissanceForm />
			</NaissanceContextProvider>
		</DeclarationLayout>
	)
}