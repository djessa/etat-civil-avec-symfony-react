import React, { Component, useState } from 'react';
import SideMenu from "../../components/SideMenu";
import { CssBaseline, createMuiTheme, ThemeProvider, Grid, Table, TableHead, TableRow, TableCell, TableBody, TableFooter, withStyles, TableContainer, IconButton, Button, ButtonGroup } from '@material-ui/core';
import Header from "../../components/Header";
import axios from "axios";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { Link, NavLink } from 'react-router-dom';
import { mini_date } from '../../variables/const';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#333996",
            light: '#3c44b126'
        },
        secondary: {
            main: "#f83245",
            light: '#f8324526'
        },
        background: {
            default: "#f4f5fd"
        },
    },
    overrides: {
        MuiAppBar: {
            root: {
                transform: 'translateZ(0)'
            }
        }
    },
    props: {
        MuiIconButton: {
            disableRipple: true
        }
    }
});

const styles = theme => ({
    appMain: {
        paddingLeft: '200px',
        width: '100%'
    }
});

class Administration extends Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        const { classes } = this.props;
        return (
            <ThemeProvider theme={theme}>
                <SideMenu />
                <div className={classes.appMain}>
                    <Header>
                        <Grid item lg={3}>
                            <NavLink to="/copie" className="nav-link">
                                Contenu de copie
                            </NavLink>
                        </Grid>   
                    </Header>
                </div>
                <CssBaseline />
            </ThemeProvider>
        );
    }
}

export default withStyles(styles)(Administration);

