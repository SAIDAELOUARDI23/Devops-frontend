import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/signUpIn.css'; // Assuming your CSS file is named index.css and located in the same directory

const SignInPage = () => {
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const userData = new URLSearchParams();
        userData.append('username', loginData.username); // Use username instead of email
        userData.append('password', loginData.password);

        axios.post('http://localhost:8083/index', userData.toString(), { withCredentials: true })
            .then(response => {
                console.log('Success:', response.data);
                navigate('/userFront'); // Redirect to userFront
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <section>
            <div className="form-box">
                <div className="form-value">
                    <form onSubmit={handleSubmit}>
                        <h2>Login</h2>
                        <div className="inputbox"> 
                        <ion-icon name="person-outline"></ion-icon> 
                        <input 
                            type="text" 
                            name="username" 
                            required 
                            onChange={handleChange}
                            value={loginData.username}
                        />
                        <label>Username</label>
                        </div>
                        <div className="inputbox">
                            <ion-icon name="lock-closed-outline"></ion-icon>
                            <input 
                                type="password" 
                                name="password" 
                                required 
                                onChange={handleChange}
                                value={loginData.password}
                            />
                            <label>Password</label>
                        </div>
                        <div className="forget">
                            <label>
                                <input type="checkbox" />Remember Me
                            </label>
                            <a href="#">Forgot Password</a>
                        </div>
                        <button>Log In</button>
                        <div className="register">
                            <p>Don't have an account? <a href="#">Sign Up</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default SignInPage;
