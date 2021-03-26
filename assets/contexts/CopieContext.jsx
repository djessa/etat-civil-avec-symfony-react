import { CssBaseline, Grid } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
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
    }
    
    addCopie(category, content) {
        const copies = [...(this.state.copies).slice(), {category, content}];
        this.setState({copies});
        console.log(this.state.copies);
    }

    editCopie() {

    }

    showCopie() {
    
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