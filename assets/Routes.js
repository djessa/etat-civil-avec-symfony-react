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
import AddOfficier from './views/admin/officier/AddOfficier';
import ListOfficier from './views/admin/officier/ListOfficier';
import EditOfficier from './views/admin/officier/EditOfficier';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={WEBROOT} exact component={ListOfficier} />
        <Route path={WEBROOT + "declaration"} exact component={Declaration} />
        <Route path={WEBROOT + "declaration/naissance"} exact component={DeclarationNaissance} />
        <Route path={WEBROOT + "registre"} exact component={Registre} />
        <Route path={WEBROOT + "admin"} exact component={Administration} />
        <Route path={WEBROOT + "show/copie/naissance/:id"} exact component={CopieNaissance} />
        <Route path={WEBROOT + "admin/officier/new"} exact component={AddOfficier} />
        <Route path={WEBROOT + "admin/officier/edit"} exact component={EditOfficier} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}