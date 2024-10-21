const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Admin = require('../models/adminModel');

// Route to insert admin data
router.post('/add-admin', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Hash the password before saving it
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const admin = new Admin({ name, email, password: hashedPassword });
        await admin.save();
        res.status(201).send(admin);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.put('/update-admin/:id', async (req, res) => {
    console.log('Received update request for ID:', req.params.id);
    console.log('Request body:', req.body);

    const { name, email, password } = req.body;

    try {
        const updateData = { name, email };

        // Only hash and update the password if it's provided
        if (password) {
            const saltRounds = 10;
            updateData.password = await bcrypt.hash(password, saltRounds);
        }

        const updatedAdmin = await Admin.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!updatedAdmin) return res.status(404).json({ message: 'Admin not found' });

        res.json(updatedAdmin);
    } catch (error) {
        console.error('Error updating admin:', error);
        res.status(500).json({ message: 'Error updating admin', error });
    }
});

// Get all admins
router.get('/get-admins', async (req, res) => {
    try {
        const admins = await Admin.find({}, 'name email'); // Select only name and email fields
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching admin data' });
    }
});

module.exports = router;
