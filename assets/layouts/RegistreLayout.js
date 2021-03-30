import React from 'react'
import AppProvider from '../components/AppProvider'
import Header from '../components/Header'
import { Link } from "react-router-dom"
import { WEBROOT } from '../uses/const';


export default function RegistreLayout({ children }) {
    return (
        <AppProvider>
            <Header>
                <div className="declaration_nav">
                    <div className="declaration_nav_item"><Link to={WEBROOT + "registre/naissance"}>Régistre de naissance</Link></div>
                </div>
            </Header>
            <div className="declaration_content">{children}</div>
        </AppProvider>
    )
}