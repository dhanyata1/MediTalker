const express = require('express');
const User = require('../models/User');
const LoggedInUser = require('../models/LoggedInUser');

const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.put('/api/users/:id', async (req, res) => {
    const { firstName, lastName, email, phoneNumber, address, dateOfBirth, gender } = req.body;

    try {
        // Find the user by ID and update their details
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { firstName, lastName, email, phoneNumber, address, dateOfBirth, gender },
            { new: true } // Return the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Fetch login data
router.get('/login', async (req, res) => {
    try {
        const loginData = await LoggedInUser.find().populate('userId');
        res.setHeader('Content-Type', 'application/json'); // Ensure JSON response
        res.json(loginData);
    } catch (err) {
        console.error('Error fetching login data:', err);
        res.status(500).json({ message: err.message });
    }
});

// Delete logged-in user data by ID
router.delete('/login/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const loggedInUser = await LoggedInUser.findByIdAndDelete(id);

        if (!loggedInUser) {
            console.error(`Logged-in user data with ID ${id} not found.`);
            return res.status(404).json({ message: `Logged-in user data with ID ${id} not found.` });
        }

        res.status(200).json({ message: 'Logged-in user data deleted successfully' });
    } catch (error) {
        console.error('Error deleting logged-in user data:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Delete a user by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            console.error(`User with ID ${id} not found.`);
            return res.status(404).json({ message: `User with ID ${id} not found.` });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
