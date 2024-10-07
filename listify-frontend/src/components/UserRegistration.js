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
            <nav className="top-nav">
                <div className="logo">Your Logo</div>
                <ul className="horizontal-menu">
                    <li><a href="/neighborhoods">Neighborhood</a></li>
                    <li><a href="/agencies">Agencies</a></li>
                    <li><a href="/businesses">Small Business</a></li>
                    <li><a href="/brands-agencies">Brands & Agencies</a></li>
                    <li><a href="/Community">Community</a></li>
                    <li><a href="/Events">Events</a></li>
                </ul>
                <a href="/login" className="login-button">Login</a>
            </nav>

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
                    <div className="social-buttons">
                        <button className="social-button google-button">Google</button>
                        <button className="social-button facebook-button">Facebook</button>
                        <button className="social-button twitter-button">Twitter</button>
                    </div>
                </div>
            </div>

            <footer className="footer">
                <div className="footer-section">
                    <h3>About</h3>
                    <ul>
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/news">News</a></li>
                        <li><a href="/media-assets">Media Assets</a></li>
                        <li><a href="/investor-relations">Investor Relations</a></li>
                        <li><a href="/blog">Blog</a></li>
                        <li><a href="/careers">Careers</a></li>
                        <li><a href="/help">Help</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Neighbors</h3>
                    <ul>
                        <li><a href="/get-started">Get Started</a></li>
                        <li><a href="/events">Events</a></li>
                        <li><a href="/neighborhoods">Neighborhoods</a></li>
                        <li><a href="/guidelines">Guidelines</a></li>
                        <li><a href="/neighborhood-faves">2023 Neighborhood Faves</a></li>
                        <li><a href="/anti-racism-resources">Anti-Racism Resources</a></li>
                        <li><a href="/crisis-hub">Crisis Hub</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Business and Organizations</h3>
                    <ul>
                        <li><a href="/small-business">Small Business</a></li>
                        <li><a href="/brands-agencies">Brands & Agencies</a></li>
                        <li><a href="/public-agency">Public Agency</a></li>
                        <li><a href="/businesses-on-nextdoor">Businesses on Nextdoor</a></li>
                        <li><a href="/neighborhood-faves">Neighborhood Faves</a></li>
                        <li><a href="/self-service-ad-terms">Self-Service Ad Terms</a></li>
                        <li><a href="/for-developers">For Developers</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Industries</h3>
                    <ul>
                        <li><a href="/home-garden">Home & Garden</a></li>
                        <li><a href="/real-estate">Real Estate</a></li>
                        <li><a href="/professional-services">Professional Services</a></li>
                        <li><a href="/food-entertainment">Food & Entertainment</a></li>
                        <li><a href="/shopping-retail">Shopping & Retail</a></li>
                        <li><a href="/medical-dental">Medical & Dental</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Privacy</h3>
                    <ul>
                        <li><a href="/legal-terms">Legal & Terms</a></li>
                        <li><a href="/cookies">Cookies</a></li>
                    </ul>
                </div>
            </footer>
        </div>
    );
};

export default UserRegistration;
