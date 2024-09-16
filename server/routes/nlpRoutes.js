const express = require('express');
const router = express.Router();
const { NlpManager } = require('node-nlp');

// Create an NLP manager instance
const manager = new NlpManager({ languages: ['en'] });

// Train the NLP model
manager.addDocument('en', 'I need information about %medicine%', 'medicine.info');
manager.addAnswer('en', 'medicine.info', 'Here is the information about the medicine.');
manager.train();

// Define the NLP analysis route
router.post('/analyze', async (req, res) => {
    const { text } = req.body;
    try {
        const response = await manager.process('en', text);
        res.json(response);
    } catch (error) {
        console.error('NLP Processing Error:', error);
        res.status(500).json({ error: 'Error processing text' });
    }
});

module.exports = router;
