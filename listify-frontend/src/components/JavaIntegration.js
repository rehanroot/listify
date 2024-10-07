import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Hello = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL_JAVA}/api/hello`)
            .then(response => {
                setMessage(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the message!', error);
            });
    }, []);

    return (
        <div>
            <h1>{message}</h1>
        </div>
    );
};

export default Hello;
