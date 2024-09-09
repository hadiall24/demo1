// Routes.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';
import SignIn from './components/SignIn';

const Routes: React.FC = () => (
  <Router>
    <Switch>
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/signin" component={SignIn} />
      <Route path="/" component={HomePage} />
    </Switch>
  </Router>
);

export default Routes;


