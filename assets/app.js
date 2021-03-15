/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';

// start the Stimulus application
import './bootstrap';

import React, {Component} from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import Deces from './pages/Deces';
import FicheIndividu from './pages/FicheIndividu';
import Mariages from './pages/Mariages';
import Naissances from './pages/Naissances';
import NotFound from './pages/NotFound';
import { Switch } from '@material-ui/core';


const App = () => (
    
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={FicheIndividu} />
            <Route path="/naissances" exact component= {Naissances} />
            <Route path="/mariages" exact component= {Mariages}/>
            <Route path="/deces" exact component= {Deces}/>
            <Route component={NotFound} />
        </Switch>
    </BrowserRouter>
)


ReactDom.render(<App/>, document.getElementById('root'));
