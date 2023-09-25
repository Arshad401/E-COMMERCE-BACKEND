const mongoose = require("mongoose");
const productschema = new mongoose.Schema({
    title:String,
    description:String,
    price:Number,
    image:String,
    category:String,
});

module.exports=mongoose.model("Product",productschema);
