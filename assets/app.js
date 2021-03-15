import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import Deces from "./pages/Deces";
import Mariages from './pages/Mariages';
import Naissances from './pages/Naissances';
import NotFound from './pages/NotFound';
import './styles/app.css';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Naissances} />
      <Route path="/mariages" exact component={Mariages} />
      <Route path="/naissances" exact component={Naissances} />
      <Route path="/deces" exact component={Deces} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
