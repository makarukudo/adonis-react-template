import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import routeLinks from '../routes'

function App() {
  return (
    <Router>
      <Switch>
        { routeLinks.map(route => <Route {...route} path={`/manage${route.path}`} />) }
      </Switch>
    </Router>
  )
}

export default App
