import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/UserLogin.css'; // Import CSS for styling

const UserLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await axios.post(`${process.env.REACT_APP_API_URL_NODE}/api/user/login`, { username, password });
            navigate('/dashboard');
        } catch (error) {
            setErrorMessage(error.response?.data?.error || 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login-container">
            <h1 className="login-title">Welcome Back</h1>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <form onSubmit={handleSubmit} className="login-form">
                <div className="input-group floating-label">
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="input-field"
                        placeholder=" " // Trigger floating label
                    />
                    <label htmlFor="username" className="floating-label-text">Email or Username</label>
                </div>
                <div className="input-group floating-label">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="input-field"
                        placeholder=" " // Trigger floating label
                    />
                    <label htmlFor="password" className="floating-label-text">Password</label>
                    <button type="button" onClick={togglePasswordVisibility} className="toggle-password">
                        {showPassword ? 'Hide' : 'Show'}
                    </button>
                </div>
                <button type="submit" disabled={isLoading} className="login-button">
                    {isLoading ? 'Loading...' : 'Log In'}
                </button>
            </form>
            <div className="social-login">
                <button className="social-button facebook-button">Log in with Facebook</button>
                <button className="social-button google-button">Log in with Google</button>
                <button className="social-button twitter-button">Log in with Twitter</button>
            </div>
            <div className="links">
                <a href="/forgot-password" className="link">Forgot Password?</a>
                <span className="separator"> | </span>
                <a href="/register" className="link">Create an Account</a>
            </div>
        </div>
    );
};

export default UserLogin;
