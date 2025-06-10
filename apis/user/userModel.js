var mongoose = require('mongoose')
var userSchema = mongoose.Schema({
    userId: { type: Number },
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    password: { type: String, default: '' },
    userType: { type: Number, default: 2 }, // 1->Admin , 2-> Student , 3=>Teacher
    studentId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: "student" },
    teacherId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: "teacher" },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, }
})

module.exports = mongoose.model('user', userSchema)
