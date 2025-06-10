var mongoose = require('mongoose')

var materialSchema = mongoose.Schema({
    course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'course', default: null },
    batch_id: { type: mongoose.Schema.Types.ObjectId, ref: 'batches', default: null },
    title: { type: String },
    description: { type: String },
    upload_file: { type: String, default: '' },

    status: { type: Boolean, default: true },


    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, }
})

var material = module.exports = mongoose.model('material', materialSchema);

module.exports.get = function (Callback, limit) {
    material.find(Callback).limit(limit);
}