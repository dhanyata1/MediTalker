const express = require('express');
const bcrypt = require('bcrypt');
const path = require('path');
const User = require(path.join(__dirname, '../models/User'));
const LoggedInUser = require('../models/LoggedInUser');
const multer = require('multer');


const router = express.Router();

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/uploads')); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

const upload = multer({ storage });

// Signup route with file upload handling
router.post('/signup', upload.single('profilePicture'), async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        phoneNumber,
        address,
        dateOfBirth,
        gender
    } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phoneNumber,
            address,
            dateOfBirth,
            gender,
            profilePicture: req.file ? req.file.filename : null
        });

        await newUser.save();
        res.status(201).json({ success: true, message: 'Signup successful! Welcome to Meditalker.' });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }

        const loginTime = new Date();

        const loggedInUser = new LoggedInUser({
            userId: user._id,
            email: user.email,
            loginTime
        });

        await loggedInUser.save();

        res.status(200).json({
            success: true,
            message: 'Login successful',
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                address: user.address,
                dateOfBirth: user.dateOfBirth,
                gender: user.gender,
                profilePicture: user.profilePicture
            }
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});

module.exports = router;
