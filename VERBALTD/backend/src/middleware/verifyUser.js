const jwt = require('jsonwebtoken');

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    console.log(token);

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, 'dngfnjnxjmcxnxcn');
        req.user = decoded;
        next();
    } catch (error) {
        // If the token verification fails, send an unauthorized response
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = verifyUser;
