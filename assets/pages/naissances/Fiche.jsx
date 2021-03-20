import React from 'react';
import axios from 'axios';
import SideMenu from "../../components/SideMenu";
import { CssBaseline, createMuiTheme, ThemeProvider, Grid, withStyles, TableContainer,IconButton, Button, ButtonGroup } from '@material-ui/core';
import Header from "../../components/Header";
import  {date_to_string} from  '../../variables/const';

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


class Fiche extends React.Component {

	constructor(props) {
		super(props);
		this.state = {data: {}};
		this.fetchData();
	}

	fetchData() {
		axios.get('/birth/' + (this.props.match.params.id))
			 .then((response) => {
			 	  this.setState({data: response.data});
			 })
			 .catch((error) => {
			 	 console.log(error);
			 })
	}

	render() {
		const {classes} = this.props;
		const {data} = this.state;
		return <ThemeProvider theme={theme}>
            <SideMenu/>
            <div className={classes.appMain}>
                <Header>
                	<Grid container justify="space-between">
                        <Grid item lg={6}><b>Date de déclaration de naissance:</b> {date_to_string(data.date_declaration)}</Grid>
                        <Grid item lg={6}><b>Type de déclaration:</b> {data.type_declaration}</Grid>
                    </Grid>
                </Header>
			</div>
		    <CssBaseline/>
        </ThemeProvider>
	}
}


export default withStyles(styles) (Fiche);