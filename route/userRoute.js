const express=require('express')
const route=express.Router()
const controller=require('../controller/usercontroller')


route.get('/',controller.home)


module.exports=route