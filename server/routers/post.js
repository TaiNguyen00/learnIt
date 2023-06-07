import express from "express";
import { createPost, deletePost, getPosts, updatePost} from "../controllers/postControllers";
import verifyToken from "../middleware/auth";

const router = express.Router();

router.post("/",verifyToken , createPost);
router.get("/", verifyToken, getPosts);
router.put("/update-post/:id",verifyToken, updatePost);
router.delete("/delete-post/:id", verifyToken, deletePost);

module.exports = router;