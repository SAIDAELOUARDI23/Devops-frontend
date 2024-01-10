import React from 'react';
import { useHistory } from 'react-router-dom';
import '../css/homePage.css'; // Make sure to style your buttons and layout

const HomePage = () => {
  const history = useHistory();

  const navigateToSignIn = () => history.push('/signin');
  const navigateToSignUp = () => history.push('/signup');

  return (
    <div className="home-container">
      <h1>Welcome to SecureBank</h1>
      <div className="button-container">
        <button onClick={navigateToSignIn}>Sign In</button>
        <button onClick={navigateToSignUp}>Sign Up</button>
      </div>
    </div>
  );
};

export default HomePage;
