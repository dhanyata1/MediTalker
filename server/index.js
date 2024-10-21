const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(morgan('combined')); 
app.use(helmet());

app.use(cors({
    origin: 'http://localhost:3000', // Frontend URL
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow DELETE method
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate limiter for API endpoints
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', apiLimiter); // Apply rate limiter to all API routes

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/MediTalker', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB:', err));


    
const authRoutes = require('./routes/auth');
const medicineRoutes = require('./routes/medicineRoutes');
const screenshotRoutes = require('./routes/screenshotRoutes');
const nlpRoutes = require('./routes/nlpRoutes');
const usersRoutes = require('./routes/users');
const adminRoutes = require('./routes/adminRoutes');
const contactRoutes = require('./routes/contactRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
// const predictRoutes = require('./routes/predict');


// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/medicine', medicineRoutes);
app.use('/api/screenshot', screenshotRoutes);
app.use('/api/nlp', nlpRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/feedback', feedbackRoutes);
// app.use('/api/predict', predictRoutes);

// Serve client-side static files if in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

// Enhanced error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(err.statusCode || 500).send({ message: err.message || 'Internal Server Error' });
});

app.use('/uploads', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow all origins
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allow specific methods
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow specific headers
    next();
}, express.static(path.join(__dirname, 'public/uploads')));


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
