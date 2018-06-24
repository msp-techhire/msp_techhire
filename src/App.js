import React from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Header from './components/Header/Header';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import AdminPage from './components/AdminPage/AdminPage';
import SummaryPage from './components/SummaryPage/SummaryPage';
import EditPartner from './components/EditPartner/EditPartner';
import Partner from './components/Partner/Partner';

import './styles/main.css';

const App = () => (
  <div>
    <Header title="" />
    <Router>
      <Switch>
        <Redirect exact from="/" to="/login" />
        <Route
          path="/login" // LOGIN page
          component={LoginPage}
        />
        <Route
          path="/register" // TEMPORARY registration page
          component={RegisterPage}
        />
        <Route
          path="/admin" // admin landing page
          component={AdminPage}
        />
        <Route
          path="/summary" // admin summary page
          component={SummaryPage}
        />
        <Route
          path="/editpartner" // admin edit partner page
          component={EditPartner}
        />
        <Route
          path="/partner" // partner landing page
          component={Partner}
        />
        {/* OTHERWISE (no path!) */}
        <Route render={() => <h1>404</h1>} />

      </Switch>
    </Router>
  </div>
);

export default App;
