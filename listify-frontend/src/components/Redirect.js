import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Redirect = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect to the Dashboard after 2 seconds (you can adjust the time)
        const timer = setTimeout(() => {
            navigate('/dashboard');
        }, 2000);

        return () => clearTimeout(timer); // Cleanup the timer on unmount
    }, [navigate]);

    return (
        <div>
            <h2>Login successful! Redirecting to your dashboard...</h2>
        </div>
    );
};

export default Redirect;
