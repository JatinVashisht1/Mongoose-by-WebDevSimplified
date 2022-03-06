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

// we can't use arrow function in mongoose
// we have to use actual function
// because we have to reference each object with "this" keyword
// these functions becomes very useful when you have to do bunch of d/f things related to the model
// and don't want to have to define the code everywhere
// these methods will be available to each instance of the model
userSchema.methods.sayHi = function (){
    console.log("Hi, my name is", this.name)
}

// we can also define static methods
// these will be avaiable over the model itself and not over its instances

userSchema.statics.findByName = function (name){
    // TODO: learn about RegularExpressions in js
    // we are returning a query here
    // this can also be complex
    // where can also take almost everything that find takes!
    // using find because we just want to return a result and
    // don't want to chain queries and do query related stuff
    return this.find({name: new RegExp(name, 'i')})
}

// defining custom queries
userSchema.query.byName = function (name){
    // this can be used as a query and can also be used for chaining
    // different queries
    return this.where({name: new RegExp(name, 'i')})
}

// virtual is like a property
// but this is not actual property it is sort of "virtual property",
// this can be dependent on some other properties in schema
// for example in below example we have created a "namedEmail" property
// and this will be avaialable to all the instances of the model
// also note that this will not be saved in our database but only be avaialable in our code
userSchema.virtual("namedEmail").get(function(){
    return `${this.name} <${this.email}>`
})

// Schema middleware
// middleware in mongoose allows you to insert code in between the actions,
// for example creating the user or creating the user
// there can be a middleware for CRUD operations
// mostly used middlewares are create, update and remove one

// "pre" middleware will be called before we the data
// we can call the next to move to the next middleware
userSchema.pre("save", function(next){
    this.updatedAt = Date.now()
    // if don't call the next() then it would not move forward!
    next()
})

// doc here is the user object
// the thing that has been saved
userSchema.post("save", function(doc, next){
    doc.sayHi()
    // if don't call the next() then it would not move forward!
    // if you don't want to save the object then we can instead of
    // calling next we can throw error and catch where we are saving it
    next()
})

// Modeling our schema:
// this takes two parameters,
// first one is the name of the model and 
// second one is the schema we defined
// we are exporting this because mostly we want our model to be used in other modules/files
module.exports = mongoose.model('User', userSchema)

