import React from 'react'
import Header from '../../components/Header'
import AppProvider from '../../components/AppProvider'
import { Link } from "react-router-dom"
import { WEBROOT } from '../../uses/const';
import '../../styles/template_copie.css';


export default function CopieNaissance(props) {
    //  const { id } = props.match.params;
    return (
        <>
            <Header>
                <div className="declaration_nav">
                    <div className="declaration_nav_item">
                        <button className="btn btn-success">Imprimer</button>
                    </div>
                </div>
            </Header>
            <div className="copie">
                <div className="header">
                    <div className="logo">
                        <img className="logo-image" src={WEBROOT + 'images/logo.png'} alt="Logo" />
                    </div>
                    <div className="target text-center">
                        <h1 className="title">Repoblikan'i Madagasikara</h1>
                        <h3>Tanindrazana-Fahafahana-Fandrosoana</h3>
                    </div>
                    <div className="lois">
                        <p>Teny midina tamin'ny 29 desambra 1961 nataon'ny minisitry ny fitsarana sy mpitahiry kasem-panjakana
                           </p>
                    </div>
                </div>
                <div className="section">
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                            <p style={{ fontSize: '0.9em' }}>
                                FARITANY MAHAJANGA <br />
                                FARITRA BOENY <br />
                                DISTRIKTA Mahajanga-I <br />
                                KAOMININA Mahajanga
                           </p>
                        </div>
                        <div>
                            <p>Faha : N01</p>
                            <p>05 Jona 2007</p>
                            <p>Sora-pahaterahana</p>
                            <p>JEAN Dupont</p>
                            <p>02 Jona 2007</p>
                        </div>
                    </div>
                    <div className="contenu col-lg-8">
                        <h3 style={{ fontSize: '1.2em', fontWeight: '700' }} className="text-center">KOPIAN'NY SORA-PIANKOHONANA</h3>
                        <div style={{ marginTop: '20px' }}>
                            <p>Nalaina tamin'ny bokim-piankohonana taona fito sy roa arivo, kaominina Mahajanga izao soratra manaraka izao :</p>
                            <p>
                                Tamin'ny roa jona taona fito sy roa arivo tamin'ny telo ora sy dimy amby roapolo minitra
                                maraina no teraka tao Mahajanga: JEAN Dupont, zazalahy zanak'i JOHN Doe, Informaticien, teraka tao Ambondromamy
                                tamin'ny valo ambin'nyy folo septambra taona valo amby fitopolo sy sivin-jato sy arivo,  monina ao Mahavoky atsimo Mahajanga sy
                                JEANNE Doe, Mpampianatra, teraka teto Mahajanga tamin'ny iray semptambra taona telo amby valopolo sy sivin-jato sy arivo, monina ao Mahavoky atsimo Mahajanga
                            </p>
                            <p>
                                Nosoratana androany dimy jona taona fito sy roa arivo tamin'ny sivy ora sy roapolo minitra
                                , araka ny fanambarana nataon'i RAKIALA Sarah, mpampivelona teraka tao Befelatanana tamin'ny roa
                                ambin'ny folo oktobra taona valo amby diman-polo sy sivin-jato sy arivo, monina ao Mangarivotra Mahajanga izay miara-manao sonia
                                aminay, Toto RAZAFY, Mpiandraikitra sora-piankohonana ao amin'ny kaominina Mahajanga, rehefa novakiana taminy ity soratra ity.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer text-center">
                <p className="text-center">---------- Manaraka ny sonia ----------</p>
                <p className="text-center">Kopia nadika manontolo boky androany fito jona taona fito sy roa arivo</p>
                <p className="float-right mr-4">Ny Mpiandraikitra ny sora-piankohonana</p>
            </div>
        </>
    )
}