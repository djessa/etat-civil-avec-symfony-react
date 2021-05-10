import React, { useRef, useEffect } from 'react';
import AppProvider from '../components/AppProvider';
import Header from '../components/Header';
import { WEBROOT } from '../uses/const';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

const StatNaissance = () => {
    const graph = document.getElementById('graph').getContext('2d');
    const myChart = new Chart(graph, {
        type: "bar",
        data: {
            labels: [
                "2017",
                "2018",
                "2019",
                "2020",
                "2021"
            ],
            datasets: [{
                label: "Nombre de naissance",
                data: [10, 19, 25, 14, 43],
            }],
        },
    });
    return (
        <AppProvider>
            <Header>
                <Button component={Link} to={WEBROOT + 'stat_naissance'}>
                    Naissance
                </Button>
            </Header>
            <Bar
                data={data}
                width={100}
                height={50}
                options={{ maintainAspectRatio: false }}
            />
        </AppProvider>
    );
}

export default StatNaissance;