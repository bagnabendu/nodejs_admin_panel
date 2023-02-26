const express=require('express')
const ejs=require('ejs')
const flash=require('connect-flash')
const session=require('express-session')
const jwt=require('jsonwebtoken')
const mongoose=require('mongoose')
const cookie_parser=require('cookie-parser')
const path=require('path')
const adminAuth=require('./middleware/adminAuth')
const app=express()

app.use(express.urlencoded({extended:true}))

app.use(flash())
app.use(cookie_parser())


app.use(session({
    cookie: {maxAge:60000},
    secret:'nabendu',
    resave:false,
    saveUninitialized:false
}))

app.set('view engine','ejs')
app.set('views','views')
app.use(adminAuth.aathjwt)
app.use(express.static(path.join(__dirname,'public')))
const webroute=require('./route/userRoute')
app.use(webroute)

const admin=require('./route/adminRoute')
app.use(admin)

const port=4300;
const dbDriver = "mongodb+srv://nabendumongodb:2h6KGtyXamQHxF6J@cluster0.k1maidj.mongodb.net/Admin_panel";
mongoose.connect(dbDriver,{useNewUrlParser:true,useUnifiedTopology:true})
.then(result=>{
    app.listen(port,(req,res)=>{
        console.log(`server is running http://localhost:${port}`);
        console.log("database is connected");
    })
})
