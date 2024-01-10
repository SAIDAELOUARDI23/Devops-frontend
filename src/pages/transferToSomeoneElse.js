import React, { useState } from 'react';
import Header from './Header';
import axios from 'axios';

const TransferToSomeoneElse = () => {
    const [transferData, setTransferData] = useState({
        recipient: '',
        accountType: '',
        amount: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setTransferData({ ...transferData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            recipient: transferData.recipient,
            accountType: transferData.accountType,
            amount: transferData.amount
        };

        axios.post('http://localhost:8083/transfer/toSomeoneElse', data, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        })
        .then(response => {
            console.log('Success:', response.data);
            // Handle successful response
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle error response
        });
    };

    return (
        <div>
            <Header />
        <div className="transfer-container">
            <h1>Transfer To Someone Else</h1>
            <form onSubmit={handleSubmit} className="transfer-form">
                <div className="form-group">
                    <label>
                        1. Please choose the recipient:
                        <select name="recipient" value={transferData.recipient} onChange={handleInputChange} className="form-select">
                            <option value="">Select Recipient</option>
                            {/* Add recipient options here */}
                        </select>
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        2. Please select the account type:
                        <select name="accountType" value={transferData.accountType} onChange={handleInputChange} className="form-select">
                            <option value="">Select Account Type</option>
                            <option value="Current">Current</option>
                            <option value="Savings">Savings</option>
                        </select>
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        3. Please specify the amount you would like to transfer:
                        <input
                            type="number"
                            name="amount"
                            value={transferData.amount}
                            onChange={handleInputChange}
                            className="form-input"
                        />
                    </label>
                </div>
                <button type="submit" className="submit-button">Transfer</button>
            </form>
        </div>
        </div>
    );
    
};

export default TransferToSomeoneElse;
