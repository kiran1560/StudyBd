var mongoose=require('mongoose')

var teacherSchema=mongoose.Schema({
    teacher_name:{type:String },
    email:{type:String},
    password:{type:String},
    phone_no:{type:Number},
    salary:{type:String},
    qualification:{type:String},
    city:{type:String},
    gender:{type:String},
    status:{type:Boolean,default:true},
    


    createdAt:{type:Date,default:Date.now()},
    updatedAt:{type:Date, }
})

module.exports=mongoose.model('teacher',teacherSchema);
