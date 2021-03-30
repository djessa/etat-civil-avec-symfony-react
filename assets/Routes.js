import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from './views/home/Home';
import Declaration from './views/declaration/Declaration';
import DeclarationNaissance from './views/declaration/DeclarationNaissance';
import NotFound from './views/NotFound';
import { WEBROOT } from './uses/const';
import Registre from './views/registre/Registre';
import RegistreNaissance from './views/registre/RegistreNaissance';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={WEBROOT} exact component={Home} />
        <Route path={WEBROOT + "declaration"} exact component={Declaration} />
        <Route path={WEBROOT + "declaration/naissance"} exact component={DeclarationNaissance} />
        <Route path={WEBROOT + "registre"} exact component={Registre} />
        <Route path={WEBROOT + "registre/naissance"} exact component={RegistreNaissance} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}