import React, { Component, useContext, useState } from 'react';
import { Grid, Button } from '@material-ui/core';
import Header from "../../components/Header";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { theme } from '../../variables/Styles';
import TableNaissance from '../../components/TableNaissance';
import NaissanceContextProvider, { NaissanceContext } from '../../contexts/NaissanceContext';

const Index = () => {

    const context = useContext(NaissanceContext);

    return (
        <>
            <Header>
                <Grid container justify="space-between">
                    <Grid item lg={4}><h4>Régistre des naissances</h4></Grid>
                    <Grid item lg={8}>
                    </Grid>
                </Grid>
            </Header>
            <TableNaissance rows={context.rows} />
            <div style={{ margin: '25px' }}>
                {
                    context.numPage > 0 &&
                    <Button style={{ marginRight: '25px' }} color="primary" variant="outlined" onClick={context.prevPage}>
                        <ArrowBackIcon />
                    </Button>
                }
                {
                    context.numPage +1 < context.nbrePage &&
                    <Button color="primary" variant="outlined" onClick={context.nextPage}>
                        <ArrowForwardIcon />
                    </Button>
                }
            </div>
        </>
    );
}

class Naissances extends Component {

    render() {

        return (
            <NaissanceContextProvider>
                <Index />
            </NaissanceContextProvider>
        );
    }
}

export default Naissances;
