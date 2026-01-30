const express = require("express")
const noteModel= require("./models/notes.model")

const app = express()
app.use(express.json())

app.post("/notes",async(req,res)=>{
    const {title,description} = req.body
    const note = await noteModel.create({
        title,description

    })

    res.status(201).json({
        message: "Note created successfully",
        note
    })
})

app.get("/notes",async (req,res)=>{
    const note = await noteModel.find()//finds all data in DB and returns them in array of objects

    res.status(200).json({
        message:"Notes fetched successfully",
        note
    })
})

module.exports = app;
