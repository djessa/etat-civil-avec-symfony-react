import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from './views/Home';
import Declaration from './views/declaration/Declaration';
import DeclarationNaissance from './views/declaration/DeclarationNaissance';
import NotFound from './views/NotFound';
import { WEBROOT } from './uses/const';
import Registre from './views/Registre';
import Administration from './views/admin/Administraton';
import CopieNaissance from './views/CopieNaissance';
import Agent from './views/admin/agent/Agent';
import Officier from './views/admin/officier/Officier';
import Fiche from './views/Fiche';


export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={WEBROOT} exact component={Home} />
        <Route path={WEBROOT + "declaration"} exact component={Declaration} />
        <Route path={WEBROOT + "declaration/naissance"} exact component={DeclarationNaissance} />
        <Route path={WEBROOT + "registre"} exact component={Registre} />
        <Route path={WEBROOT + "admin"} exact component={Administration} />
        <Route path={WEBROOT + "admin/officiers"} exact component={Officier} />
        <Route path={WEBROOT + "admin/agents"} exact component={Agent} />
        <Route path={WEBROOT + "fiche/:id"} exact component={Fiche} />
        <Route path={WEBROOT + "show/copie/naissance/:id"} exact component={CopieNaissance} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}