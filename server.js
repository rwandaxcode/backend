const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");

const authRouter = require("./router/authRouter");
const productRouter = require("./router/productRouter");
const warehouseRouter = require("./router/warehouseRouter");
const transactionRouter = require("./router/transactionRouter");
const reportRouter = require("./router/reportRouter");

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());

app.use(session({
    secret: "stockhubsecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}));

mongoose.connect("mongodb://127.0.0.1:27017/SMS")
.then(() => {
    console.log("MongoDB Connected");
})
.catch((error) => {
    console.log(error);
});

app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/warehouses", warehouseRouter);
app.use("/api/transactions", transactionRouter);
app.use("/api/reports", reportRouter);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});