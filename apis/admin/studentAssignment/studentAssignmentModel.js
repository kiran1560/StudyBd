const mongoose = require('mongoose')


const studentAssignmentSchema = mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: 'student' },
    batchId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: 'batches' },
    assignmentId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: 'assignment' },

    marksObtained: { type: Number, default: 0 },
    remarks: { type: String, default: '' },
    isEvaluated: { type: Boolean, default: false },
    isAttempted: { type: Boolean, default: false },
    studentAnswerFile: { type: String, default: '' },

    createdAt: { type: Date, default: Date.now }

})

module.exports = mongoose.model('studentAssignment', studentAssignmentSchema)