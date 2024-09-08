const router = require("express").Router()
const User = require("../models/User")
const bcrypt = require("bcrypt")

//Register
router.post("/register", async (req, res) =>{
    const {username, email, password} = req.body
    if (!username || !email || !password) {
        return res.status(400).json({ message: "Please provide all required fields." });
    }

    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = await new User({
            username: username,
            email: email,
            password: hashedPassword
        })
        await user.save()
        res.status(200).json("succussfully register")
    } catch (error) {
        console.log(err)
    }
})

//Login

router.post("/login" , async (req, res) =>{
    const {email, password} = req.body
    if (!email || !password) {
        return res.status(400).json({ message: "Please provide email and password." });
    }

    try {
        const user = await User.findOne({email : email})
       !user && res.status(400).json("not found")

        const isMatch = await bcrypt.compare(password, user.password)
        !isMatch && res.status(400).json("Invalid credentials")


        res.status(200).json("Login Succesfully!")
        console.log("hii")
    } catch (error) {
        console.log(err)
    }
 
})


module.exports = router