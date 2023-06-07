import Post from "../models/Post";

export const createPost = async (req, res) => {
    const { title, description, url, status } = req.body;
    if (!title) {
        return res.status(400).json({
            success: false,
            message: "title is missing"
        })
    }
    try {
        const post = new Post({
            title,
            description,
            url: url.startsWith('htpps://') ? url : `https://${url}`,
            status: status || 'TO LEARN',
            user: req.userId
        })
        post.save();
        return res.status(200).json({
            success: true,
            message: "Happy learning",
            post: post
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}
export const getPosts = async (req, res) => {
    const userId = req.userId
    try {
        const posts = await Post.find({ user: userId }).populate('user', ['username']);
        return res.status(200).json({
            success: true,
            posts: posts
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}

export const updatePost = async (req, res) => {
    const { title, description, url, status } = req.body;
    try {
        let updatePost = {
            title,
            description: description || ' ',
            url: url.startsWith('https://') ? url : `https://${url}`,
            status: status || 'TO LEARN'

        }
        const postUpdateCondition = { _id: req.params.id, user: req.userId }
        updatePost = await Post.findOneAndUpdate(postUpdateCondition, updatePost, { new: true })

        // User not authorised to update Post

        if (!updatePost) {
            return res.status(401).json({
                success: false,
                message: "Post not found or user not authorised"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Excellent progress!", 
            post: updatePost
        })
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}

export const deletePost = async (req, res) => {
    const postId = req.params._id
    const postDeleteCondition = {_id: postId, user: req.userId};
    try {
       const deletePost = await Post.deleteOne({postDeleteCondition});
        if (!deletePost) {
            return res.status(401).json({
                success:false,
                message: "Post not found or user not authorised"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Delete Post success",
        })
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}