const userModel = require("../models/user.model");
const blacklistModel = require("../models/blacklist.model");
const redis = require("../config/cache");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
};

async function registerUser(req, res) {
    const { username, email, password } = req.body;

    const isAlreadyRegistered = await userModel.findOne({ $or: [{ email }, { username }] });

    if (isAlreadyRegistered) {
        return res.status(400).json({ message: "User already exists" });
    }
    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password: hash
    });

    const token = jwt.sign({
        id: user._id, email: user.email,
        username: user.username,
    }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.cookie("token", token, cookieOptions);

    return res.status(201).json({
        message: "User registered successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

async function loginUser(req, res) {
    const { email, password, username } = req.body;

    const user = await userModel.findOne({ $or: [{ email }, { username }] }).select("+password");

    if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({
        id: user._id,
        email: user.email,
        username: user.username,
    }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.cookie("token", token, cookieOptions);
    return res.status(200).json({
        message: "Login successful", user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    });
}

async function getMe(req, res) {
    const user = await userModel.findById(req.user.id).select("-password").lean();

    res.status(200).json({ user });
}

async function logoutUser(req, res) {
    const token = req.cookies.token;
    res.clearCookie("token", cookieOptions);

    await redis.set(token, Date.now().toString());
    res.status(200).json({ message: "Logout successful" });
}

module.exports = { registerUser, loginUser, getMe, logoutUser }