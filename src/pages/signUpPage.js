import React, { useState } from 'react';
import axios from 'axios';
import '../css/signUpIn.css'; // Assuming your CSS file is named index.css and located in the same directory

const SignUpPage = () => {
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        phone: '',
        password: ''
    });

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Assuming you want to post fullName, email, and password
        const postData = {
            firstName: userData.firstName,
            lastName: userData.lastName,
            username: userData.username,
            phone: userData.phone,
            email: userData.email,
            password: userData.password
            // Add other fields if necessary
        };
        axios.post('http://localhost:8083/signup', postData, { withCredentials: true })
             .then(response => {
                 console.log('Success:', response.data);
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
                        <h2>Registration form</h2>
                        <div className="inputbox"> 
                <ion-icon name="person-outline"></ion-icon>
                <input type="text" name="firstName" required onChange={handleChange} />
                <label>First Name</label>
                </div>
                <div className="inputbox"> 
                    <ion-icon name="person-outline"></ion-icon>
                    <input type="text" name="lastName" required onChange={handleChange} />
                    <label>Last Name</label>
                </div>
                <div className="inputbox"> 
                    <ion-icon name="person-outline"></ion-icon>
                    <input type="text" name="username" required onChange={handleChange} />
                    <label>Username</label>
                </div>
                <div className="inputbox"> 
                    <ion-icon name="mail-outline"></ion-icon>
                    <input type="email" name="email" required onChange={handleChange} />
                    <label>Email</label>
                </div>
                <div className="inputbox"> 
                    <ion-icon name="call-outline"></ion-icon>
                    <input type="tel" name="phone" required onChange={handleChange} />
                    <label>Phone</label>
                </div>
                <div className="inputbox"> 
                    <ion-icon name="lock-closed-outline"></ion-icon>
                    <input type="password" name="password" required onChange={handleChange} />
                    <label>Password</label>
                </div>
                <button>sign up</button>
                        <div className="register">
                            <p>Do you have an account? <a href="./index.html">login</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default SignUpPage;
