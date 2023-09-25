const mongoose = require ("mongoose");
const userschema = new mongoose.Schema({
    name:String,
    email:String,
    username:String,
    password:String,


  cart:[{type:mongoose.Schema.ObjectId, ref:"Product"}],
  wichlist:[{type:mongoose.Schema.ObjectId,ref:"Product"}],
  orders:[]

});

module.exports=mongoose.model("User",userschema);