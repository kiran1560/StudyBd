var mongoose = require('mongoose')

var assignmentSchema = mongoose.Schema({
    course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'course', default: null },
    batch_id: { type: mongoose.Schema.Types.ObjectId, ref: 'batches', default: null },
    title: { type: String },
    description: { type: String },
    upload_file: { type: String, default: '' },
    marks: { type: String },
    due_date: { type: Date, default: null },
    status: { type: Boolean, default: true },

    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, }
})

var assignment = module.exports = mongoose.model('assignment', assignmentSchema);

module.exports.get = function (Callback, limit) {
    assignment.find(Callback).limit(limit);
}