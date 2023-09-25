const mongoose = require ("mongoose");
const User = require ("../Models/userschema");
const Product = require ("../Models/productschema");
const jwt = require ("jsonwebtoken");
mongoose.connect("mongodb://0.0.0.0:27017/E-commerce-backend",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = {
    
// Create a user with name, email, username (POST api/users/register)

 createuser: async (req,res) => {
    const { name, email, username, password } = req.body;
    await User.create({
        name: name,
        email: email,
        username: username,
        password: password
    });
    res.status(200).json({
        status: "success",
        message: "user registration successfull.",
    });
 },

//  User login    (POST api/users/login)

userlogin: async (req,res) =>{
    const { username,password } = req.body;

    const user = User.findOne({ username: username, password: password});
    if (!user) {
        return res.status(404).json({ error: "user not foud"});
    }
    const token = jwt.sign(
        { username: user.username },
        process.env.USER_ACCESS_TOKEN_SECRET
    );
    res
    .status(200)
    .json({ status: "success", message: "login successful", data: token });
},


// get arrays of object which contain products details.  (GET api/users/products)


productList: async (req,res) =>{
    const productList =  await Product.find();
    res.status(200).json({
        status:"success",
        message:"successfully fetched product data",
        data:productList,
    });
},

// get a product details as a json object.   (GET api/users/products/:id)


productById: async (req,res) => {
    const id = req.params.id;
    const productById = await Product.findById(id);
    if (!productById) {
        return res.status(404).json({ error: "product not found"});
    }
    res.status(200).json({
        status:"success",
        message:"successfully fetched product details.",
        data: productById,

    });
},

// get list of  products based on category (GET api/users/products/category/:categoryname)

ProductByCategory: async (req,res) => {
    const Category = req.params.categoryname;
    const products = await Product.find({ category: Category});
    if (!products) {
        return res.status(404).json({ error: "category not found"});
    }
    res.status(200).json({
        status: "success",
        message: "successfully fetched category details.",
        data: products,
    });
},


}