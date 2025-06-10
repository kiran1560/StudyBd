const StudentAssignmentModel = require('./studentAssignmentModel')


exports.getAll = (req, res) => {
    StudentAssignmentModel.find(req.body)
        .populate("batchId")
        .populate("studentId")
        .populate("assignmentId")
        .then(assignedBatches => {
            res.send({
                success: true,
                status: 200,
                message: "Student Assignments loaded successfully",
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
    StudentAssignmentModel.findOne(req.body)
        .populate("batchId")
        .populate("studentId")
        .populate("assignmentId")
        .then(assignedBatchObj => {
            if (!assignedBatchObj) {
                res.send({
                    success: false,
                    status: 404,
                    message: "No assignment found"
                })
            } else {
                res.send({
                    success: true,
                    status: 200,
                    message: "Student Assignment loaded successfully",
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



exports.updatestudentAssignment = (req, res) => {
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

        StudentAssignmentModel.findOne(req.body).then(async obj => {
            if (!obj) {
                res.send({
                    success: false,
                    status: 404,
                    message: "No assignment found"
                })
            }
            else if (obj.isAttempted) {
                res.send({
                    success: false,
                    status: 409,
                    message: "Already attempted"
                })
            }
            else {
                if (!!req.file)
                    obj.studentAnswerFile = "studentAnswers/" + req.file.filename
                obj.isAttempted = true
                obj.save().then(updateres => {
                    res.send({
                        success: true,
                        status: 200,
                        message: "Assignment attempted successfully",
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


exports.evaluateStudentAssignment = (req, res) => {
    let formdata = req.body
    let validations = ""
    if (!formdata._id)
        validations += "_id is required,"
    if (!formdata.marksObtained)
        validations += "marksObtained is required,"
    if (!formdata.remarks)
        validations += "remarks is required"
    if (validations != '') {
        res.send({
            success: false,
            status: 400,
            message: validations
        })
    } else {

        StudentAssignmentModel.findOne({ _id: req.body._id }).then(async obj => {
            if (!obj) {
                res.send({
                    success: false,
                    status: 404,
                    message: "No assignment found"
                })
            } else if (obj.isEvaluated) {
                res.send({
                    success: false,
                    status: 409,
                    message: "Already evaluated"
                })
            }
            else if (!obj.isAttempted) {
                res.send({
                    success: false,
                    status: 409,
                    message: "Not Attempted Yet"
                })
            }
            else {
                obj.marksObtained = formdata.marksObtained
                obj.remarks = formdata.remarks
                obj.isEvaluated = true
                obj.save().then(updateres => {
                    res.send({
                        success: true,
                        status: 200,
                        message: "Assignment attempted successfully",
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
