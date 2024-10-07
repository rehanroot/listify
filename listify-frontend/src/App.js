import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserLogin from './components/UserLogin';
import UserRegistration from './components/UserRegistration';
import Dashboard from './components/Dashboard';
import FlaskIntegration from './components/FlaskIntegration';

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    {/* Set the homepage as the registration page */}
                    <Route path="/" element={<UserRegistration />} />
                    {/* Route for login page */}
                    <Route path="/login" element={<UserLogin />} />
                    {/* Dashboard route */}
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/flask" element={<FlaskIntegration />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
