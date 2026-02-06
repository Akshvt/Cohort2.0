const express = require('express')
const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')
const authRouter = express.Router()
const crypto = require('crypto')

/* 
/api/auth/register
 */

authRouter.post("/register", async(req,res)=>{
    const {email,name,password} = req.body

    const isUserAlreadyExists = await userModel.findOne({email})

    if(isUserAlreadyExists){
        return res.status(400).json({ //Task : Find if 400 or 409? => 409 (Check notes)
            message: "User already exists with this email address"
        })
    }

    const hash = crypto.createHash("md5").update(password).digest("hex") //created hashed password using user input

    await noteModel.create({
        email,password:hash,name
    })

    const token = jwt.sign(
        {
            id: user._id,
            email:user.email
        },
        process.env.JWT_SECRET //sign will be done using this secret key
    )

    res.cookie("jwt_token", token)

    res.status(201).json({
        message:"user registered",
        user,
        token
    })
})

/* /api/auth/protected */

authRouter.post("/protected", (req,res)=>{
    console.log(req.cookies)

    res.status(200).json({
        message: "This is a protected route"
    })
})

/* /api/auth/login */

/* controller --> A kind of callback which executes when api call is made */

authRouter.post("/login", async(req,res)=>{

    const {email, password} = req.body

    const user = await userModel.findOne({ email }) //User in DB

    if(!user){
        return res.status(404).json({
            message: "User not found with this email address"
        })
    }

    const isPasswordMatched = user.password /* db's pass */ === crypto.createHash("md5").update(password).digest("hex") /* converting the input user password to hash.. it will be the same as before if the plain text is same.. remember? */ //pass input vs pass in DB
    if(!isPasswordMatched){
        return res.status(401).json({
            message: "Invalid password"
        })
    }

    const token = jwt.sign({ //if all good.. give token
        id:user.id,

    },process.env.JWT_SECRET)

    res.status(200).json({
        message: "user logged in",
        user,
    })
})

module.exports = authRouter