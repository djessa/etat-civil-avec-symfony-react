import React, { Component } from 'react'
import { Grid } from '@material-ui/core';
import Header from "../components/Header";
import AppProvider from '../components/AppProvider';

export default function Home () {
    return (
        <AppProvider>
          <Header> 
          </Header>
        </AppProvider>
    );
}
