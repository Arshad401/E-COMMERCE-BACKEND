const mongoose = require ("mongoose");
const bcrypt = require("bcrypt");
const userschema = new mongoose.Schema({
    name:String,
    email:String,
    username:String,
    password:String,


  cart: [{ type: mongoose.Schema.ObjectId, ref: "Product" }],
  wichlist:[{ type: mongoose.Schema.ObjectId, ref: "Product" }],
  orders:[],

});
userschema.pre("save",async function(next){
  try{
    const salt = await bcrypt.genSalt(10)
    const hashedPassword =  await bcrypt.hash(this.password,salt)
    this.password = hashedPassword
    next()
  }catch(error){
    next(error)
  }
})

module.exports=mongoose.model("User",userschema);