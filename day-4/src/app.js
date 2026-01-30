/*

- derver create krna
- server ko config karna


*/

const express = require('express')

const notes = []

const app = express() //server created

app.use(express.json())

//POST Notes
app.post("/notes",(req,res)=>{
    
    notes.push(req.body)
    console.log(notes)
    res.send("Notes created")
})

//GET Notes
app.get("/notes",(req,res)=>{
    res.send(notes)
})

/*deletes the node at index: x (dynamic)
delete /notes/1*/

// req.body is used when data is Big
// req.params when data is small/singular

app.delete("/notes/:index",(req,res)=>{
    delete notes[req.params.index]
    console.log("Notes deleted succesfully")
})

/*PATCH /notes/:index
req.body ={description: "sample modified description"}*/

app.patch("/notes/:index",(req,res)=>{
    notes[req.params.index].description = req.body.description
    res.send("Notes Updated")
})

module.exports = app  //exporting the server