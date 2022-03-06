const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/testdb", ()=>{
    console.log("connected")
},
e => console.log("error connecting to database, due to: ", e)
)

// mongoose will queue up the database commands until it connects to mongodb 