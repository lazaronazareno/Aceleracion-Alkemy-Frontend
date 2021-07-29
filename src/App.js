import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Header } from './shared/Header';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import Loader from './shared/Loader/Loader';

function App() {

  return (
    <BrowserRouter>
      <Loader/>
      <Switch>
        <Route exact path='/' component={Header} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
