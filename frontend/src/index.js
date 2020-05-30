import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js'
import Login from "./components/auth/login.component";
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route component={App} />
    </Switch>
  </Router>
  ,
  document.getElementById('root')
);