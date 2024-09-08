const router = require("express").Router()
const User = require("../models/User")
const bcrypt = require("bcrypt")

//update
router.put("/:id", async (req, res) =>{
    if (req.body.userId === req.params.id || req.body.isAdmin){
        if (req.body.password){
            try {
                const salt = bcrypt.genSalt(10)
                const hashedPassword = await bcrypt.hash(req.body.password, salt )
                req.body.password = hashedPassword
            } catch (error) {
                console.log(error , "came the error 1")
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            })
            res.status(200).json("password updated")
        } catch (error) {
            res.status(500).json("error" , error)
        }
    }else{
        return res.status(401).json({error: "Unauthorized"})
    }
    
})

//delete 

router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin){
        try {
            const user = await User.findByIdAndDelete(req.params.id)
            res.status(200).json("User deleted successfully")
        } catch (error) {
            res.status(500).json("error" , error)
        }
    }else{
        return res.status(401).json({error: "Unauthorized"})
    }
})

// get a user
router.get("/:id/follow", async (req, res) => {
    if ( req.body.userId === req.params.id || req.body.isAdmin){
       try {
        const user = await User.findById(req.params.id)
        if (!user) return res.status(404).json({ message: "User not found" })
        const {password,updatedAt, ...other} = user._doc
        res.json(other)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
    }
    
})

//follow a user
router.put("/follow/:id", async (req, res) => {
    if (req.body.userId === req.params.id){
        try {
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)
            if (!user.followers.includes(req.body.userId)){
                user.updateOne({$push : {followers : req.body.userId}})
                currentUser.updateOne({$push : {followings : req.params.id}})
            }else{
                res.status("you are already followers")
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }else{
        return res.status(401).json("you cannot follow yourself")
    }
})

// unfollow a user 

router.put("/unfollow/:id", async (req, res) => {
    if (req.body.userId === req.params.id){
        try {
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)
            if (user.followers.includes(req.body.userId)){
                user.updateOne({$pull : {followers : req.body.userId}})
                currentUser.updateOne({$pull : {followings : req.params.id}})
            }else{
                res.status("you has been unfollowed")
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }else{
        return res.status(401).json("you cannot unfollow yourself")
    }
})


module.exports = router