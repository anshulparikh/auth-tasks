const express = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/user");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
    const { email, password, cPassword } = req.body;

    // Validate User
    const user = await User.findOne({ email });
    if (user) {
        return res.status(401).send("Email already exists!");
    }

    if (password.length < 6) {
        return res
            .status(401)
            .send(`Please minimun should be six characters long!`);
    }

    if (password !== cPassword) {
        return res.status(404).send(`Please check the password again!`);
    }

    // hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User({
        ...req.body,
        password: hashedPassword,
        cPassword: hashedPassword,
    });

    await newUser.save();
    // res.status(201).send(newUser);
    res.status(201).redirect("/index.html");
});

// Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    // Checking user details
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).send("Email not registered!");
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(401).send("Invalid passowrd!");
    }

    // res.status(200).send(user);
    res.status(200).redirect("/todo/todo.html");
});

module.exports = router;
