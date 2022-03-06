const mongoose = require("mongoose")

// defining schema
// schema is nothing but key value pairs
const userSchema = new mongoose.Schema ({
    name: String,
    age: Number,
})

// this takes two parameters,
// first one is the name of the model and 
// second one is the schema we defined
// we are exporting this because mostly we want our model to be used in other modules/files
module.exports = mongoose.model('User', userSchema)

