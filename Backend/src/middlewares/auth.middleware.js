const redis = require("../config/cache");
const jwt = require("jsonwebtoken");

async function authUser(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const isTokenBlacklisted = await redis.get(token);
        if (isTokenBlacklisted) {
            return res.status(401).json({ message: "token invalid" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}

module.exports = { authUser };
