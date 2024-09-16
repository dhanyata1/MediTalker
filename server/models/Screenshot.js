const mongoose = require('mongoose');

const ScreenshotSchema = new mongoose.Schema({
    imageSrc: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        default: '',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Screenshot', ScreenshotSchema);
