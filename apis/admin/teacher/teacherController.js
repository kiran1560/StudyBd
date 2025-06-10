const teacher = require('./teacherModel')
const UserModel = require('../../user/userModel')
const bcrypt = require('bcrypt')
const saltRounds = 10
const salt = bcrypt.genSaltSync(saltRounds)

exports.addteacher = async (req, res) => {
    // console.log(req.body)
    // console.log("In Add Teacher data")
    if (req == undefined || req.body == undefined || req.body.teacher_name == undefined || req.body.email == undefined || req.body.password == undefined || req.body.phone_no == undefined || req.body.salary == undefined || req.body.qualification == undefined || req.body.city == undefined || req.body.gender == undefined) {
        res.json({
            "Message": "Please fill the Form",
            "Status": 400,
            "Success": false
        })

    } else {
        let prevUser = await UserModel.findOne({ email: req.body.email })
        if (prevUser != null) {
            res.send({ success: false, status: 409, message: "User already exists with same email" })
        } else {
            var teacherobj = new teacher();
            teacherobj.teacher_name = req.body.teacher_name
            teacherobj.email = req.body.email
            teacherobj.phone_no = req.body.phone_no
            teacherobj.salary = req.body.salary
            teacherobj.qualification = req.body.qualification
            teacherobj.city = req.body.city
            teacherobj.gender = req.body.gender
            // console.log("in SaveTeach Data")
            teacherobj.save().then(async teachrObj => {
                let total = await UserModel.countDocuments()
                let userObj = UserModel()
                userObj.userId = total + 1
                userObj.name = teachrObj.teacher_name
                userObj.email = teachrObj.email
                userObj.password = bcrypt.hashSync(req.body.password, salt)
                userObj.teacherId = teachrObj._id
                userObj.userType = 3
                userObj.save().then(ures => {
                    res.json({
                        "Message": "Teacher Added",
                        "Status": 200,
                        "Success": true,
                        "Teacher": teacherobj
                    })
                })
            })
            // console.log("Saved Teacher Data")

        }
    }
}

exports.showteacher = (req, res) => {


    teacher.find({ 'status': true }).exec(function (err, data) {
        // console.log(data)
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
                "Message": "All Teachers",
                "Status": 200,
                "Success": true,
                "Teacher": data
            })
        }
    })


}

exports.fetchteacherbyid = (req, res) => {
    teacher.findOne({ "_id": req.body._id }).exec(function (err, data) {
        res.json({
            "Message": "Single Teacher",
            "Status": 200,
            "Success": true,
            "Teacher": data
        })
    })
}

exports.teacherupdate = (req, res) => {
    teacher.findOne({ _id: req.body._id })
        .then(data => {
            if (data == null) {
                res.json(
                    {
                        "Message": "No Teacher Found.",
                        "status": 400,
                        "success": false,
                    }
                )
            }
            else {
                data.teacher_name = req.body.teacher_name
                data.password = req.body.password
                data.phone_no = req.body.phone_no
                data.salary = req.body.salary
                data.qualification = req.body.qualification
                data.city = req.body.city
                data.gender = req.body.gender
                data.updatedAt = Date.now(),
                    data.save()
                        .then(update => {
                            UserModel.findOne({ teacherId: update._id }).then(userObj => {
                                userObj.name = update.teacher_name
                                if (!!req.body.password)
                                    userObj.password = bcrypt.hashSync(req.body.password, salt)
                                userObj.save()
                            })
                            res.json({
                                "message": "Teacher Updated Successfully.",
                                "status": 200,
                                "success": true,
                                "Institute": data
                            }
                            )
                        })
                        .catch(err => {
                            res.json(
                                {
                                    "message": "Error In Teacher Updation!",
                                    "status": 404,
                                    "success": false,
                                    "Error": String(err)
                                }
                            )
                        })
            }
        })
}

exports.deleteteacher = (req, res) => {
    teacher.deleteOne({ "_id": req.body._id }).exec(function (error, data) {
        res.json({
            "message": " Record Deleted Successfully",
            "status": 200,
            "success": true,
            "Teacher": data
        })
    })
}


