import React, {Component, useState} from 'react';
import SideMenu from "../../components/SideMenu";
import { CssBaseline, createMuiTheme, ThemeProvider, Grid, Table, TableHead, TableRow, TableCell, TableBody, TableFooter, withStyles, TableContainer,IconButton, Button, ButtonGroup } from '@material-ui/core';
import Header from "../../components/Header";
import axios from "axios";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { Link } from 'react-router-dom';
import  { mini_date } from  '../../variables/const';

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
        paddingLeft: '200px',
        width: '100%'
    }
});

const ROW_PER_PAGE = 7;

class Naissances extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fiches: [],
            numPage: 0,
            nbrePage: 0,
            rows: []
        }
        this.readFiches();
    }

    next () {
        if(this.state.numPage  < this.state.nbrePage) {
            let numPage = this.state.numPage;
            numPage = numPage + 1;
            const rows = (this.state.fiches).slice(numPage * ROW_PER_PAGE, (numPage * ROW_PER_PAGE) +ROW_PER_PAGE);
            this.setState({numPage, rows});
        }
        console.log(this.state.numPage)
    }

    prev () {
        if (this.state.numPage !== 0) {
            let numPage = this.state.numPage;
            numPage = numPage - 1;
            const rows = (this.state.fiches).slice(numPage * ROW_PER_PAGE, (numPage * ROW_PER_PAGE) +ROW_PER_PAGE);
            this.setState({numPage, rows});
        }
        console.log(this.state.numPage)
    }

    readFiches() {
        axios.get('/births')
            .then((response) => {
                this.setState(
                    {
                        fiches: response.data,
                        rows: (response.data).slice(0, ROW_PER_PAGE),
                        nbrePage: Math.round(((response.data).length) / ROW_PER_PAGE)
                    }
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
                                    <TableCell style={{fontWeight: 'bold'}}>ID</TableCell>
                                    <TableCell style={{fontWeight: 'bold'}}>Nom</TableCell>
                                    <TableCell style={{fontWeight: 'bold'}}>Prénom</TableCell>
                                    <TableCell style={{fontWeight: 'bold'}}>Sexe</TableCell>
                                    <TableCell style={{fontWeight: 'bold'}}>Date de naissance</TableCell>
                                    <TableCell style={{fontWeight: 'bold'}}>Lieu de naissance</TableCell>
                                    <TableCell style={{fontWeight: 'bold'}}>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.rows.map((data, index) => {
                                    let fiche = JSON.parse(data);
                                    let person = JSON.parse(fiche.enfant);
                                    return<TableRow key={index}>
                                        <TableCell>{person.id}</TableCell>
                                        <TableCell>{person.first_name}</TableCell>
                                        <TableCell>{person.last_name}</TableCell>
                                        <TableCell>{person.sexe}</TableCell>
                                        <TableCell>{mini_date(person.birthdate)}</TableCell>
                                        <TableCell>{person.birthplace}</TableCell>
                                        <TableCell>
                                            <Button component={Link} to={'/fiche/' + fiche.id }>
                                                Afficher
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                })}
                            </TableBody> 
                        </Table>
                    </TableContainer>
                    <div style={{margin: '25px'}}>
                        <Button style={{marginRight: '25px'}} color="primary" variant="outlined" onClick={this.prev.bind(this)}>
                            <ArrowBackIcon/>
                        </Button>
                        <Button color="primary" variant="outlined"  onClick={this.next.bind(this)}>
                            <ArrowForwardIcon/>
                        </Button> 
                    </div>
                </div>
                <CssBaseline/>
            </ThemeProvider>
        );
    }
}

export default withStyles(styles) (Naissances);
