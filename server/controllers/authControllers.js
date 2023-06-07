import User from "../models/User";
import argon2 from "argon2";
import jsonwebtoken from "jsonwebtoken";


export const getUsers = async (req, res) => {
    try {
        let user = await User.find();
        return res.status(200).json({
            user: user,
            message: "Get user success!"
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const register = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: "missing username or password"
        })
    }
    try {
        const user = await User.findOne({ username })
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User is already exits",
            })
        }
        // oke
        const hashedPassword = await argon2.hash(password)
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        const accessToken = jsonwebtoken.sign({ userId: newUser._id }, process.env.ACCESS_TOKEN_SECRET);
        if (newUser) {
            return res.status(200).json({
                success: true,
                message: "user created successfully!",
                accessToken
            })
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}

export const Login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: "missing username or password",
        })
    }
    try {
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Incorrect username or password",
            })
        }
        // userName found
        const passwordvalid = await argon2.verify(user.password, password);
        if (!passwordvalid) {
            return res.status(400).json({
                success: false,
                message: "Incorrect username or password",
            })
        }
        const accessToken = jsonwebtoken.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET);
        return res.status(200).json({
            success: true,
            message: "Logged success",
            accessToken
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }

}
export const checkIsLoginToken = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password')
        if (!user) return res.status(400).json({ success: false, message: 'User not found' });
        return  res.status(200).json({
            success: true,
            user
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}