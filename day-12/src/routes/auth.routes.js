const express = require('express')
const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')
const authRouter = express.Router()

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

    await noteModel.create({
        email,password,name
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

module.exports = authRouter