import React, { useState, useEffect } from 'react';
import Header from './Header';
import '../css/savingsAccount.css'; // Make sure to create and import your CSS styles for SavingsAccount
import axios from 'axios';

function SavingsAccount() {

  const [savingsData, setSavingsData] = useState({
    savingsTransactionList: [],
    savingsAccount: { accountNumber: '', accountBalance: 0 },
  });

  useEffect(() => {
    axios.get('http://localhost:8083/account/savingsAccount', { withCredentials: true })
        .then(response => {
            setSavingsData(response.data);
        })
        .catch(error => {
            console.error('Error fetching savings account data:', error);
        });
}, []);

  return (
    
    <div>
      <Header />
    <div className="savings-account">
      
      {/* Header and navigation omitted for brevity */}

      <div className="balance-section savings">
        <h2>Savings Balance:</h2>
        <p className="balance-amount">$ {savingsData.savingsAccount.accountBalance.toFixed(2)}</p>
      </div>
      
      <div className="transactions-table">
        <input type="text" placeholder="Search..." className="search-box" />
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Type</th>
              <th>Status</th>
              <th>Amount</th>
              <th>Available Balance</th>
            </tr>
          </thead>
          <tbody>
            {savingsData.savingsTransactionList.map((transaction, index) => (
              <tr key={index}>
                <td>{new Date(transaction.date).toLocaleDateString()}</td>
                <td>{transaction.description}</td>
                <td>{transaction.type}</td>
                <td>{transaction.status}</td>
                <td>{transaction.amount.toFixed(2)}</td>
                <td>{transaction.availableBalance.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}

export default SavingsAccount;
