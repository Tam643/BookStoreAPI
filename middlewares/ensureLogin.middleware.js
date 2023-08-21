const { jwt, secretKey } = require('../configs/jwt.config');


module.exports = (roles = ['customer']) => (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ success: false, error: 'No token provided.' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ success: false, error: 'Failed to authenticate token.' });
        }

        if (roles.length > 0 && !roles.includes(decoded.role)) {
            return res.status(403).json({ success: false, error: 'Insufficient permissions.' });
        }

        // Token is valid and role (if specified) matches
        req.user = decoded;
        next();
    });
}