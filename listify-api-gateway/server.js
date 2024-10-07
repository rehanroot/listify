const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mysql = require('mysql'); // Import MySQL
const axios = require('axios'); // Import axios for HTTP requests
const mysql2 = require('mysql2');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/listify', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// MySQL connection
const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'nodeside',  // Replace with your MySQL username
    password: 'Prithibi420@',  // Replace with your MySQL password
    database: 'listify'  // Replace with your database name
});
// MariaDB connection
const mariaDBConnection = mysql2.createConnection({
    host: '127.0.0.1',
    user: 'root',  // MariaDB username
    password: 'Prithibi420@',  // MariaDB password
    database: 'listify',  // MariaDB database name
    port: 3309,  // MariaDB port
});

// Connect to MariaDB
mariaDBConnection.connect(err => {
    if (err) {
        console.error('MariaDB connection error:', err);
        return;
    }
    console.log('MariaDB connected');
});

// MariaDB test API
app.get('/api/mariadb/test', (req, res) => {
    mariaDBConnection.query('SELECT 1 + 1 AS solution', (err, results) => {
        if (err) {
            console.error('MariaDB query error:', err);
            return res.status(500).json({ error: 'MariaDB query failed' });
        }
        res.json({ solution: results[0].solution }); // Should return { solution: 2 }
    });
});

// Connect to MySQL
mysqlConnection.connect(err => {
    if (err) {
        console.error('MySQL connection error:', err);
        return;
    }
    console.log('MySQL connected');
});

// User Schema for MongoDB without role
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
});

// Ad Schema for MongoDB
const adSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
});

// User Model for MongoDB
const User = mongoose.model('User', userSchema);

// Ad Model for MongoDB
const Ad = mongoose.model('Ad', adSchema);

// User registration
app.post('/api/user/register', async (req, res) => {
    const { username, password } = req.body; // Removed role
    try {
        // Register user via Java endpoint
        const response = await axios.post('http://localhost:8080/api/user/register', { username, password }); // Removed role
        res.status(201).json(response.data); // Forward the success message from Java
    } catch (error) {
        console.error('Registration error:', error);
        res.status(400).json({ error: 'Registration failed' });
    }
});

// User login
app.post('/api/user/login', async (req, res) => {
    const { username, password } = req.body; // Removed role
    try {
        // Login user via Java endpoint
        const response = await axios.post('http://localhost:8080/api/user/login', { username, password }); // Removed role
        res.json(response.data); // Forward the success message from Java
    } catch (error) {
        console.error('Login error:', error.response ? error.response.data : error.message);
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

// Create ad
app.post('/api/ads', async (req, res) => {
    const { title, description } = req.body;
    const newAd = new Ad({ title, description });
    await newAd.save();
    res.status(201).json({ message: 'Ad created successfully' });
});

// Fetch all items from Java backend
app.get('/api/items', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:8080/api/items', {
            // Remove the auth section if the endpoint is public
        });
        res.json(response.data); // Return items received from Java
    } catch (error) {
        console.error('Error fetching items from Java:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to fetch items from Java backend', details: error });
    }
});

// Test MySQL connection and query
app.get('/api/mysql/test', (req, res) => {
    mysqlConnection.query('SELECT 1 + 1 AS solution', (err, results) => {
        if (err) {
            console.error('MySQL query error:', err);
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json({ solution: results[0].solution }); // Should return { solution: 2 }
    });
});

// Fetch all users from MySQL (optional)
app.get('/api/mysql/users', (req, res) => {
    mysqlConnection.query('SELECT * FROM users', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(results);
    });
});

// Health check endpoint for Node.js
app.get('/api/health/nodejs', (req, res) => {
    res.json({ message: 'Node.js is running!' });
});

// Health check for Python backend
app.get('/api/health/python', async (req, res) => {
    try {
        // Make a request to Python backend's health endpoint
        const response = await axios.get('http://localhost:8000/api/health'); // Adjust URL to the correct Python port
        res.json({
            status: 'success',
            message: 'Connected to Python backend',
            pythonResponse: response.data,
        });
    } catch (error) {
        console.error('Python backend connection error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to connect to Python backend',
            error: error.response ? error.response.data : error.message,
        });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
