
const express = require('express')
const adminRouter = express.Router()
const adminController =require("../Controllers/admincontroller")
const verifyToken =require("../Middlewares/adminauthmiddleware")
const trycatch = require("../Middlewares/trycatchmiddleware")




adminRouter.post('/login',trycatch(adminController.login))
adminRouter.get('/users',verifyToken,trycatch(adminController.getAllusers))
adminRouter.get('/users/:id',verifyToken,trycatch(adminController.getUserByid))
adminRouter.get('/products',verifyToken,trycatch(adminController.getAllProducts))
adminRouter.get('/products/category',verifyToken,trycatch(adminController.getProductsByCatogery))
adminRouter.get('/products/:id',verifyToken,trycatch(adminController.getProductById))
adminRouter.post('/products',verifyToken,trycatch(adminController.createProduct))



module.exports = adminRouter