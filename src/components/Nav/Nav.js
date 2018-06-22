import React from 'react';
import { Link } from 'react-router-dom';

const styles = {
  list: {
    width: '350'
  }
}
const Nav = () => (
  <div className="navbar">
    <div>
      <ul>
        <li>
          <Link to="/user">
            User Home
          </Link>
        </li>
        <li>
          <Link to="/search">
            Search Page
          </Link>
        </li>
        <li>
          <Link to="/summary">
            Summary Page
          </Link>
        </li>
        <li>
          <Link to="/editpartner">
            Partner Page
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default Nav;
