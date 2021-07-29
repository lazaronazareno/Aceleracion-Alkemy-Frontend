import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Header } from './shared/Header';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Header} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
