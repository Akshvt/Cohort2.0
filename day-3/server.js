const express = require('express') //importing express

const app = express() //creating an instance of it

app.use(express.json()) //this will convert incoming (by postman) data (req.body) into json (for backend server to undestand)

const notes = []

app.post("/notes",(req,res)=>{
    console.log(req.body)
    notes.push(req.body)
    res.send("Notes Created")
})

app.get("/notes",(req,res)=>{
    res.send(notes)
})

app.listen(3000,()=>{
    console.log("Server is now running...")
});  //we have started the server at port 3000