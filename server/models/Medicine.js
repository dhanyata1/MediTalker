const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
    name: { type: String, required: true },
    substitutes: [String],
    sideEffects: [String],
    uses: [String],
    chemicalClass: String,
    habitForming: String,
    therapeuticClass: String,
    actionClass: String,
});

module.exports = mongoose.model('Medicine', medicineSchema);
