const User = require("../models/User");
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const router = require("express").Router();

// UPDATE USER
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString();
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        return res.status(200).json(updatedUser);
    } catch(err) {
        return res.status(500).json(err);
    }
});

// DELETE USER
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        return res.status(200).json("User has been deleted.");
    } catch(err) {
        return res.status(500).json(err);
    }
});

// GET SPECIFIC USER
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;
        return res.status(200).json(others);
    } catch(err) {
        return res.status(500).json(err);
    }
});

// GET ALL USERS
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const users = await User.find(req.params.id);
        return res.status(200).json(users);
    } catch(err) {
        return res.status(500).json(err);
    }
});

module.exports = router;