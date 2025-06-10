const mongoose = require('mongoose')


const assignedBatchSchema = mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: 'student' },
    batchId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: 'batches' },
    courseId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: 'course' },

    createdAt: { type: Date, default: Date.now }

})

module.exports = mongoose.model('assignedBatch', assignedBatchSchema)