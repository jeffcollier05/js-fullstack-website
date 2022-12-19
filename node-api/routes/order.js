const router = require("express").Router();
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const Order = require("../models/Order");

// CREATE ORDER
router.post("/new", verifyToken, async (req, res) => {
    const newOrder = new Order(req.body);

    try {
        const savedOrder = await newOrder.save();
        return res.status(200).json(savedOrder);
    } catch(err) {
        return res.status(500).json(err);
    }
});

// UPDATE ORDER
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        return res.status(200).json(updatedOrder);
    } catch(err) {
        return res.status(500).json(err);
    }
});

// DELETE ORDER
router.delete("/delete/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        return res.status(200).json("Order has been deleted.");
    } catch(err) {
        return res.status(500).json(err);
    }
});

// GET USER ORDER
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const order = await Order.find({ userId: req.params.id });
        return res.status(200).json(order);
    } catch(err) {
        return res.status(500).json(err);
    }
});

module.exports = router;