const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        unique: [true, "User name already existing"],
        required: [true, "User name is required"]
    },

    email : {
        type: String,
        unique: [true, "email already existing"],
        required: [true, "email name is required"]
    },

    password: {
        type: String,
        required : [true, "Password is required"]
    },

    bio :String,
    profileImage: {
        type:String,
        default: "https://ik.imagekit.io/akshvt/defzult.webp",
    }
})

const userModel = mongoose.model("users", userSchema)

module.exports = userModel;