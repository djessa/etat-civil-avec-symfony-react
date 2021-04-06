import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import Header from '../../components/Header'
import AppProvider from '../../components/AppProvider'
import { Link } from "react-router-dom"
import { WEBROOT } from '../../uses/const';
import '../../styles/template_copie.css';
import axios from 'axios';
import { daty } from '../../uses/convert';

class ComponentToPrint extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            chargement: false
        }
        this.fetch();
    }

    fetch() {
        axios.get(WEBROOT + 'api/naissance/' + this.props.id)
            .then(response => this.setState({ data: response.data, chargement: true }))
            .catch(error => console.log(error))
    }

    render() {
        const { data, chargement } = this.state;
        return <div className="copie row">
            {
                (chargement)
                    ?
                    <>
                        <div className="gauche col-lg-3 col-md-4 col-sm-4">
                            <div className="titre">
                                <div className="local">
                                    <ul>
                                        <li>FARITANY </li>
                                        <li>FARITRA </li>
                                        <li>DISTRIKA </li>
                                        <li>KAOMININA </li>
                                    </ul>
                                    <ul>
                                        <li>: Mahajanga</li>
                                        <li>: BOENY</li>
                                        <li>: Mahajanga-I</li>
                                        <li>: Mahajanga</li>
                                    </ul>
                                </div>
                                <p className="text-center">--------------------</p>
                                <h5 className="text-center">SERVICE ETAT CIVIL</h5>
                                <p className="text-center">----------------</p>
                                <p className="text-center">
                                    <img src={WEBROOT + "images/logo.png"} alt="" />
                                </p>
                            </div>
                            <div className="marge">
                                <div className="naissance">
                                    <ul>
                                        <li>Faha : {data.id}</li>
                                        <li>{daty(data.enfant.date_naissance)}</li>
                                        <li>Sora-pahaterahana</li>
                                        <li>{(data.enfant).nom + ' ' + (data.enfant).prenom}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="droit col-lg-9 col-md-8 col-sm-8">
                            <div className="lois">
                                <p>Teny midina tamin'ny 29 desambra 1961 nataon'ny minisitry ny fitsarana sy mpitahiry kasem-panjakana
                                </p>
                            </div>
                            <div className="titre text-center">
                                <h3>REPOBLIKAN'I MADAGASIKARA</h3>
                                <p>Tanindrazana-Fahafahana-Fandrosoana</p>
                                <p>----------</p>
                            </div>
                            <div style={{ marginTop: '150px' }}>
                                <h5 className="text-center mb-3">KOPIAN'NY
                                SORA-PIANKOHONANA
                                </h5>
                                <div style={{ fontSize: '1.1em' }}>
                                    <p>Nalaina tamin'ny bokim-piankohonana taona fito sy roa arivo, kaominina Mahajanga izao soratra
                            manaraka izao :</p>
                                    <p>
                                        Tamin'ny roa jona taona fito sy roa arivo tamin'ny telo ora sy dimy amby roapolo minitra
                                        maraina no teraka tao {data.enfant.lieu_naissance}: {data.enfant.nom + ' ' + data.enfant.prenom}, {data.enfant.sexe == 'Masculin' ? 'zazalahy' : 'zazavavy'} zanak'i {(data.parents)[0].nom + ' ' + (data.parents)[0].prenom}, {(data.parents)[0].profession}, teraka
                                        tao
                                        {(data.parents)[0].lieu_naissance + ' '}
                                        tamin'ny valo ambin'ny folo septambra taona valo amby fitopolo sy sivin-jato sy arivo, monina
                                        ao
                                        {' ' + (data.parents)[0].residence + ' '} sy
                                        {(data.parents)[1].nom + ' ' + (data.parents)[1].prenom + ' '}, {(data.parents)[1].profession}, teraka tao {(data.parents)[1].lieu_naissance} tamin'ny iray semptambra taona telo amby
                                        valopolo sy
                                        sivin-jato sy arivo, monina ao {(data.parents)[1].residence}
                                    </p>
                                    <p>
                                        Nosoratana androany dimy jona taona fito sy roa arivo tamin'ny sivy ora sy roapolo minitra
                                        {
                                            (data.declarant) && `
                                        , araka ny fanambarana nataon'i ${data.declarant.nom + ' ' + data.declarant.prenom}, ${data.declarant.profession} teraka tao ${data.declarant.lieu_naissance} tamin'ny roa
                                        ambin'ny folo oktobra taona valo amby diman-polo sy sivin-jato sy arivo, monina ao ${data.declarant.residence} izay miara-manao sonia
                                        aminay
                                        `
                                        }, {data.officier.information_personnel.nom + ' ' + data.officier.information_personnel.prenom}, Mpiandraikitra sora-piankohonana ao amin'ny kaominina Mahajanga, rehefa
                                        novakiana taminy ity soratra ity.
                        </p>
                                </div>
                            </div>
                            <div className="text-center">
                                <p className="text-center">---------- Manaraka ny sonia ----------</p>
                                <p className="text-center">Kopia nadika manontolo boky androany fito jona taona fito sy roa arivo</p>
                                <p className="float-right m-5">Ny Mpiandraikitra ny sora-piankohonana</p>
                            </div>
                        </div>
                    </>
                    :
                    <p></p>
            }
        </div>
    }
}

export default function CopieNaissance(props) {
    const { id } = props.match.params;
    const componentRef = useRef();
    return (
        <>
            <Header>
                <div className="declaration_nav">
                    <div className="declaration_nav_item">
                        <ReactToPrint
                            trigger={() => <button className="btn btn-success">Imprimer</button>}
                            content={() => componentRef.current}
                        />
                    </div>
                </div>
            </Header>
            <ComponentToPrint ref={componentRef} id={id} />
        </>
    )
}