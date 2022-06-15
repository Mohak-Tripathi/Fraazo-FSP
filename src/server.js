const app= require("./index")

const connect = require("./configs/db")

// const port = process.env.PORT || 4000

app.listen(4670, async()=>{


    try{
await connect()

console.log("listening to port 4670")
    }
    catch(error){
        consoel.log("error", error)
    }
})

