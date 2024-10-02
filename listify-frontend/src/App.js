import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserLogin from './components/UserLogin'; // Update this path
import UserRegistration from './components/UserRegistration'; // Update this path
import Dashboard from './components/Dashboard';

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<UserLogin />} />
                    <Route path="/register" element={<UserRegistration />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
