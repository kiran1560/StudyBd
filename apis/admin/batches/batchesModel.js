var mongoose=require('mongoose')

var batchesSchema=mongoose.Schema({
    course_id:{type:mongoose.Schema.Types.ObjectId,ref:'course',default:null},
    teacher_id:{type:mongoose.Schema.Types.ObjectId,ref:'teacher',default:null},
    time:{type:String ,default:''},
    starting_date:{type:Date, default:null},
    status:{type:Boolean,default:true},
    createdAt:{type:Date,default:Date.now()},
    updatedAt:{type:Date}
})

var batches=module.exports=mongoose.model('batches',batchesSchema);

module.exports.get=function(Callback,limit){
    batches.find(Callback).limit(limit);
}