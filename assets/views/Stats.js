import React, { useState } from 'react';
import AppProvider from '../components/AppProvider';
import Header from '../components/Header';
import { WEBROOT } from '../uses/const';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

const Stats = () => {
    const [data, setData] = useState();
    return (
        <AppProvider>
            <Header>
                <Button component={Link} to={WEBROOT + 'stat_naissance'}>
                    Naissance
                </Button>
            </Header>
        </AppProvider>
    );
}

export default Stats;