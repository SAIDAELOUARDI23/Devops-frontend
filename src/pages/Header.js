// Header.js
import React from 'react';
import { Link } from 'react-router-dom'; // This assumes you're using react-router-dom for routing
import '../css/header.css'; // Your Header CSS styles

function Header() {
  return (
    <header className="header">
      <img src="path_to_griffin_logo.png" alt="SecureBank Logo" className="logo" />
      <nav className="navigation">
        <ul>
          <li><Link to="/userFront">Home</Link></li>
          <li>
            Accounts
            <ul>
              <li><Link to="/account/currentAccount">Current</Link></li>
              <li><Link to="/account/savingsAccount">Savings</Link></li>
            </ul>
          </li>
          <li>
            Transfer
            <ul>
              <li><Link to="/transfer/betweenAccounts">Between Accounts</Link></li>
              <li><Link to="/transfer/toSomeoneElse">To Someone Else</Link></li>
              <li><Link to="/transfer/recipient">Add/Edit Recipient</Link></li>
            </ul>
          </li>
          <li>
            Management and Referral
            <ul>
              <li><Link to="/admin/panel">Management Administrator Panel</Link></li>
              <li><Link to="/admin/signup">Add New Administrators</Link></li>
              <li><Link to="/signup">Referral Add Users</Link></li>
            </ul>
          </li>
          {/* ... other items */}
        </ul>
      </nav>
      {/* User menu dropdown - assuming you have a component or code for this */}
    </header>
  );
}

export default Header;
