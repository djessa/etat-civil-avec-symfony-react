import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from './views/home/Home';
import Declaration from './views/declaration/Declaration';
import DeclarationNaissance from './views/declaration/DeclarationNaissance';
import NotFound from './views/NotFound';
import { WEBROOT } from './uses/const';
import Registre from './views/registre/Registre';
import RegistreNaissance from './views/registre/RegistreNaissance';
import Administration from './views/administration/Administraton';
import Acte from './views/administration/Acte';
import Acte_new from './views/administration/Acte_new';
import CopieNaissance from './views/affichage/CopieNaissance';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={WEBROOT} exact component={Home} />
        <Route path={WEBROOT + "declaration"} exact component={Declaration} />
        <Route path={WEBROOT + "declaration/naissance"} exact component={DeclarationNaissance} />
        <Route path={WEBROOT + "registre"} exact component={Registre} />
        <Route path={WEBROOT + "registre/naissance"} exact component={RegistreNaissance} />
        <Route path={WEBROOT + "administration"} exact component={Administration} />
        <Route path={WEBROOT + "administration/acte"} exact component={Acte} />
        <Route path={WEBROOT + "administration/acte_new"} exact component={Acte_new} />
        <Route path={WEBROOT + "show/copie/naissance/:id"} exact component={CopieNaissance} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}