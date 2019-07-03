import * as React from 'react';
import { Switch, BrowserRouter, Redirect } from 'react-router-dom';

import * as modules from 'modules';
import { defaultRoute } from 'modules/routes';

import 'shared/styles/fonts/index.scss';

import './registerWorkers';

import './App.scss';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        {Object.values(modules).map(module => module.getRoutes())}
        <Redirect to={defaultRoute} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
