const express = require("express");
const StockTransaction = require("../model/StockTransaction");
const Product = require("../model/Product");

const router = express.Router();

router.post("/", async (req, res) => {

    try {

        const {
            product,
            warehouse,
            transactionDate,
            quantityMoved,
            transactionType
        } = req.body;

        const transaction = await StockTransaction.create({
            product,
            warehouse,
            transactionDate,
            quantityMoved,
            transactionType
        });

        const existingProduct = await Product.findById(product);

        if (transactionType === "IN") {

            existingProduct.quantityInStock += Number(quantityMoved);

        } else {

            existingProduct.quantityInStock -= Number(quantityMoved);
        }

        await existingProduct.save();

        res.status(201).json({
            success: true,
            transaction
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

        const transactions = await StockTransaction.find()
        .populate("product")
        .populate("warehouse");

        res.json({
            success: true,
            transactions
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

router.put("/:id", async (req, res) => {

    try {

        const updated = await StockTransaction.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json({
            success: true,
            updated
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

router.delete("/:id", async (req, res) => {

    try {

        await StockTransaction.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: "Transaction deleted"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;