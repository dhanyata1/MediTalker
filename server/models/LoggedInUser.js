const mongoose = require('mongoose');

const LoggedInUserSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    email: { type: String, required: true },
    loginTime: { type: Date, default: Date.now }
}, { collection: 'LoggedInUser' });

const LoggedInUser = mongoose.model('LoggedInUser', LoggedInUserSchema);

module.exports = LoggedInUser;
