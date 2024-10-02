const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
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

// User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
});

// Ad Schema
const adSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
});

// User Model
const User = mongoose.model('User', userSchema);

// Ad Model
const Ad = mongoose.model('Ad', adSchema);

// User registration
app.post('/api/user/register', async (req, res) => {
    const { username, password } = req.body;
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
});

// User login
app.post('/api/user/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    res.json({ message: 'Login successful' });
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

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
