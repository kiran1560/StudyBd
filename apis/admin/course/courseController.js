const course = require('./courseModel')

exports.addcourse = (req, res) => {
    // console.log(req.body)
    if (req == undefined || req.body == undefined || req.body.course_name == undefined || req.body.duration == undefined) {
        res.json({
            "Message": "Please fill Course Name",
            "Status": 400,
            "Success": false
        })

    } else {
        var courseobj = new course();
        courseobj.course_name = req.body.course_name
        courseobj.duration = req.body.duration


        courseobj.save()
        res.json({
            "Message": "Course Added",
            "Status": 200,
            "Success": true,
            "Course": courseobj
        })
    }
}

exports.showcourse = (req, res) => {


    course.find({ 'status': true }).exec(function (err, data) {
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
                "Message": "All Courses",
                "Status": 200,
                "Success": true,
                "Teacher": data
            })
        }
    })


}
exports.fetchcoursebyid = (req, res) => {
    // console.log(req.body)
    course.findOne({ "_id": req.body._id }).exec(function (err, data) {
        res.json({
            "Message": "Single Course",
            "Status": 200,
            "Success": true,
            "Teacher": data
        })
    })
}

exports.courseupdate = (req, res) => {
    console.log(req.body)
    course.findOne({ _id: req.body._id })
        .then(data => {
            if (data == null) {
                res.json(
                    {
                        "Message": "No Course Found.",
                        "status": 400,
                        "success": false,
                    }
                )
            }
            else {
                data.course_name = req.body.course_name
                data.duration = req.body.duration
                    data.updatedAt = Date.now(),
                    data.save()
                        .then(update => {
                            res.json(
                                {
                                    "message": "Course Updated Successfully.",
                                    "status": 200,
                                    "success": true,
                                    "Institute": data
                                }
                            )
                        }
                        )
                        .catch(err => {
                            res.json(
                                {
                                    "message": "Error In Course Updation!",
                                    "status": 404,
                                    "success": false,
                                    "Error": String(err)
                                }
                            )
                        })
            }
        })
}

exports.deletecourse = (req, res) => {
    course.deleteOne({ "_id": req.body._id }).exec(function (error, data) {
        res.json({
            "message": " Record Deleted Successfully",
            "status": 200,
            "success": true,
            "course": data
        })
    })
}





