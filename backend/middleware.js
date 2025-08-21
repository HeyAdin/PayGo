const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { BlackListedToken } = require('./models/userModel');

async function authMiddleware(req, res, next) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer')) {
            const error = new Error('authorization token is not valid');
            throw error;
        }
        const token = authHeader.split(" ")[1];
        const blacklisted = await BlackListedToken.findOne({ token });
        if (blacklisted) {
            const error = new Error('token expired please sign in again');
            throw error;
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            const error = new Error('invalid token');
            throw error;
        }
        req.userId = decoded.userId;
        next();
    }
    catch (err) {
        console.log(err);
        await session.abortTransaction();
        session.endSession();
        res.status(403).json({ success: false, error: err.message });
    }
}

module.exports = { authMiddleware };