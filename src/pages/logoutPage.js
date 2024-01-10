import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LogoutPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8083/logout', { withCredentials: true })
            .then(() => {
                // Redirect to home page after successful logout
                navigate('/');
            })
            .catch(error => {
                console.error('Logout failed:', error);
                // Handle logout error (optional)
            });
    }, [navigate]);

    return <div>Logging out...</div>;
};

export default LogoutPage;
