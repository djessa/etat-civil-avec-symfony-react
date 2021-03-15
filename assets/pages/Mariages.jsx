import { Grid } from '@material-ui/core'
import React, { Component } from 'react'
import Header from '../components/Header'
class Mariages extends Component {
    render() {
        return (
            <div>
            <div>
                <Header>
                    <Grid container justify="space-between">
                        <Grid item>
                            <h2>Régistre des mariages</h2>
                        </Grid>
                        <Grid item>
                            
                        </Grid>
                    </Grid>
                </Header>
            </div>
            </div>
        );
    }
}

export default Mariages;
