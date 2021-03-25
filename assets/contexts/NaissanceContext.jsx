import { CssBaseline, Grid } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import axios from 'axios';
import React, { Component, createContext } from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../components/Header';
import SideMenu from '../components/SideMenu';
import { theme, useStyles } from '../variables/Styles';

export const NaissanceContext = createContext();

class NaissanceContextProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fiches: []
        }
    }

    readFiches() {
        axios.get('/births')
            .then((response) => {
                let rows = [];
                if ((response.data).length >= ROW_PER_PAGE)
                    rows = (response.data).slice(0, ROW_PER_PAGE);
                else
                    rows = response.data;
                const nbrePage = Math.round(((response.data).length) / ROW_PER_PAGE);
                this.setState({ rows, nbrePage });
            })
            .catch((error) => {
                console.log(error)
            });
    }

    render() {

        return (
            <CopieContext.Provider value={{
                ...this.state,
                addCopie: this.addCopie.bind(this),
                editCopie: this.editCopie.bind(this),
                showCopie: this.showCopie.bind(this)
            }}>
                <ThemeProvider theme={theme}>
                    <SideMenu />
                    <div style={{ paddingLeft: '200px', width: '100%' }}>
                        <Header>
                            <Grid item lg={3}>
                                <NavLink to="/administration" className="nav-link">
                                    Contenu de copie
                                </NavLink>
                            </Grid>
                        </Header>
                        {this.props.children}
                    </div>
                    <CssBaseline />
                </ThemeProvider>
            </CopieContext.Provider>
        );
    }
}

export default NaissanceContextProvider;