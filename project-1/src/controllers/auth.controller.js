const userModel = require('../models/user.model')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


async function registerController(req,res){
    
    const {email,username,password,bio,profileImage} = req.body

/*     const isUserExistingByEmail = await userModel.findOne({email})

    if(isUserExistingByEmail){
        return res.status(409).json({
            message: "user already existing with this email"
        })
    }

    const isUserExistingByUsername = await userModel.findOne({email})

    if(ifUserExistingByUsername){
        return res.status(409).json({
            message: "user already existing with this username"
        })
    } 
        
    This is inefficient since database calls are being made Twice*/

        const isUserExisting = await userModel.findOne({
            $or: [
                {email},
                {username}
            ]
        })

        if(isUserExisting){
            res.status(409).json({
                message:"User Already Existing, " + (isUserExisting.email == email ? "Email already exists" : "Username already exists")
            })
        }

        const hash = await bcrypt.hash(password,10) // number = salt value : kitni baar hashing karni hai

        const user = await userModel.create({
            username,
            email,
            bio,
            profileImage,
            password:hash
        })

         /* 
            user ka data unique hona chaiye
            data unique hona chaiye
            
            */  

        const token = jwt.sign(
            {id:user._id}, process.env.JWT_SECRET, {expiresIn: "1d"}
        )

        res.cookie("token", token) //stored the token in cookie for sevrer to access

        res.status(201).json({
            message: "User registered Successfully",
            user:{
                email: user.email,
                username: user.username,
                bio: user.bio,
                profileImage: user.profileImage

                //never share the password in frontend
            }
        })
}


async function loginController(req,res){
    
    const  { username, email, password} = req.body
    /* 
    
    *username
    *password

    * OR

    * email
    * password
    
    */

    const user = await userModel.findOne({
        $or: [

            {
                /* condition */
                username:username
            },

            {
                /* condition */
                email:email
            }
        ]
    })

    if(!user){
        return res.status(404).json({
            message:"User not found"
        })
    }

    

    const isPasswordValid = await bcrypt.compare(password,user.password)

    if(!isPasswordValid){
        return res.status(401).json({
            message:"Password Invalid"
        })
    }

    const token = jwt.sign(
        {id: user._id},process.env.JWT_SECRET, {expiresIn : "1d"}
    )

    res.cookie("token", token)

    res.status(200).json({
        message: "User loggedIn Successfully.",
        user: {
            username: user.username,
            email:user.email,
            bio: user.bio,
            profileImage: user.profileImage,

        }
    })

}


module.exports = {loginController,registerController}