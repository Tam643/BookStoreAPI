const { jwt, secretKey } = require('../configs/jwt.config');


module.exports = (roles = ['customer','employee', 'manager']) => (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'No token provided.' });
    }

    const token = authHeader.substring(7);
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ success: false, message: 'Failed to authenticate token.' });
        }

        if (roles.length > 0 && !roles.includes(decoded.role)) {
            return res.status(403).json({ success: false, message: 'Insufficient permissions.' });
        }

        // Token is valid and role (if specified) matches
        req.user = decoded;
        next();
    });
}