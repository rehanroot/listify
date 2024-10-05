const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mysql = require('mysql'); // Import MySQL
const axios = require('axios'); // Import axios for HTTP requests

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

// Connect to MySQL
mysqlConnection.connect(err => {
    if (err) {
        console.error('MySQL connection error:', err);
        return;
    }
    console.log('MySQL connected');
});

// User Schema for MongoDB (not needed for this flow but retained for potential future use)
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['user', 'seller'] } // Added role field
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
    const { username, password, role } = req.body;
    try {
        // Register user via Java endpoint
        const response = await axios.post('http://localhost:8080/api/user/register', { username, password, role });
        res.status(201).json(response.data); // Forward the success message from Java
    } catch (error) {
        console.error('Registration error:', error);
        res.status(400).json({ error: 'Registration failed' });
    }
});

// User login
app.post('/api/user/login', async (req, res) => {
    const { username, password, role } = req.body;
    try {
        // Login user via Java endpoint
        const response = await axios.post('http://localhost:8080/api/user/login', { username, password, role });
        res.json(response.data); // Forward the success message from Java
    } catch (error) {
        console.error('Login error:', error.response ? error.response.data : error.message);
        res.status(401).json({ error: 'Invalid credentials or role mismatch' });
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
            auth: {
                username: 'admin', // Replace with your actual username
                password: 'secret'  // Replace with your actual password
            }
        });
        res.json(response.data); // Return items received from Java
    } catch (error) {
        console.error('Error fetching items from Java:', error);
        res.status(500).json({ error: 'Failed to fetch items from Java backend' });
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

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
