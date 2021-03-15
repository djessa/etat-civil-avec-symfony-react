import { Grid } from '@material-ui/core'
import React, { Component } from 'react'
import Header from '../components/Header'


class Naissances extends Component {

    render() {
        return (
            <div>
                <Header>
                    <Grid container justify="space-between">
                        <Grid item>
                            <h2>Régistre des naissances</h2>
                        </Grid>
                        <Grid item>
                            
                        </Grid>
                    </Grid>
                </Header>
            </div>
        );
    }
}

export default Naissances;