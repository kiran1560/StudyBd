const AssignedBatchModel = require('./assignedBatchModel')


exports.getAll = (req, res) => {
    AssignedBatchModel.find(req.body).populate("courseId")
        .populate("batchId")
        .populate("studentId")
        .then(assignedBatches => {
            res.send({
                success: true,
                status: 200,
                message: "Assigned Batches loaded successfully",
                data: assignedBatches
            })
        }).catch(err => {
            res.send({
                success: false,
                status: 500,
                message: err.toString()
            })
        })

}
exports.getSingle = (req, res) => {
    AssignedBatchModel.findOne(req.body).populate("courseId")
        .populate("batchId")
        .populate("studentId")
        .then(assignedBatchObj => {
            if (!assignedBatchObj) {
                res.send({
                    success: false,
                    status: 404,
                    message: "No assigned batch found"
                })
            } else {
                res.send({
                    success: true,
                    status: 200,
                    message: "Assigned Batches loaded successfully",
                    data: assignedBatchObj
                })
            }

        }).catch(err => {
            res.send({
                success: false,
                status: 500,
                message: err.toString()
            })
        })

}


exports.addAssignedBatch = async (req, res) => {
    let formdata = req.body
    let validations = ""
    if (!formdata.studentId)
        validations += "studentId is required,"
    if (!formdata.batchId)
        validations += "batchId is required,"
    if (!formdata.courseId)
        validations += "courseId is required"
    if (validations != '') {
        res.send({
            success: false,
            status: 400,
            message: validations
        })
    } else {
        let prevBatch = await AssignedBatchModel.findOne({ $and: [{ studentId: formdata.studentId }, { courseId: formdata.courseId }] })
        if (!!prevBatch) {
            res.send({
                success: false,
                status: 409,
                message: "Batch is already assigned to student in same course"
            })
        }
        else {
            let assignedBatcheObj = AssignedBatchModel(formdata)
            assignedBatcheObj.save().then(saveres => {
                res.send({
                    success: true,
                    status: 200,
                    message: "Batch assigned successfully",
                    data: saveres
                })
            }).catch(err => {
                res.send({
                    success: false,
                    status: 500,
                    message: err.toString()
                })
            })
        }
    }

}

exports.updateAssignedBatch = (req, res) => {
    let formdata = req.body
    let validations = ""
    if (!formdata._id)
        validations += "_id is required"
    if (validations != '') {
        res.send({
            success: false,
            status: 400,
            message: validations
        })
    } else {

        AssignedBatchModel.findOne({ _id: req.body._id }).then(async obj => {
            if (!obj) {
                res.send({
                    success: false,
                    status: 404,
                    message: "No assigned batch found"
                })
            } else {
                if (!!formdata.studentId)
                    obj.studentId = formdata.studentId
                if (!!formdata.batchId)
                    obj.batchId = formdata.batchId
                if (!!formdata.courseId)
                    obj.courseId = formdata.courseId
                let id = obj._id
                let prevBatch = await AssignedBatchModel.findOne({ $and: [{ studentId: formdata.studentId }, { courseId: formdata.courseId }, { _id: { $ne: id } }] })
                if (!!prevBatch) {
                    res.send({
                        success: false,
                        status: 409,
                        message: "Batch is already assigned to student in same course"
                    })
                } else
                    obj.save().then(updateres => {
                        res.send({
                            success: true,
                            status: 200,
                            message: "Assigned Batch updated successfully",
                            data: updateres
                        })
                    }).catch(err => {
                        res.send({
                            success: false,
                            status: 500,
                            message: err.toString()
                        })
                    })

            }

        }).catch(err => {
            res.send({
                success: false,
                status: 500,
                message: err.toString()
            })
        })
    }

}

exports.deleteAssignedBatch = (req, res) => {
    AssignedBatchModel.findOne(req.body).populate("courseId")
        .populate("batchId")
        .populate("studentId")
        .then(assignedBatchObj => {
            if (!assignedBatchObj) {
                res.send({
                    success: false,
                    status: 404,
                    message: "No assigned batch found"
                })
            } else {
                assignedBatchObj.remove().then(delRes => {
                    res.send({
                        success: true,
                        status: 200,
                        message: "Assigned Batche deleted successfully"
                    })
                }).catch(err => {
                    res.send({
                        success: false,
                        status: 500,
                        message: err.toString()
                    })
                })

            }

        }).catch(err => {
            res.send({
                success: false,
                status: 500,
                message: err.toString()
            })
        })

}
