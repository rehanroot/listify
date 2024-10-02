import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const UserLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_API_URL_NODE}/api/user/login`, { username, password });
            navigate('/dashboard'); // Redirect to dashboard
        } catch (error) {
            setErrorMessage(error.response?.data?.error || 'Login failed');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
            <h1>User Login</h1>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default UserLogin;
