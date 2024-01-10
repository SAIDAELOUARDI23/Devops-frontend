import React from 'react';
import { BrowserRouter as Router, Route, Routes,Link } from 'react-router-dom';
import SignUpPage from './pages/signUpPage';
import SignInPage from './pages/signInPage';
import UserFront from './pages/userFrontPage';
import UserProfile from './pages/userProfile';
import CurrentAccount from './pages/currentAccount';
import SavingsAccount from './pages/savingsAccount';
import BetweenAccounts from './pages/betweenAccounts';
import TransferToSomeoneElse from './pages/transferToSomeoneElse';
import AdminPanel from './pages/adminPanel';
import AddRecipientPage from './pages/addRecipientPage';

const App = () => {
  return (
      <Router>
              <Routes>
                  <Route path="/signup" element={<SignUpPage />} />
                  <Route path="/signin" element={<SignInPage />} />
                  <Route path="/userFront" element={<UserFront />} />
                  <Route path="/userProfile" element={<UserProfile />} />
                  <Route path="/account/currentAccount" element={<CurrentAccount />} />
                  <Route path="/account/savingsAccount" element={<SavingsAccount />} />
                  <Route path="/transfer/betweenAccounts" element={<BetweenAccounts />} />
                  <Route path="/transfer/toSomeoneElse" element={<TransferToSomeoneElse />} />
                  <Route path="/admin/panel" element={<AdminPanel />} />
                  <Route path="/transfer/addRecipient" element={<AddRecipientPage />} />
              </Routes>
      </Router>
  );
};

export default App;
