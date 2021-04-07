import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from './views/Home';
import Declaration from './views/declaration/Declaration';
import DeclarationNaissance from './views/declaration/DeclarationNaissance';
import NotFound from './views/NotFound';
import { WEBROOT } from './uses/const';
import Registre from './views/Registre';
import Administration from './views/administration/Administraton';
import CopieNaissance from './views/CopieNaissance';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={WEBROOT} exact component={Home} />
        <Route path={WEBROOT + "declaration"} exact component={Declaration} />
        <Route path={WEBROOT + "declaration/naissance"} exact component={DeclarationNaissance} />
        <Route path={WEBROOT + "registre"} exact component={Registre} />
        <Route path={WEBROOT + "administration"} exact component={Administration} />
        <Route path={WEBROOT + "show/copie/naissance/:id"} exact component={CopieNaissance} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}