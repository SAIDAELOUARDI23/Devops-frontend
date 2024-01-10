import React, { useState } from 'react';
import axios from 'axios';
import Header from './Header';
import '../css/betweenAccounts.css';

const TransferPage = () => {
    const [transferData, setTransferData] = useState({
        transferFrom: '',
        transferTo: '',
        amount: 0
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setTransferData({ ...transferData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('http://localhost:8083/transfer/betweenAccounts', transferData, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        })
        .then(response => {
            console.log('Success:', response.data);
            // Handle successful response
        })
        .catch(error => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Error:', error.response.data);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('Error:', error.message);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error:', error.message);
            }
        });
    };

    return (
    <div>
        <Header />
    <div className="transfer-container">
        <h1>Transfer Between Accounts</h1>
        <form onSubmit={handleSubmit} className="transfer-form">
            <div className="form-group">
                <label>
                    1. Please select the account you would like to transfer From:
                    <select name="transferFrom" value={transferData.transferFrom} onChange={handleInputChange} className="form-select">
                        <option value="">Select Account</option>
                        <option value="Current">Current</option>
                        <option value="Savings">Savings</option>
                    </select>
                </label>
            </div>
            <div className="form-group">
                <label>
                    2. Please select the account you would like to transfer To:
                    <select name="transferTo" value={transferData.transferTo} onChange={handleInputChange} className="form-select">
                        <option value="">Select Account</option>
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

export default TransferPage;
