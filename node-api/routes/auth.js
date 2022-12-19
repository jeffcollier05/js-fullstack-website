const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// BYPASSES CORS ERROR BY ALLOWING REQUESTS FROM ANY ADDRESS
var cors = require('cors')
router.use(cors())

// REGISTER A USER
router.post("/register", async (req, res) => {
    const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
    });

    try {
        const savedUser = await newUser.save();
        return res.status(201).json(savedUser)   
    } catch(err) {
        return res.status(500).json(err);
    }
});

// LOGIN USER
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username});
        
        if(!user) {
            return res.status(401).json("No username");
        }

        const OriginalPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC).toString(CryptoJS.enc.Utf8);
        
        if(OriginalPassword !==req.body.password) {
            return res.status(401).json("Wrong password");
        } 
        
        const accessToken = jwt.sign(
            {
                id:user._id, 
                isAdmin: user.isAdmin,
            }, 
            process.env.JWT_SEC,
            {expiresIn:"3d"}
        );
        
        const { password, ...others } = user._doc;
        return res.status(200).json({...others, accessToken});

    } catch(err) {
        return res.status(500).json(err);
    }
});

module.exports = router;