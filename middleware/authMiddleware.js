const jwt = require('jsonwebtoken');

// Middleware function for authenticating user tokens
module.exports = (req, res, next) => {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if token doesn't exist
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the decoded token contains user or partner information
        if (!decoded.user && !decoded.partner) {
            return res.status(401).json({ msg: 'Token is not valid' });
        }

        // Add user or partner to request object based on token type
        if (decoded.user) {
            req.user = decoded.user;
        } else if (decoded.partner) {
            req.partner = decoded.partner;
        }
        
        next(); // Move to the next middleware
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
