import React from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import AdminPage from './components/AdminPage/AdminPage';
import EditStudentPage from './components/EditStudentPage/EditStudentPage';
import SummaryPage from './components/SummaryPage/SummaryPage';
import EditPartner from './components/EditPartner/EditPartner';
import Partner from './components/Partner/Partner';
import LandingPage from './components/LandingPage/LandingPage';
import './styles/main.css';

const App = () => (
  <div>
    <Router>
      <Switch>
        <Redirect exact from="/" to="/login" />
        <Route
          path="/login" 
          component={LoginPage}
        />
        <Route
          path="/register" 
          component={RegisterPage}
        />
        <Route
          path="/admin" 
          component={AdminPage}
        />
        <Route
          path="/summary" 
          component={SummaryPage}
        />
        <Route
          path="/editpartner" 
          component={EditPartner}
        />
        <Route
          path="/studentEdit" 
          component={EditStudentPage}
        />
        <Route
          path="/partner" 
          component={Partner}
        />
        <Route
          path="/landing"
          component={LandingPage}
        />
        <Route render={() => <h1>404</h1>} />

      </Switch>
    </Router>
  </div>
);

export default App;