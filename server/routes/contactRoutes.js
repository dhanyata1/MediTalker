const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// Handle contact form submission
router.post('/', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Create a new contact document
        const newContact = new Contact({
            name,
            email,
            subject,
            message
        });

        // Save the document in the database
        await newContact.save();

        res.status(201).json({ message: 'Contact information saved successfully' });
    } catch (error) {
        console.error('Error saving contact information:', error);
        res.status(500).json({ message: 'Failed to save contact information' });
    }
});

router.get('/queries', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.delete('/queries/:id', async (req, res) => {
    try {
        const queryId = req.params.id;
        const deletedQuery = await Contact.findByIdAndDelete(queryId);
        if (!deletedQuery) {
            return res.status(404).json({ message: 'Query not found' });
        }
        res.json({ message: 'Query deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
module.exports = router;
