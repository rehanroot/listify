import React, { useState } from 'react';
import axios from 'axios';
import '../styles/UserRegistration.css'; // Ensure this CSS is linked correctly

const UserRegistration = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL_NODE}/api/user/register`, { username, password });
            console.log('User registered:', response.data); // Log to avoid unused warning
            window.location.href = '/dashboard'; // Redirect to the dashboard after successful registration
        } catch (error) {
            setErrorMessage(error.response?.data?.error || 'Registration failed');
        }
    };

    return (
        <div className="registration-page">
            <div className="registration-container">
                <h1 className="welcome-title">Welcome to Listify</h1>
                <h1 className="form-title">Sign Up</h1>
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

                <form onSubmit={handleSubmit} className="form">
                    <div className="form-group">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            type="text"
                            id="username"
                            className="form-input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="form-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="form-button">Register</button>
                </form>

                <div className="social-login-container">
                    <p>Or continue with</p>
                    <button className="social-button google-button">Continue with Google</button>
                    <button className="social-button facebook-button">Continue with Facebook</button>
                    <button className="social-button twitter-button">Continue with Twitter</button>
                </div>
            </div>

            <nav className="top-nav">
                <a href="/login" className="login-button">Login</a>
            </nav>
        </div>
    );
};

export default UserRegistration;
