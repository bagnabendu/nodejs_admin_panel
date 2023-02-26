const express=require('express')
const route=express.Router()
const controller=require('../controller/admincontroller')

route.get('/register',controller.register)
route.post('/register/create',controller.register_create)
route.get('/login',controller.login)
route.post('/login/create',controller.login_create)
route.get('/dashbord',controller.dashbord)
route.get('/logout',controller.logout)


module.exports=route