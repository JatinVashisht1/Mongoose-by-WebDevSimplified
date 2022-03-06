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
    try {
        const myUser = await user.create(
            {
                // note: if you provide wrong datatype in schema,
                // js will try to cast it to the valid datatype
                // and it will throw error if it is unable to cast it
                // to the valid datatype
                name: "Rahul", age: 26,
                hobbies: ["Weight Lifting", "Bowling"],
                address: {
                    street: "Main St",
                    city: "Ropar"
                }
            }
        )
        console.log(myUser)
    } catch(e){
        console.log("error is ", e.message)
    }
}

// instead of giving this promise we can make an async function
// myUser.save().then(() => console.log("User saved"))
run()