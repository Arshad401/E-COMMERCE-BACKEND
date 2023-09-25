
const express = require ("express");
const userRouter = express.Router()
const usercontroller = require ("../Controllers/usercontroller")
const verifyToken=require("../Middlewares/userauthmiddleware")

const trycatch = require("../Middlewares/trycatchmiddleware")

userRouter.post('/register',trycatch(usercontroller.createuser))
userRouter.post('/login',trycatch(usercontroller.userlogin))
userRouter.get('/products',verifyToken,trycatch(usercontroller.productList))
userRouter.get('/products/:id',verifyToken,trycatch(usercontroller.productById))
userRouter.get('/products/category/:categoryname',verifyToken,trycatch(usercontroller.ProductByCategory))


module.exports = userRouter;
