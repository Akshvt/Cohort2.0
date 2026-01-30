const mongoose = require("mongoose")

const noteSchema = new mongoose.Schema({
    title: String,
    description: String,
    
})

const noteModel = mongoose.model("notes", noteSchema)
module.exports = noteModel

/*
"notes" -> ek collection hai jisme saare notes ka data rahega (MongoDB Side we have collection, Js side we have Model)
Schema create karte hai format batane ke liye BUT
If u need to do any CRUD operations.. we use Model
Model uses Schema to interact with the DB ()
*/

/*
Defination:
1)Schema: Schema in Mongoose defines the structure, data types, validation rules, default values, and indexes for documents in a MongoDB collection
2)Model: Model is a compiled version of the Schema that provides an interface for interacting with the MongoDB database.
*/