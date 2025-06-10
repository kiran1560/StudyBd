const express = require('express')
var cors = require('cors')
const app = express()
const db =require('./config/db')
const mongoose=require('mongoose')
app.use(express.urlencoded({extended:false}));
app.use(express.json({limit:'50mb'}));
app.use(express.static(__dirname+'/public'))
app.use(cors())
//const courseRoutes=require('./routes/courseRoutes.js')
//app.use('/course',courseRoutes)

//const teacherRoutes=require('./routes/teacherRoutes')
//app.use('/teacher',teacherRoutes)
const adminRoutes=require('./routes/adminRoutes')
app.use('/admin',adminRoutes)

 const studentRoutes=require('./routes/studentRoutes')
 app.use('/student',studentRoutes)

 let seed= require('./adminlogin/seed')
 seed.seedadmin()

app.listen(3001,function(){
    console.log("Server Start at 3001")
})