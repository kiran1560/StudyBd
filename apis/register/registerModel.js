const { status } = require('express/lib/response');
var mongoose = require('mongoose');
const { stringify } = require('nodemon/lib/utils');
 var registerSchema=mongoose.Schema({
     FirstName:{type:String,default:''},
     LastName:{type:String,default:''},
     email:{type:String,default:''},
     password:{type:String,default:''},
     phone:{type:Number,default:0},
     createdAt:{type:Date,default:Date.now()},
     updateAt:{type:Date},
     status:{type:Boolean,default:true}
    
 })
 var register =module.exports=mongoose.model('register',registerSchema);  
