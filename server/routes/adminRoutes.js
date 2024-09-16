const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Admin = require('../models/adminModel'); // Adjust the path if necessary

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
