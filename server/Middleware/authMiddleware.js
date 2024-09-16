// authMiddleware.js
const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const authMiddleware = (req, res, next) => {
    try {
        // Extract token from Authorization header (format: "Bearer <token>")
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'No token provided or improperly formatted' });
        }

        // Extract the token
        const token = authHeader.split(' ')[1];

        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET || '5b3c4e7d8f4e0b83a8a8b0f3b4f0c2d3e4f6e2a4d3e5b9f6d1b2c3d4e5f6a7b8c');

        // Attach the user ID to the request object
        req.userId = decoded.id; // Assuming `id` is the property in the JWT payload

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

module.exports = authMiddleware;
