import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanelPage = () => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8083/admin/panel', { withCredentials: true })
            .then(response => {
                setUserData(response.data);
            })
            .catch(err => {
                if (err.response && err.response.status === 401) {
                    setError('User unauthenticated');
                } else {
                    setError('you are not an admin');
                }
            });
    }, []);

    return (
        <div>
            <h1>Admin Panel</h1>
            {error && <p>Error: {error}</p>}
            {userData && <pre>{JSON.stringify(userData, null, 2)}</pre>}
        </div>
    );
};

export default AdminPanelPage;
