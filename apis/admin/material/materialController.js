const material = require('./materialModel')

exports.addmaterial = (req, res) => {
    // console.log(req.body)
    if (req == undefined || req.body == undefined || req.body.title == undefined || req.body.description == undefined) {
        res.json({
            "Message": "Please fill Material Name",
            "Status": 400,
            "Success": false
        })

    } else {
        var materialobj = new material();
        materialobj.course_id = req.body.course_id
        materialobj.batch_id = req.body.batch_id
        materialobj.title = req.body.title
        materialobj.description = req.body.description
        if (req.file != undefined) {
            materialobj.upload_file = "pdf/" + req.file.filename
        }

        materialobj.marks = req.body.marks
        materialobj.due_date = req.body.due_date




        materialobj.save()
        res.json({
            "Message": "Material Added",
            "Status": 200,
            "Success": true,
            "Material": materialobj
        })
    }
}

exports.showmaterial = (req, res) => {
    req.body.status = true
    material.find(req.body)
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
                    "Message": "All Material",
                    "Status": 200,
                    "Success": true,
                    "Material": data
                })
            }
        })


}
exports.fetchmaterialbyid = (req, res) => {
    // console.log(req.body)
    material.findOne({ "_id": req.body._id }).populate('course_id').populate('batch_id').exec(function (err, data) {
        res.json({
            "Message": "Single Material",
            "Status": 200,
            "Success": true,
            "Material": data
        })
    })
}

exports.materialupdate = (req, res) => {
    console.log(req.body)
    material.findOne({ _id: req.body._id })
        .then(data => {
            if (data == null) {
                res.json(
                    {
                        "Message": "No Material Found.",
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
                if (!!req.file)
                    data.upload_file = "pdf/" + req.file.filename
                data.due_date = req.body.due_date
                data.updatedAt = Date.now()
                data.save()
                    .then(update => {
                        res.json(
                            {
                                "message": "Material Updated Successfully.",
                                "status": 200,
                                "success": true,
                                "Material": data
                            }
                        )
                    }
                    )
                    .catch(err => {
                        res.json(
                            {
                                "message": "Error In Materail Updation!",
                                "status": 404,
                                "success": false,
                                "Error": String(err)
                            }
                        )
                    })
            }
        })
}

exports.deletematerial = (req, res) => {
    material.deleteOne({ "_id": req.body._id }).exec(function (error, data) {
        res.json({
            "message": " Record Deleted Successfully",
            "status": 200,
            "success": true,
            "material": data
        })
    })
}