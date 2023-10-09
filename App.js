require("dotenv").config()
const express = require("express")
const app = express();
const port = 4000;
const adminroute = require("./Routes/adminroutes")
const userroute = require("./Routes/userroutes")
const ErrorHandler = require("./middlewares/ErrorHandler");

app.use(express.json())
app.use('/api/admin',adminroute)
app.use('/api/users',userroute)
app.use(ErrorHandler);

app.listen(port,(err=>{
    if(err){
        console.log("something went wrong");
    }

    console.log("listening on port",+port);
    
}))