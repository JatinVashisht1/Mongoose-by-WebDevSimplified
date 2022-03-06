const mongoose = require("mongoose")
const user = require("./user")
mongoose.connect("mongodb://localhost/testdb", () => {
    console.log("connected")
},
    e => console.log("error connecting to database, due to: ", e)
)

// mongoose will queue up the database commands until it connects to mongodb 
// schema defines what the structure of the data looks like
// model is schema in actual form you can use
// query is the query you make in mongodb database
// most imp. is the schema
// make d/f files for each schema

// how to create new user

async function run() {
    // try not to use functions such as:
    // findOneAndReplace, findOneAndReplace, etc.
    // this is because they don't pass through schema validation!
    // instead just use simple, find, update, delete, etc. methods
    try {

        // const myUser = await user.findOne({name: "Jatin"})
        // this is the method we defined over our model instance in user.js file
        // myUser.sayHi()

        // this is the static method we defined over our schema in user.js file
        // const myUser = await user.findByName("Jatin")
        
        // we cannot apply byName directly to the user model
        // this is because we can only use it with query
        // as it is only defined over the query
        // const myUser = await user.find().byName("Jatin")
        // const myUser = await user.findOne({name: "Nitin", email: "test@test.com"})
        // console.log(myUser)

        const myUser = await user.findOne({name: "Nitin"})
        console.log(myUser.namedEmail)
        await myUser.save()
        console.log(myUser)

    } catch(e){
        console.log("error is ", e.message)
    }
}

// instead of giving this promise we can make an async function
// myUser.save().then(() => console.log("User saved"))
run()