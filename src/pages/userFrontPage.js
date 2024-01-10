import React, { useState, useEffect } from 'react';
import Header from './Header';
import axios from 'axios';
import '../css/userFront.css'; // Make sure to create and import your CSS file

const UserFront = () => {
  const [accountData, setAccountData] = useState({
    savingsAccount: { accountBalance: 0.00 },
    currentAccount: { accountBalance: 0.00 }
  });

  useEffect(() => {
    // Replace with your actual API endpoint
    axios.get('http://localhost:8083/userFront', { withCredentials: true })
      .then(response => {
        setAccountData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the account data:', error);
      });
  }, []);

  return (
    <div className='container'>{<div>
      <Header />
  <div className="account-box savings-account">
      <h3 className="account-title">Savings Account</h3>
      <div className="account-details">
          <p><span className="account-label">Account Number:</span> {accountData.savingsAccount.accountNumber}</p>
          <p><span className="account-label">Balance:</span> $ {accountData.savingsAccount.accountBalance.toFixed(2)}</p>
      </div>
  </div>
  <div className="account-box current-account">
      <h3 className="account-title">Current Account</h3>
      <div className="account-details">
          <p><span className="account-label">Account Number:</span> {accountData.currentAccount.accountNumber}</p>
          <p><span className="account-label">Balance:</span> $ {accountData.currentAccount.accountBalance.toFixed(2)}</p>
      </div>
  </div>
</div>
}    
    </div>
);

};

export default UserFront;
