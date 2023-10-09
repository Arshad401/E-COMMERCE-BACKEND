
const mongoose = require("mongoose");
const User = require("../Models/userschema");
const Product = require("../Models/productschema");
const jwt = require("jsonwebtoken");
const { joiProductSchema } = require("../Models/joyValidationSchema");
mongoose.connect("mongodb://0.0.0.0:27017/E-commerce-backend",{
  useNewUrlParser: true,
  useUnifiedTopology:true,
});




module.exports = {

    // Admin Login (POST api/admin/login)

    login: async (req, res) => {
        const { username, password } = req.body;

        if (
          username == process.env.ADMIN_USERNAME &&
          password == process.env.ADMIN_PASSWORD
        ) {
          const token = jwt.sign(
            { username: username },
            process.env.ADMIN_ACCESS_TOKEN_SECRET
          );
          res.status(200).json({
            status: "success",
            message: "Successfully logged In.",
            data: { jwt_token: token },
          });
        } else {
          return res.status(404).json({
            status: "error",
            message: "Not an Admin",
          });
        }
      },


      // Get all users list (GET api/admin/users)

      getAllusers: async (req,res) =>{
        const allusers = await User.find();
        res.status(200).json({
          status: "success",
          message: "successfully fetched user datas.",
          data: allusers,
        });
      },

      // Get a specific user based on the id provided (GET api/admin/users/:id)

      getUserByid: async (req,res) => {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user){
          return res.status(404).json({ error: "user not found"})
        }
        res.status(200).json({
          status: "success",
          message:  "sucessfully fetched user data.",
          data: user,
        });
      },


      // Get all products list (GET api/admin/users)

      getAllProducts: async (req,res) =>  {
        const allproducts = await Product.find();
        res.status(200).json({
          status: "success",
          message: "successfully fetched product detail.",
          data: allproducts, 
        });
      },

      // Get  list of products based on the category (GET api/admin/products?category=men)

      getProductsByCatogery: async (req,res) => {
        const categ = req.query.name;
        console.log(categ);
        const products = await Product.find({ category: categ});
        if (!products) {
          return res.status(404).json({ error: "category not found"})
        }
        res.status(200).json({
          status: "success",
          message: "successfully fetched product details.",
          data: products,
        });
      },


      // Get a product based on the id provided (GET api/admin/products/:id)


       
     getProductById: async (req, res) => {
      const productId = req.params.id;
      const product = await Product.findById(productId); 
      if (!product) {
        return res.status(404).json({ error: "User not found"});
      }
      res.status(200).json({
        status: "success",
        message: "successfully fetched product details.",
        data:  product,
      });
     },
     
     
    //  Create products (POST api/admin/products)

    createProduct:  async (req,res) =>{
      const { title,description,image,price,category} = req.body;

      await Product.create({
        title,
        description,
        price,
        image,
        category,
      });
      res.status(201).json({
        status: "success",
        message: "successfully created a product.",
      });
    },



    // Update a product (PUT api/admin/products)


    updateProduct: async (req,res) => {
      const { title, description, image, price, category, id } = req.body;
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ error: "product not found" });
      }
      await Product.updateOne({ _id: id}, {$set: {
        title: title,
        description : description,
        price: price,
        image: image,
        category: category,
      }});
      res.status(201).json({
        status: "success",
        message: "successfully updated the product.",
      });
    },


    // Delete a product (DELETE api/admin/products)


    deleteProduct : async (req,res) => {
      const { id } = req.body;
      await Product.findByIdAndDelete(id);
      res.status(201).json({
        status:  "success",
        message: "successfully deleted the product.",
      });
    },




    // Get stats (GET api/admin/stats)


    stats: async (req, res) => {
      const aggregation = User.aggregate([
        {
          $unwind: "$orders",
        },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: "$orders.totalamount" },
            totalItemsSold: { $sum: { $size: "$orders.product" } },
          },
        },
      ]);
      const result = await aggregation.exec();
      const totalRevenue = result[0].totalRevenue;
      const totalItemsSold = result[0].totalItemsSold;

        res.status(200).json({
          status: "success",
          message: "successfully fetched stats.",
          data: {
            "Total Revenue" : totalRevenue,
            "Total Items Sold" : totalItemsSold,
          },
        });
      },



    // Get the list of order details. (GET api/admin/orders)


    orders: async (req, res) => {
      const order = await User.find({ orders: { $exists: true }}, {orders:1});
      const orders = order.filter((item) => {
        return item.orders.length >0;
      });

      res.status(200).json({
        status: "success",
        message:"successfully fetched order details.",
        data: orders,
      });
    },


};