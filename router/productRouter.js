const express = require("express");
const Product = require("../model/Product");

const router = express.Router();

router.post("/", async (req, res) => {

    try {

        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            product
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

router.get("/", async (req, res) => {

    try {

        const products = await Product.find();

        res.json({
            success: true,
            products
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;