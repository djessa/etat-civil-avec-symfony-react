import React from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Home from './views/Home/Home'
import Declaration from './views/Home/Declaration'
import DeclarationNaissance from './views/Naissance/DeclarationNaissance'

export default function Routes() {
  return (
     <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/declaration" exact component={Declaration} />
          <Route path="/declaration/naissance" exact component={DeclarationNaissance} />
        </Switch>
      </BrowserRouter>
  )
}