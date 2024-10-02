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
            <img src="your-logo-url.png" alt="Logo" className="logo" /> {/* Add your logo */}
            <h1 className="login-title">Welcome Back</h1>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <form onSubmit={handleSubmit} className="login-form">
                <div className="input-group">
                    <label htmlFor="username">Email or Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="input-field"
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="input-field" // Ensuring same class as username input
                    />
                    <button type="button" onClick={togglePasswordVisibility} className="toggle-password">
                        {showPassword ? 'Hide' : 'Show'}
                    </button>
                </div>
                <div className="remember-me">
                    <input type="checkbox" id="remember" />
                    <label htmlFor="remember">Remember Me</label>
                </div>
                <button type="submit" disabled={isLoading} className="login-button">
                    {isLoading ? 'Loading...' : 'Log In'}
                </button>
            </form>
            <div className="links">
                <a href="/forgot-password" className="link">Forgot Password?</a>
                <span className="separator"> | </span>
                <a href="/register" className="link">Create an Account</a>
            </div>
            <div className="social-login">
                <button className="social-button">Log in with Google</button>
                <button className="social-button">Log in with Facebook</button>
            </div>
        </div>
    );
};

export default UserLogin;
