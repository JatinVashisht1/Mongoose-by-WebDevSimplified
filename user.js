const mongoose = require("mongoose")

// this is the second way to define nested objects,
// we make a whole different schema for them
// making another schema is makes things easy when we have many
// nested objects
const addressSchema = new mongoose.Schema({
    street: String,
    city: String
})

// defining schema
// schema is nothing but key value pairs
const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    createdAt: Date,
    updatedAt: Date,
    // this means that this bestfriend is the reference to the other object based on the id
    bestFriend: mongoose.SchemaTypes.ObjectId,
    // if we leave the brackets blank then it can be array of "anything"
    hobbies: [String],
    // there are two ways to add these nested objects inside of mongoose
    // below is the one way
    // in this you put objects just inside
    // in another way you can define a whole different schema
    /*
    address: {
        street: String,
        city: String
    }
    */
   // using second way
   // by doing this way if we print our user,
   // the the address property will also have its id
   address: addressSchema
})

// this takes two parameters,
// first one is the name of the model and 
// second one is the schema we defined
// we are exporting this because mostly we want our model to be used in other modules/files
module.exports = mongoose.model('User', userSchema)

