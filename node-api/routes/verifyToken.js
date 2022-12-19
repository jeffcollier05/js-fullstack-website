const jwt = require("jsonwebtoken");

// VERIFY JWT TOKEN
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SEC, (err, user) => {
            if (err) {
                return res.status(403).json("Token is not valid!");
            }
            req.user = user;
            next();
        });
    } else {
        return res.status(401).json("You are not authenticated!");
    }
};

// VERIFY JWT TOKEN AND VERIFY USER PERMISSIONS
const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, ()=> {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return res.status(403).json("You are now allowed to do that!");
        }
    });
};

// VERIFY JWT TOKEN AND VERIFY ADMIN PERMISSIONS
const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, ()=> {
        if (req.user.isAdmin) {
            next();
        } else {
            return res.status(403).json("You are not an admin!");
        }
    });
};

module.exports = { 
    verifyToken, 
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
};