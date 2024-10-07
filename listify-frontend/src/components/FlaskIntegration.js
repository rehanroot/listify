
// JUST THIS IS A PLACEHOLDER

import React, { useState } from 'react';
import axios from 'axios';

const FlaskIntegration = () => {
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const fetchMessage = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL_PYTHON}/api/test`);
            console.log('Response:', response.data); // Log the response data for debugging
            setMessage(response.data.message);
            setError(''); // Clear any previous error
        } catch (error) {
            console.error('Error fetching message:', error);
            setError('Failed to fetch message from Flask API');
            setMessage(''); // Clear any previous message
        }
    };

    return (
        <div>
            <button onClick={fetchMessage}>Fetch Message</button>
            {message && <p>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default FlaskIntegration;
