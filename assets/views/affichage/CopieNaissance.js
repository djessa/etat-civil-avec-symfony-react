import React from 'react'
import Header from '../../components/Header'
import AppProvider from '../../components/AppProvider'
import { Link } from "react-router-dom"
import { WEBROOT } from '../../uses/const';


export default function CopieNaissance(props) {
    const { id } = props.match.params;
    return (
        <AppProvider>
            <Header>
                <div className="declaration_nav">
                    <div className="declaration_nav_item">
                        <button className="btn btn-success">Imprimer</button>
                    </div>
                </div>
            </Header>
            <div className="declaration_content">
                <div className="row">
                    <div className="row">
                        <div className="col-lg-3"></div>
                        <div className="col-lg-9"></div>
                    </div>
                </div>
                <div className="row"></div>
            </div>
        </AppProvider>
    )
}