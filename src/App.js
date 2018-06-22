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
import UserPage from './components/UserPage/UserPage';
import Search from './components/Search/Search';
import SummaryPage from './components/SummaryPage/SummaryPage';
import EditPartner from './components/EditPartner/EditPartner';
import Partner from './components/Partner/Partner';

import './styles/main.css';

const App = () => (
  <div>
    <Header title="Project Base" />
    <Router>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route
          path="/home"
          component={LoginPage}
        />
        <Route
          path="/register"
          component={RegisterPage}
        />
        <Route
          path="/user"
          component={UserPage}
        />
        <Route
          path="/summary"
          component={SummaryPage}
        />
          <Route
          path="/search"
          component={Search}
        />
        <Route
          path="/editpartner"
          component={EditPartner}
        />
        <Route
          path="/partner"
          component={Partner}
        />
        {/* OTHERWISE (no path!) */}
        <Route render={() => <h1>404</h1>} />

      </Switch>
    </Router>
  </div>
);

export default App;
