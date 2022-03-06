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
        // to find a user by its object id
        // const myUser = await user.findById("622481ba351fcd8c7aa8129b")

        // find method in mongoose runs identical to that in mongodb
        // const myUser = await user.find({name: "Jatin"})

        // findOne is also similar to that of mongodb
        // exists will return id if at least one result exists with passed query
        // const myUser = await user.exists({name: "Jatin"})
        
        // deleteOne (is recomended by kyle)
        // const myUser =  await user.deleteOne({name: "Nitin"})

        // Queries in mongoose:
        // these are similar to flask queries
        // const myUser = await user.where("name").equals("Jatin")
        // we can also do chaining in mongoose queries
        // we can limit our results
        // we can also select certain fields from the documents returned
        // const myUser = await user.where("age").gt(12).where("name").equals("Jatin").limit(2).select("age")


        // const myUser = await user.where("age").gt(12).where("name").equals("Jatin").limit(2).select("age")
        // myUser[0].bestFriend = "6224758c60e14d331bef6825"
        // await myUser[0].save()

        const myUser = await user.where("age")
        .gt(12)
        .where("name")
        .equals("Jatin")
        .populate("bestFriend")
        .limit(1)

        console.log(myUser)
    } catch(e){
        console.log("error is ", e.message)
    }
}

// instead of giving this promise we can make an async function
// myUser.save().then(() => console.log("User saved"))
run()