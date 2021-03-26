import { CssBaseline, Grid } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import axios from 'axios';
import React, { Component, createContext } from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../components/Header';
import SideMenu from '../components/SideMenu';
import { theme, useStyles } from '../variables/Styles';

export const CopieContext = createContext();

class CopieContextProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            copies: []
        }
        this.showCopie();
    }
    
    addCopie(category, content) {
        axios.post('/copie/new', {category, content})
            .then((response) => console.log(response))
            .catch((error) => console.log(error))
    }

    getCategoryCopie(id) {
        const copie = (this.state.copies).filter(copie => copie.id == id);
        return copie.category;
    }

    getContentCopie(id) {
        const copie = (this.state.copies).filter(copie => copie.id == id);
        return copie.content;
    }

    editCopie() {

    }

    showCopie() {
        axios.get('/copie')
            .then((response) => {
                this.setState({copies: response.data})
            })
            .catch((error) => console.log(error))
    }

    deleteCopie(id) {
        axios.get('/copie/delete/' + id)
            .then((response) => this.showCopie())
            .catch((error) => console.log(error))
    }

    render() {
    
        return (
            <CopieContext.Provider value={{
                ...this.state,
                addCopie: this.addCopie.bind(this),
                editCopie: this.editCopie.bind(this),
                deleteCopie: this.deleteCopie.bind(this),
                getCategoryCopie: this.getCategoryCopie.bind(this),
                getContentCopie: this.getContentCopie.bind(this)
            }}>
                <ThemeProvider theme={theme}>
                    <SideMenu />
                    <div style={{paddingLeft: '200px', width: '100%'}}>
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

export default CopieContextProvider;