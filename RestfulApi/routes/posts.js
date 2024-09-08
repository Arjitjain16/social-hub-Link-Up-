const router = require("express").Router()
const Post = require("../models/Post")

// create
router.post("/", async (req, res) => {
    const newPost = new Post(req.body)
    try {
        const savedPost = await newPost.save()
        res.status(201).json(savedPost)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//update 
router.put("/:id", async (req, res) => {
    try {
       const post = await Post.findById(req.params.id)
        if (post.userId === req.body.userId){
            await post.updateOne({$set : req.body})
            res.status(200).json("Post updated successfully")
        }
    } catch (error) {
        res.status(401).json(error)
    }
})

//delete 
router.put("/:id", async (req, res) => {
    try {
       const post = await Post.findById(req.params.id)
        if (post.userId === req.body.userId){
            await post.deleteOne()
            res.status(200).json("Post deleted successfully")
        }
    } catch (error) {
        res.status(401).json(error)
    }
})

//like and dislike post

router.put("/like/:id", async (req, res) => {
    try {
       const post = await Post.findById(req.params.id)
        if (!post.likes.includes(req.body.userId)){
            await post.updateOne({$push : {likes : req.body.userId}})
            res.status(200).json("Post liked successfully")
        } else {
            await post.updateOne({$pull : {likes : req.body.userId}})
            res.status(200).json("Post disliked successfully")
        }
    } catch (error) {
        res.status(401).json(error)
    }
})

// timline 

router.get("/timeline", async (req, res) => {
    try {
        const currrentUser = await Post.findById(req.body.userId)
        const userPosts = await Post.find({userId : currrentUser._id})
        const friendPosts = await Promise.all(
            currrentUser.followings.map(friend => 
                Post.find({userId : friend}))
        )
        res.json(userPosts.concat(...friendPosts))
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})
module.exports = router