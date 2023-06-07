import express from "express";
import {getUsers, register, Login, checkIsLoginToken} from "../controllers/authControllers";
const router = express.Router();

import verifyToken from "../middleware/auth";

//@route GET api/auth
//@desc check if user is loggin in
//@access Public
router.get('/', verifyToken, checkIsLoginToken)

router.get("/get-all-users", getUsers);
router.post("/register", register);
router.post("/login", Login);

module.exports = router