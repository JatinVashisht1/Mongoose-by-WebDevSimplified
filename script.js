const mongoose = require("mongoose")
const user = require("./user")
mongoose.connect("mongodb://localhost/testdb", ()=>{
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

async function run(){ 
    // const myUser = new user({name: "Jatin", age: "19"})
    // await myUser.save()
    // another way to save user:
    const myUser = await user.create({name: "Jatin", age: 19})
    myUser.name = "Nitin"
    // to update user, we have to call save method explicitly
    await myUser.save()
    console.log("user saved")
    console.log(myUser)
}

// instead of giving this promise we can make an async function
// myUser.save().then(() => console.log("User saved"))
run()