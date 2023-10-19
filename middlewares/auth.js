const jwt = require('jsonwebtoken');
require('dotenv').config();
const {TOKEN_KEY} = process.env;
const {StatusCodes} = require('http-status-codes');

const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token) {
        return res.status(StatusCodes.FORBIDDEN).send({
             message: "A token is required for authentication"
        });
    }
    try {
        const decoded = jwt.verify(token, TOKEN_KEY);
        req.user = decoded;
    } catch (err) {
        return res.status(StatusCodes.UNAUTHORIZED).send({ 
            message: "Invalid Token"
        });
    }
    return next();
};

module.exports = verifyToken;