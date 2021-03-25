import { CssBaseline, Grid } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import axios from 'axios';
import React, { Component, createContext } from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../components/Header';
import SideMenu from '../components/SideMenu';
import { theme, useStyles } from '../variables/Styles';

const ROW_PER_PAGE = 7;

export const NaissanceContext = createContext();

class NaissanceContextProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fiches: [],
            rows: [],
            nbrePage: 0,
            numPage: 0
        }
        this.readFiches();
    }

    nextPage() {
        if (this.state.numPage + 1 < this.state.nbrePage) {
            let numPage = this.state.numPage;
            numPage = numPage + 1;
            const rows = (this.state.fiches).slice(numPage * ROW_PER_PAGE, (numPage * ROW_PER_PAGE) + ROW_PER_PAGE);
            this.setState({ numPage, rows });
        }
    }

    prevPage() {
        if (this.state.numPage != 0) {
            let numPage = this.state.numPage;
            numPage = numPage - 1;
            const rows = (this.state.fiches).slice(numPage * ROW_PER_PAGE, (numPage * ROW_PER_PAGE) + ROW_PER_PAGE);
            this.setState({ numPage, rows });
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
                this.setState({ rows, nbrePage , fiches: response.data});
            })
            .catch((error) => {
                console.log(error)
            });
    }

    render() {

        return (
            <NaissanceContext.Provider value={{
                ...this.state,
                nextPage: this.nextPage.bind(this),
                prevPage: this.prevPage.bind(this)
            }}>
                <ThemeProvider theme={theme}>
                    <SideMenu />
                    <div style={{ paddingLeft: '200px', width: '100%' }}>
                        {this.props.children}
                    </div>
                    <CssBaseline />
                </ThemeProvider>
            </NaissanceContext.Provider>
        );
    }
}

export default NaissanceContextProvider;