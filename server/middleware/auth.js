import  Jwt  from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Access token not found"
        })
    }
    try {
        const decoded = Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        req.userId = decoded.userId
        next()
    } catch(e) {
        return res.status(500).json({
            success: false,
            message: "Invalid token"
        })
    }
}

module.exports = verifyToken;
