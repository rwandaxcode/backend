const express = require("express");
const User = require("../model/User");

const router = express.Router();

router.post("/register", async (req, res) => {

    try {

        const user = await User.create(req.body);

        res.status(201).json({
            success: true,
            message: "User Registered",
            user
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

router.post("/login", async (req, res) => {

    try {

        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });
        }

        if (user.password !== password) {

            return res.status(400).json({
                message: "Wrong password"
            });
        }

        req.session.user = user;

        res.json({
            success: true,
            message: "Login successful",
            user
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

router.get("/logout", (req, res) => {

    req.session.destroy();

    res.json({
        success: true,
        message: "Logout successful"
    });
});

module.exports = router;