import React from 'react'
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import Deces from "./pages/deces/Deces";
import Mariages from './pages/mariages/Mariages';
import Naissances from './pages/naissances/Naissances';
import NotFound from './pages/NotFound';
import './styles/app.css';
import Divorces from './pages/divorce/Divorces';
import NouveauNaissance from './pages/naissances/NouveauNaissance';
import NouveauMariage from './pages/mariages/NouveauMariage';
import NouveauDivorce from './pages/divorce/NouveauDivorce';
import NouveauDeces from './pages/deces/NouveauDeces';
import Home from './pages/Home';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/naissances" exact component={Naissances} />
      <Route path="/declaration_naissance" exact component={NouveauNaissance} />
      <Route path="/mariages" exact component={Mariages} />
      <Route path="/declaration_mariage" exact component={NouveauMariage} />
      <Route path="/divorces" exact component={Divorces} />
      <Route path="/declaration_divorce" exact component={NouveauDivorce} />
      <Route path="/deces" exact component={Deces} />
      <Route path="/declaration_deces" exact component={NouveauDeces} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
