const express = require("express");
const Product = require("../model/Product");
const StockTransaction = require("../model/StockTransaction");

const router = express.Router();

router.get("/available-stock", async (req, res) => {

    try {

        const products = await Product.find();

        res.json(products);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
});

router.get("/stock-in", async (req, res) => {

    try {

        const stockIn = await StockTransaction.find({
            transactionType: "IN"
        });

        res.json(stockIn);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
});

router.get("/stock-out", async (req, res) => {

    try {

        const stockOut = await StockTransaction.find({
            transactionType: "OUT"
        });

        res.json(stockOut);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
});

router.get("/daily", async (req, res) => {

    try {

        const today = new Date();

        today.setHours(0,0,0,0);

        const daily = await StockTransaction.find({
            transactionDate: {
                $gte: today
            }
        });

        res.json(daily);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
});

module.exports = router;