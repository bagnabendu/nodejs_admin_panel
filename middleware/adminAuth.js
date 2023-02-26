const jwt=require('jsonwebtoken')

exports.aathjwt=(req,res,next)=>{
    if(req.cookies && req.cookies.admintoken){
        jwt.verify(req.cookies.admintoken,'nabendu1234@45',(err,data)=>{
            req.admin=data
            next();
        })
    }else{
        next();
   }
}