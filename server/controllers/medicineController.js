const Medicine = require('../models/Medicine');
const natural = require('natural');

const getMedicineInfo = async (req, res) => {
    const { name } = req.query;

    if (!name) {
        return res.status(400).json({ error: 'Medicine name is required' });
    }

    try {
        // Fetch all medicines once
        const medicines = await Medicine.find({});
        const medicineNames = medicines.map(med => med.name);

        // Jaro-Winkler Distance for fuzzy matching
        const bestMatch = getBestMatch(name, medicineNames);

        console.log('Query:', name);
        console.log('Best Match:', bestMatch);

        if (!bestMatch || getMatchScore(name, bestMatch) < 0.85) {
            console.log('No close match found.');
            return res.status(404).json({ error: 'No close match found for the provided medicine name' });
        }

        // Fetch the best match from the database
        const medicine = await Medicine.findOne({ name: bestMatch });

        if (medicine) {
            res.json(medicine);
        } else {
            console.log('Medicine not found in the database.');
            res.status(404).json({ error: 'Medicine not found' });
        }
    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ error: 'Error fetching medicine information. Please try again later.' });
    }
};

// Helper function to find the best match
const getBestMatch = (query, names) => {
    let bestMatch = '';
    let highestScore = 0;

    names.forEach(name => {
        const score = natural.JaroWinklerDistance(query, name);
        if (score > highestScore) {
            highestScore = score;
            bestMatch = name;
        }
    });

    return bestMatch;
};

// Helper function to get the match score
const getMatchScore = (query, name) => {
    return natural.JaroWinklerDistance(query, name);
};

module.exports = {
    getMedicineInfo
};
