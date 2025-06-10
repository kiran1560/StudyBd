const assignment = require('./assignmentModel')
const StudentAssignment = require('../studentAssignment/studentAssignmentModel')
const AssignedBatches = require('../assignedBatch/assignedBatchModel')

exports.addassignment = (req, res) => {
    // console.log(req.body)
    if (req == undefined || req.body == undefined || req.body.title == undefined || req.body.description == undefined || req.body.marks == undefined || req.body.due_date == undefined) {
        res.json({
            "Message": "Please fill Assignment Name",
            "Status": 400,
            "Success": false
        })

    } else {
        var assignmentobj = new assignment();
        assignmentobj.course_id = req.body.course_id
        assignmentobj.batch_id = req.body.batch_id
        assignmentobj.title = req.body.title
        assignmentobj.description = req.body.description
        assignmentobj.marks = req.body.marks
        assignmentobj.due_date = req.body.due_date
        if (req.file != undefined) {
            assignmentobj.upload_file = "pdf/" + req.file.filename
        }
        assignmentobj.save().then(data => {
            assignAssignementsToStudents(data.batch_id, data._id)
            res.json({
                "Message": "Assignment Added",
                "Status": 200,
                "Success": true,
                "Assignment": data
            })
        }).catch(err => {
            res.json({
                "Message": "Assignment error",
                "Status": 400,
                "Success": false,
                "Assignment": err.toString()
            })
        })

    }
}

exports.showassignment = (req, res) => {

    req.body.status = true
    assignment.find(req.body)
        .populate("batch_id")
        .populate("course_id")
        .exec(function (err, data) {
            if (err) {
                res.json({
                    "Message": "Error in API",
                    "Status": 500,
                    "Success": false,
                    "Error": String(err)
                })
            }
            else {
                res.json({
                    "Message": "All Assignments",
                    "Status": 200,
                    "Success": true,
                    "Assignment": data
                })
            }
        })


}
exports.fetchassignmentbyid = (req, res) => {
    // console.log(req.body)
    assignment.findOne({ "_id": req.body._id })
        .populate("batch_id")
        .populate("course_id").exec(function (err, data) {
            res.json({
                "Message": "Single Assignment",
                "Status": 200,
                "Success": true,
                "Assignment": data
            })
        })
}

exports.assignmentupdate = (req, res) => {
    console.log(req.body)
    assignment.findOne({ _id: req.body._id })
        .then(data => {
            if (data == null) {
                res.json(
                    {
                        "Message": "No Assignment Found.",
                        "status": 400,
                        "success": false,
                    }
                )
            }
            else {
                data.course_id = req.body.course_id
                data.batch_id = req.body.batch_id
                data.title = req.body.title
                data.description = req.body.description
                data.due_date = req.body.due_date
                data.marks = req.body.marks
                if (req.file != undefined) {
                    data.upload_file = "pdf/" + req.file.filename
                }

                data.updatedAt = Date.now()
                data.save().then(update => {
                    res.json(
                        {
                            "message": "Assignment Updated Successfully.",
                            "status": 200,
                            "success": true,
                            "Assignment": update
                        }
                    )
                }
                )
                    .catch(err => {
                        res.json(
                            {
                                "message": "Error In Assignment Updation!",
                                "status": 404,
                                "success": false,
                                "Error": String(err)
                            }
                        )
                    })
            }
        })
}

exports.deleteassignment = (req, res) => {
    assignment.deleteOne({ "_id": req.body._id }).exec(function (error, data) {
        res.json({
            "message": " Record Deleted Successfully",
            "status": 200,
            "success": true,
            "assignment": data
        })
    })
}

async function assignAssignementsToStudents(batchId, assignmentId) {
    let students = await AssignedBatches.find({ batch_id: batchId })
    let studentsSize = !!students ? students.length : 0
    for (let i = 0; i < studentsSize; i++) {
        let studentAssignmentObj = StudentAssignment()
        studentAssignmentObj.batchId = batchId
        studentAssignmentObj.studentId = students[i].studentId
        studentAssignmentObj.assignmentId = assignmentId
        studentAssignmentObj.save()
    }


}



