import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import testApp from './shared/testApp';
import testNotFound from './shared/testNotFound';
import './App.css';
import Loader from './shared/Loader/Loader';

function App() {
  return (
    <BrowserRouter>
      <Loader/>
      <Switch>
        <Route exact path="/" component={testApp}/>
        <Route component={testNotFound}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
