const batches = require('./batchesModel')

exports.addbatches = (req, res) => {
    if (req == undefined || req.body == undefined || req.body.course_id == undefined || req.body.teacher_id == undefined || req.body.time == undefined || req.body.starting_date == undefined) {
        res.json({
            "Message": "Please fill the Form",
            "Status": 400,
            "Success": false
        })

    } else {
        var batchesobj = new batches();
        batchesobj.course_id = req.body.course_id
        batchesobj.teacher_id = req.body.teacher_id
        batchesobj.time = req.body.time
        batchesobj.starting_date = req.body.starting_date


        batchesobj.save()
        res.json({
            "Message": "Batches Added",
            "Status": 200,
            "Success": true,
            "Batches": batchesobj
        })
    }
}

exports.showbatches = (req, res) => {
    console.log("req.body", req.body)
    req.body.status = true
    batches.find(req.body).populate('course_id').populate('teacher_id').exec(function (err, data) {
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
                "Message": "All Batches",
                "Status": 200,
                "Success": true,
                "Teacher": data
            })
        }
    })


}
exports.fetchbatchesbyid = (req, res) => {
    batches.findOne({ "_id": req.body._id })
        .populate("course_id")
        .populate("teacher_id")
        .exec(function (err, data) {
            res.json({
                "Message": "Single Batches",
                "Status": 200,
                "Success": true,
                "Batches": data
            })
        })
}

exports.batchesupdate = (req, res) => {
    batches.findOne({ _id: req.body._id })
        .then(data => {
            if (data == null) {
                res.json(
                    {
                        "Message": "No Batches Found.",
                        "status": 400,
                        "success": false,
                    }
                )
            }
            else {
                data.course_id = req.body.course_id,
                    data.time = req.body.time,
                    data.teacher_id = req.body.teacher_id,
                    data.starting_date = req.body.starting_date,
                    data.updatedAt = Date.now(),
                    data.save()
                        .then(update => {
                            res.json(
                                {
                                    "message": "Batches Updated Successfully.",
                                    "status": 200,
                                    "success": true,
                                    "Batches": data
                                }
                            )
                        }
                        )
                        .catch(err => {
                            res.json(
                                {
                                    "message": "Error In Batches Updation!",
                                    "status": 404,
                                    "success": false,
                                    "Error": String(err)
                                }
                            )
                        })
            }
        })
}

exports.deletebatches = (req, res) => {
    batches.deleteOne({ "_id": req.body._id }).exec(function (error, data) {
        res.json({
            "message": " Record Deleted Successfully",
            "status": 200,
            "success": true,
            "batches": data
        })
    })
}





