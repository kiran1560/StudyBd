var mongoose=require('mongoose')

var courseSchema=mongoose.Schema({
    course_name:{type:String },
    duration:{type:String},
    status:{type:Boolean,default:true},
    

    createdAt:{type:Date,default:Date.now()},
    updatedAt:{type:Date, }
})

var course=module.exports=mongoose.model('course',courseSchema);

module.exports.get=function(Callback,limit){
    course.find(Callback).limit(limit);
}