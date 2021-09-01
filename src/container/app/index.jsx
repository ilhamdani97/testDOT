import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import {Error404, Dashboard } from '../../container/pages';
import AppRoutes from '../../config/routes';

function App() {
  return (
    <Router>
      <Switch>
        {AppRoutes.map((route) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <Route key={route.id} {...route} />
        ))}

        <Route key={1} path="/" component={Dashboard} exact />
        <Redirect from="*" to="/error-404" /> 
        <Route key={9} path="/error-404" component={Error404} exact />
        <Route key={2} path="/dashboard" component={Dashboard} exact />
      </Switch>
    </Router>
  );
}

export default App;
