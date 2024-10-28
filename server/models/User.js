const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String,
    phoneNumber: String,
    address: String,
    dateOfBirth: Date,
    gender: String,
    profilePicture: String
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
