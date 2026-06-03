const express = require("express");
const Warehouse = require("../model/Warehouse");

const router = express.Router();

router.post("/", async (req, res) => {

    try {

        const warehouse = await Warehouse.create(req.body);

        res.status(201).json({
            success: true,
            warehouse
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

        const warehouses = await Warehouse.find();

        res.json({
            success: true,
            warehouses
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;