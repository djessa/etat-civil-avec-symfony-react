import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from './views/home/Home';
import Declaration from './views/declaration/Declaration';
import DeclarationNaissance from './views/declaration/DeclarationNaissance';
import NotFound from './views/NotFound';
import { WEBROOT } from './uses/const';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={WEBROOT} exact component={Home} />
        <Route path={WEBROOT + "declaration"} exact component={Declaration} />
        <Route path={WEBROOT + "declaration/naissance"} exact component={DeclarationNaissance} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}