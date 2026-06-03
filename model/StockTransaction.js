const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({

    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },

    warehouse: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Warehouse",
        required: true
    },

    transactionDate: {
        type: Date,
        required: true
    },

    quantityMoved: {
        type: Number,
        required: true
    },

    transactionType: {
        type: String,
        enum: ["IN", "OUT"],
        required: true
    }

}, { timestamps: true });

module.exports = mongoose.model("StockTransaction", transactionSchema);