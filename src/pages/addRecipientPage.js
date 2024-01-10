import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';

const AddRecipientPage = () => {

    const [notification, setNotification] = useState(null);
    
    const [recipientData, setRecipientData] = useState({
        name: '',
        email: '',
        phone: '',
        accountNumber: '',
        description: ''
    });
    const [recipients, setRecipients] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8083/transfer/recipient', { withCredentials: true })
            .then(response => {
                setRecipients(response.data);
            })
            .catch(error => {
                console.error('Error fetching recipients:', error);
            });
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setRecipientData({ ...recipientData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('http://localhost:8083/transfer/recipient/save', recipientData, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        })
        .then(response => {
            console.log('Success:', response.data);
            setNotification('Recipient added successfully');
            setTimeout(() => setNotification(null), 3000); // Hide notification after 3 seconds
            // Optionally, refetch the recipients list
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        
        <div>
            <Header />
            <div>
            <h1>Add Recipient</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={recipientData.name}
                    onChange={handleInputChange}
                    placeholder="Name"
                />
                <input
                    type="email"
                    name="email"
                    value={recipientData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                />
                <input
                    type="text"
                    name="phone"
                    value={recipientData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone"
                />
                <input
                    type="text"
                    name="accountNumber"
                    value={recipientData.accountNumber}
                    onChange={handleInputChange}
                    placeholder="Account Number"
                />
                <input
                    type="text"
                    name="description"
                    value={recipientData.description}
                    onChange={handleInputChange}
                    placeholder="Description"
                />
                <button type="submit">Add Recipient</button>
            </form>

            <h2>Recipient List</h2>
            <ul>
                {recipients.map(recipient => (
                    <li key={recipient.id}>
                        {recipient.name} - {recipient.email} - {recipient.phone} - {recipient.accountNumber} - {recipient.description}
                    </li>
                ))}
            </ul>
        </div>
        </div>
    );
};

export default AddRecipientPage;
