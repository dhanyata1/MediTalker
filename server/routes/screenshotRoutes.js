const express = require('express');
const router = express.Router();
const Screenshot = require('../models/Screenshot');

// Route to save a screenshot
router.post('/', async (req, res) => {
    console.log('POST /screenshot endpoint hit');
    try {
        const { imageSrc, text } = req.body;

        // Validate input
        if (!imageSrc || typeof imageSrc !== 'string' || !text || typeof text !== 'string') {
            return res.status(400).json({ message: 'Invalid input' });
        }

        // Create and save new screenshot
        const newScreenshot = new Screenshot({ imageSrc, text });
        await newScreenshot.save();

        res.status(201).json(newScreenshot);
    } catch (error) {
        console.error('Error saving screenshot:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// Route to get all screenshots
router.get('/', async (req, res) => {
    try {
        const screenshots = await Screenshot.find();
        res.status(200).json(screenshots);
    } catch (error) {
        console.error('Error fetching screenshots:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// Route to delete a screenshot
router.delete('/', async (req, res) => {
    try {
        const { imageSrc } = req.body;

        // Validate input
        if (!imageSrc || typeof imageSrc !== 'string') {
            return res.status(400).json({ message: 'Invalid input' });
        }

        // Find and delete screenshot
        const screenshot = await Screenshot.findOneAndDelete({ imageSrc });
        if (!screenshot) {
            return res.status(404).json({ message: 'Screenshot not found' });
        }

        res.status(200).json({ message: 'Screenshot deleted successfully' });
    } catch (error) {
        console.error('Error deleting screenshot:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

module.exports = router;
