const mongoose = require("mongoose")


const addressSchema = new mongoose.Schema({
    street: String,
    city: String
})

// defining schema
// schema is nothing but key value pairs
const userSchema = new mongoose.Schema({
    name: String,
    age: {
        type: Number,
        min: 1,
        max: 100,
        // we can also apply custom validation
        validate: {
            validator: (v) => v%2 !== 0,
            message: props => `${props.value} is not an even number`
        }
    },
    // this is the way to do schema validation
    // to make a field "required", we have to pass object instead of datatype only,
    // first key is the type of variable,
    // second is required which a boolean variable
    // we can explore other options also, try them to explore by yourself
    email: {
        type: String,
        required: true,
        lowercase: true,
        minlength: 5,
        maxlength: 20,

    },
    createdAt: {
        type: Date,
        immutable: true,
        // default: new Date() // this is not ideal way because it will run once and will give static value, same as writing 5 instead
        default: () => Date.now(), // this is the correct way of doing it

    },
    updatedAt: {
        type: Date,
        default: () => Date.now(),

    },
    // this means that this bestfriend is the reference to the other object based on the id
    bestFriend: {
        type: mongoose.SchemaTypes.ObjectId,
        // ref tell the mongoose which model does this object id refers
        ref: "User"
    },
    // if we leave the brackets blank then it can be array of "anything"
    hobbies: [String],
   address: addressSchema
})

// this takes two parameters,
// first one is the name of the model and 
// second one is the schema we defined
// we are exporting this because mostly we want our model to be used in other modules/files
module.exports = mongoose.model('User', userSchema)

