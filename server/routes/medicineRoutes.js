const express = require('express');
const router = express.Router();
const Fuse = require('fuse.js');
const Medicine = require('../models/Medicine'); 

// Fuzzy search options
const fuseOptions = {
    includeScore: true,
    keys: ['name'],
    threshold: 0.3, // Adjust this value as needed for your use case
    minMatchCharLength: 3,
    findAllMatches: true,
};

// Medicine search route
router.get('/', async (req, res) => {
    const name = req.query.name;

    if (!name) {
        return res.status(400).json({ message: 'Medicine name is required' });
    }

    try {
        const medicines = await Medicine.find();

        if (medicines.length === 0) {
            return res.status(404).json({ message: 'No medicines found in the database' });
        }

        const fuseOptions = {
            includeScore: true,
            keys: ['name'],
            threshold: 0.3,
            minMatchCharLength: 3,
            findAllMatches: true,
        };

        const fuse = new Fuse(medicines, fuseOptions);
        const results = fuse.search(name);

        if (results.length > 0) {
            return res.json(results[0].item);
        } else {
            return res.status(404).json({ message: 'Medicine not found' });
        }
    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({ message: 'Error fetching medicine information' });
    }
});

module.exports = router;
