const admin=require('../model/admin')
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')


const register=(req,res)=>{
    res.render('./Admin/register')
}
const dashbord=(req,res)=>{
    res.render('./Admin/dashbord',{
        data:req.admin
    })
}

const register_create=(req,res)=>{
    admin({
        name:req.body.name,
        email:req.body.email,
        password:bcryptjs.hashSync(req.body.password,bcryptjs.genSaltSync(10))
    }).save((err,data)=>{
        if(!err){
            console.log("admin added");
            res.redirect('/login')
        }else{
            console.log(err,"admin not added");
        } 
    })
}
const login=(req,res)=>{
   
    res.render('./Admin/login',{
        data:req.admin,

    })
    
}
const login_create=(req,res)=>{
    admin.findOne({
       email:req.body.email
    },(err,data)=>{
       if(data){
        console.log(data);
        const hashpassword=data.password;
        if(bcryptjs.compareSync(req.body.password,hashpassword)){
           const token=jwt.sign({
               id:data._id,
               name:data.name
           },'nabendu1234@45',{expiresIn:'5m'})
           res.cookie("admintoken",token)
           if(req.body.rememberme){
               res.cookie('email',req.body.email)
               res.cookie('password',req.body.password)
           }
           console.log(data);
           res.redirect('/dashbord')
        }else{
        //    req.flash('messege2', "Invalide Password");
           
           console.log("invalide password");
           res.redirect('/login')
        }
       }else{
           console.log("invalide email");
           res.redirect('/login')
       } 
    })
}
Adminauth=(req,res,next)=>{
    if(req.admin){
        console.log("aa",req.admin);
        next();
    }else{
        console.log("bb",req.admin);

        res.redirect('/login')
    }
}
const logout=(req,res)=>{
    res.clearCookie("admintoken")
    res.redirect('/login')
}
module.exports={
    register,register_create,login,login_create,Adminauth,dashbord,logout
}