var mongoose = require('mongoose')

var studentSchema = mongoose.Schema({
    student_name: { type: String },
    email: { type: String },
    password: { type: String },
    phone_no: { type: Number },
    roll_no: { type: Number },
    qualification: { type: String },
    city: { type: String },
    gender: { type: String },
    status: { type: Boolean, default: true },


    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, }
})

var student = module.exports = mongoose.model('student', studentSchema);

module.exports.get = function (Callback, limit) {
    student.find(Callback).limit(limit);
}