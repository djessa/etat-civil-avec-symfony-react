import React, {Component, useState} from 'react';
import SideMenu from "../../components/SideMenu";
import { CssBaseline, createMuiTheme, ThemeProvider, Grid, Table, TableHead, TableRow, TableCell, TableBody, TableFooter, withStyles, TableContainer,IconButton, Button, ButtonGroup } from '@material-ui/core';
import Header from "../../components/Header";
import axios from "axios";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

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
    overrides:{
      MuiAppBar:{
        root:{
          transform:'translateZ(0)'
        }
      }
    },
    props:{
      MuiIconButton:{
        disableRipple:true
      }
    }
});

const styles = theme => ({
    appMain: {
        paddingLeft: '275px',
        width: '100%'
    }
});


class Naissances extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fiches: [],
            page: 1
        }
        this.readFiches();
        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
    }
    next () {
        this.setState({page: (this.state.page) + 1});
        this.readFiches();
        console.log(this.state.fiches, this.state.page);
    }
    prev () {
        this.setState({page: (this.state.page) - 1});
        this.readFiches(this.state.page);
    }
    readFiches(page) {
        axios.get('/births', {params: {page: this.state.page}})
            .then((response) => {
                this.setState(
                    {fiches: response.data}
                );
            })
            .catch((error) => {
                console.log(error)
            });
    }
    render() {
        const {classes} = this.props;
        return (
            <ThemeProvider theme={theme}>
                <SideMenu/>
                <div className={classes.appMain}>
                    <Header>
                        <Grid container justify="space-between">
                            <Grid item lg={4}><h3>Régistre des naissances</h3></Grid>
                            <Grid item lg={8}>
                            </Grid>
                        </Grid>
                    </Header>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow style={{backgroundColor: '#aaa'}}>
                                    <TableCell style={{fontWeight: 'bold'}}>Nom</TableCell>
                                    <TableCell style={{fontWeight: 'bold'}}>Prénom</TableCell>
                                    <TableCell style={{fontWeight: 'bold'}}>Sexe</TableCell>
                                    <TableCell style={{fontWeight: 'bold'}}>Date de naissance</TableCell>
                                    <TableCell style={{fontWeight: 'bold'}}>Lieu de naissance</TableCell>
                                    <TableCell style={{fontWeight: 'bold'}}>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.fiches.map((data, index) => {
                                    let fiche = JSON.parse(data);
                                    let person = JSON.parse(fiche.enfant);
                                    return<TableRow key={index}>
                                        <TableCell>{person.first_name}</TableCell>
                                        <TableCell>{person.last_name}</TableCell>
                                        <TableCell>{person.sexe}</TableCell>
                                        <TableCell>{person.birthdate}</TableCell>
                                        <TableCell>{person.birthplace}</TableCell>
                                        <TableCell>
                                            <Button>
                                                Afficher
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                })}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell>
                                        <Button color="primary" variant="outlined" onClick={this.prev}>
                                            <ArrowBackIcon/>
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button color="primary" variant="outlined" onClick={this.next}>
                                            <ArrowForwardIcon/>
                                        </Button>  
                                    </TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>
                </div>
                <CssBaseline/>
            </ThemeProvider>
        );
    }
}

export default withStyles(styles) (Naissances);
