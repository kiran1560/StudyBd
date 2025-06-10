const student = require('./studentModel')
const UserModel = require('../../user/userModel')
const bcrypt = require('bcrypt')
const saltRounds = 10
const salt = bcrypt.genSaltSync(saltRounds)

exports.addstudent = async (req, res) => {
    if (req == undefined || req.body == undefined || req.body.student_name == undefined || req.body.email == undefined || req.body.password == undefined || req.body.phone_no == undefined || req.body.roll_no == undefined || req.body.qualification == undefined || req.body.city == undefined || req.body.gender == undefined) {
        res.json({
            "Message": "Please fill the Form",
            "Status": 400,
            "Success": false
        })

    } else {
        let formdata = req.body
        let prevUser = await UserModel.findOne({ email: formdata.email })
        if (prevUser != null) {
            res.json(
                {
                    "Message": "User already exits with same email",
                    "Status": 409,
                    "Success": false
                })
        } else {
            var studentobj = new student();
            studentobj.course_id = req.body.course_id
            studentobj.batch_id = req.body.batch_id
            studentobj.student_name = req.body.student_name
            studentobj.email = req.body.email
            studentobj.phone_no = req.body.phone_no
            studentobj.roll_no = req.body.roll_no
            studentobj.qualification = req.body.qualification
            studentobj.city = req.body.city
            studentobj.gender = req.body.gender
            studentobj.save().then(async studentsave => {
                let total = await UserModel.countDocuments()
                let userObj = UserModel()
                userObj.userId = total + 1
                userObj.name = studentsave.first_name
                userObj.email = studentsave.email
                userObj.password = bcrypt.hashSync(req.body.password, salt)
                userObj.studentId = studentsave._id
                userObj.save().then(ures => {
                    res.json(
                        {
                            "Message": "User Registered",
                            "Status": 200,
                            "Success": true,
                            "Student": studentobj
                        })
                })

            })


        }
    }
}

exports.showstudent = (req, res) => {

    student.find({ 'status': true }).exec(function (err, data) {
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
                "Message": "All Student",
                "Status": 200,
                "Success": true,
                "Data": data
            })
        }
    })


}
exports.fetchstudentbyid = (req, res) => {
    student.findOne({ "_id": req.body._id }).exec(function (err, data) {
        if (!data) {
            res.json({
                "Message": "No student found",
                "Status": 409,
                "Success": false
            })
        } else {
            res.json({
                "Message": "Single Student",
                "Status": 200,
                "Success": true,
                "Data": data
            })
        }

    })
}

exports.studentupdate = (req, res) => {
    student.findOne({ _id: req.body._id })
        .then(data => {
            if (data == null) {
                res.json(
                    {
                        "Message": "No Student Found.",
                        "status": 400,
                        "success": false,
                    }
                )
            }
            else {
                data.course_id = req.body.course_id
                data.batch_id = req.body.batch_id
                data.student_name = req.body.student_name
                data.phone_no = req.body.phone_no
                data.roll_no = req.body.roll_no
                data.qualification = req.body.qualification
                data.city = req.body.city
                data.gender = req.body.gender
                data.updatedAt = Date.now()
                data.save()
                    .then(update => {
                        UserModel.findOne({ studentId: update._id }).then(userObj => {
                            userObj.name = update.student_name
                            if (!!req.body.password)
                                userObj.password = bcrypt.hashSync(req.body.password, salt)
                            userObj.save()
                        })
                        res.json(
                            {
                                "message": "Student Updated Successfully.",
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
                                "message": "Error In Student Updation!",
                                "status": 404,
                                "success": false,
                                "Error": String(err)
                            }
                        )
                    })
            }
        })
}

exports.deletestudent = (req, res) => {
    student.deleteOne({ "_id": req.body._id }).exec(function (error, data) {
        res.json({
            "message": " Record Deleted Successfully",
            "status": 200,
            "success": true,
            "student": data
        })
    })
}

exports.studentRegister = (req, res) => {
    if (req == undefined || req.body == undefined || req.body.first_name == undefined ||
        req.body.last_name == undefined ||
        req.body.email == undefined || req.body.password == undefined ||
        req.body.confirm_password == undefined || req.body.phone_no == undefined ||
        req.body.city == undefined || req.body.country == undefined ||
        req.body.postal_code == undefined || req.body.gender == undefined) {
        res.json({
            "Message": "Please fill the Form",
            "Status": 400,
            "Success": false
        })

    } else {
        var studentobj = new student();
        studentobj.first_name = req.body.first_name
        studentobj.last_name = req.body.last_name
        studentobj.email = req.body.email
        studentobj.password = req.body.password
        studentobj.confirm_password = req.body.confirm_password
        studentobj.phone_no = req.body.phone_no
        studentobj.city = req.body.city
        studentobj.country = req.body.country
        studentobj.postal_code = req.body.postal_code
        studentobj.gender = req.body.gender
        studentobj.save().then(async studentsave => {
            let total = await UserModel.countDocuments()
            let userObj = UserModel()
            userObj.userId = total + 1
            userObj.name = studentsave.first_name
            userObj.email = studentsave.email
            userObj.password = studentsave.password
            userObj.studentId = studentsave._id
            userObj.save().then(res => {
                res.json(
                    {
                        "Message": "User Registered",
                        "Status": 200,
                        "Success": true,
                        "Student": studentobj
                    })
            })

        })

    }
}

exports.showregister = (req, res) => {


    student.find().exec(function (err, data) {
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
                "Message": "All Registered Student",
                "Status": 200,
                "Success": true,
                "Teacher": data
            })
        }
    })


}
exports.fetchstudentonebyid = (req, res) => {
    student.findOne({ "_id": req.body._id }).exec(function (err, data) {
        res.json({
            "Message": "Single Student Registered",
            "Status": 200,
            "Success": true,
            "Teacher": data
        })
    })
}

exports.registerupdate = (req, res) => {
    student.findOne({ _id: req.body._id })
        .then(data => {
            if (data == null) {
                res.json(
                    {
                        "Message": "No Student Found.",
                        "status": 400,
                        "success": false,
                    }
                )
            }
            else {
                data.name = req.body.name,
                    data.updatedAt = Date.now(),
                    data.save()
                        .then(async update => {
                            await User.updateOne({ studentId: update._id }, { name: update.name })
                            res.json(
                                {
                                    "message": "Student Updated Successfully.",
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
                                    "message": "Error In Student Updation!",
                                    "status": 404,
                                    "success": false,
                                    "Error": String(err)
                                }
                            )
                        })
            }
        })
}

