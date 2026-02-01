const express = require("express")
const noteModel = require("./models/note.model")
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

app.post('/api/notes', async(req,res)=>{
    const{title,description} = req.body

    await noteModel.create({
        title,description
    })

    res.status(201).json({
        message:"Notes created Successfully"
    })
})

app.get('/api/notes', async(req,res)=>{
    const notes = await noteModel.find() //this finds all data in ur collection and returns an array of data

    res.status(200).json({
        message:"Here are your Notes",
        notes
    })
})

app.delete('/api/notes/:id', async(req,res)=>{
    const id = req.params.id
    await noteModel.findByIdAndDelete(id)

    res.status(200).json({
        message:"Note deleted Successfully"
    })
})


app.patch('/api/notes/:id',async (req,res)=>{
    const id = req.params.id
    const{description} = req.body

   await noteModel.findByIdAndUpdate(id,{description})

   res.status(200).json({
    message:"Updated your notes!"
   })
})


module.exports = app


/* Additional Notes:
CORS Policy: Ek browser Security Policy jo kehti hai ki ek jagah rehte hue dusri jagah request nhi bhej sakte ---> Cross Origin Requests not allows
Here Our Frontend and Backend are both running on different PORTS => Different origins

Eg:
Hacker(xyz.com)===>Bank(sbi.com) ❌CORS Policy error
To evade this on development site we use cors package
app.use(cors())
*/