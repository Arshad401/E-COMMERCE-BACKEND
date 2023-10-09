
const express = require ("express");
const userRouter = express.Router()
const usercontroller = require ("../Controllers/usercontroller")
const verifyToken=require("../Middlewares/userauthmiddleware")
const trycatch = require("../Middlewares/trycatchmiddleware")



userRouter.post('/register',trycatch(usercontroller.createUser))
userRouter.post('/login',trycatch(usercontroller.userlogin))
userRouter.get('/products',verifyToken,trycatch(usercontroller.productList))
userRouter.get('/products/:id',verifyToken,trycatch(usercontroller.productById))
userRouter.get('/products/category/:categoryname',verifyToken,trycatch(usercontroller.ProductByCategory))
userRouter.post('/:id/cart',verifyToken,trycatch(usercontroller.addTocart))
userRouter.get('/:id/cart',verifyToken,trycatch(usercontroller.showCart))
userRouter.delete('/:id/cart',verifyToken,trycatch(usercontroller.deleteCart))
userRouter.post('/:id/wishlist',verifyToken,trycatch(usercontroller.addToWishlist))
userRouter.get('/:id/wishlist',verifyToken,trycatch(usercontroller.showWishlist))
userRouter.delete('/:id/wishlist',verifyToken,trycatch(usercontroller.deleteWishlist))
userRouter.post('/:id/payment',verifyToken, trycatch(usercontroller.payment))
userRouter.get('/payment/success', trycatch(usercontroller.sucess))
userRouter.post('/payment/cancel', trycatch(usercontroller.cancel))




module.exports = userRouter;
