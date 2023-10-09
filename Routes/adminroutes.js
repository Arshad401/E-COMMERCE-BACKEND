
const express = require('express')
const adminRouter = express.Router()
const adminController =require("../Controllers/admincontroller")
const verifyToken =require("../Middlewares/adminauthmiddleware")
const trycatch = require("../Middlewares/trycatchmiddleware")
const upload=require("../Middlewares/fileuploadmiddleware")





adminRouter.post('/login',trycatch(adminController.login))
adminRouter.get('/users',verifyToken,trycatch(adminController.getAllusers))
adminRouter.get('/users/:id',verifyToken,trycatch(adminController.getUserByid))
adminRouter.get('/products',verifyToken,trycatch(adminController.getAllProducts))
adminRouter.get('/products/category',verifyToken,trycatch(adminController.getProductsByCatogery))
adminRouter.get('/products/:id',verifyToken,trycatch(adminController.getProductById))
adminRouter.post('/products',verifyToken,upload,trycatch(adminController.createProduct))
adminRouter.put('/products',verifyToken,trycatch(adminController.updateProduct))
adminRouter.delete('/products',verifyToken,trycatch(adminController.deleteProduct))
adminRouter.get('/orders',verifyToken,trycatch(adminController.orders))
adminRouter.get('/stats',verifyToken,trycatch(adminController.stats))



module.exports = adminRouter