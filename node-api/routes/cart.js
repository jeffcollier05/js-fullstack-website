const { verifyToken, verifyTokenAndAuthorization } = require("./verifyToken");
const Cart = require("../models/Cart");
const router = require("express").Router();

// CREATE CART
router.post("/new", verifyToken, async (req, res) => {
    const newCart = new Cart(req.body);

    try {
        const savedCart = await newCart.save();
        return res.status(200).json(savedCart);
    } catch(err) {
        return res.status(500).json(err);
    };
});

// UPDATE CART
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        return res.status(200).json(updatedCart);
    } catch(err) {
        return res.status(500).json(err);
    }
});

// DELETE CART
router.delete("/delete/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        return res.status(200).json("Cart has been deleted.");
    } catch(err) {
        return res.status(500).json(err);
    }
});

// GET USER CART
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const cart = await Cart.find({ userId: req.params.id });
        return res.status(200).json(cart);
    } catch(err) {
        return res.status(500).json(err);
    }
});

module.exports = router;