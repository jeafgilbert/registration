import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './styles/bootstrap.css';
import './styles/App.css';
import './styles/Form.css';

import Registration from './components/guest/Registration';
import Login from './components/guest/Login';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Registration} />
        <Route path="/login" exact component={Login} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
