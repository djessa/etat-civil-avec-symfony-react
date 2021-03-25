import React, { Component, useState } from 'react';
import SideMenu from "../../components/SideMenu";
import { CssBaseline, createMuiTheme, ThemeProvider, Grid, Table, TableHead, TableRow, TableCell, TableBody, TableFooter, withStyles, TableContainer, IconButton, Button, ButtonGroup, makeStyles } from '@material-ui/core';
import Header from "../../components/Header";
import axios from "axios";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { Link, NavLink } from 'react-router-dom';
import { mini_date } from '../../variables/const';
import { Add, Edit } from '@material-ui/icons';

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

const useStyles = makeStyles({
    appMain: {
        paddingLeft: '200px',
        width: '100%'
    }
});
export default function ContenuCopie(props) {
    const classes = useStyles();
    return (
        <ThemeProvider theme={theme}>
            <SideMenu />
            <div className={classes.appMain}>
                <Header>
                    <Grid item lg={3}>
                        <NavLink to="/administration" className="nav-link">
                            Contenu de copie
                            </NavLink>
                    </Grid>
                </Header>
                <div className="row mt-3">
                    <div className="col-lg-6 mx-auto">
                        <div className="d-flex justify-content-end mb-2">
                            <IconButton variant="contained" className="bg-primary text-white">
                                <Add />
                            </IconButton>
                        </div>
                        <Table className="table">
                            <TableHead className="bg-primary">
                                <TableRow>
                                    <TableCell>Catégorie</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Copie d'acte de naissance</TableCell>
                                    <TableCell><a href="" className="link"><Edit/></a></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
            <CssBaseline />
        </ThemeProvider>
    );
}
