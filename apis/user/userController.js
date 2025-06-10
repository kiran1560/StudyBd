const user = require('../user/userModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


exports.login = (req, res) => {

    if (req == undefined || req.body == undefined || req.body.email == undefined || req.body.password == undefined) {
        res.json({
            "message": "please fill all values",
            "status": 400,
            "success": false
        })
    }

    else {
        user.findOne({ "email": req.body.email })
            .then(userobj => {
                if (userobj == null) {
                    res.json({
                        "message": "no user exist",
                        "status": 400,
                        "success": true
                    })
                }

                else {

                    if (bcrypt.compareSync(req.body.password, userobj.password)) {
                        let payload = { _id: userobj._id, FirstName: userobj.FirstName, phone: userobj.phone }
                        let token = jwt.sign(payload, "SECRET")
                        res.json({
                            "message": "user successfully logined in",
                            "status": 200,
                            "success": true,
                            token: token,
                            data: userobj
                        })
                    }

                    else {
                        res.json({
                            "message": "invalid email or password",
                            "status": 400,
                            "success": false
                        })
                    }
                }
            })

            .catch(err => {
                console.log(err);
                res.json({
                    "message": "error in email",
                    "status": 500,
                    "success": false,
                    "err": String(err)
                })
            })
    }
}
exports.alluser = (req, res) => {
    user.find()
        .select("name email userType studentId")
        .populate('studentId', "phone college quali hobbies")
        .then(data => {
            if (data == null) {
                res.json({
                    "message": "no user exist",
                    "status": 200,
                    "success": true
                })
            } else {
                res.json({

                    "message": "all user page",
                    "status": 200,
                    "success": true,
                    "user": data
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.json({
                "message": "error in all user page",
                "status": 500,
                "success": false,
                "error": String(err)

            })
        })
}


exports.loginstudent = (req, res) => {
    if (req == undefined || req.body == undefined || req.body.email == undefined || req.body.password == undefined) {
        res.json({
            "message": "please fill all values",
            "status": 400,
            "success": false
        })
    }

    else {
        user.findOne({ "email": req.body.email })
            .then(userobj => {
                if (userobj == null) {
                    res.json({
                        "message": "no user exist",
                        "status": 400,
                        "success": true
                    })
                }

                else {
                    if (bcrypt.compareSync(req.body.password, userobj.password)) {
                        res.json({
                            "message": "user successfully logined in",
                            "status": 200,
                            "success": true
                        })
                    }

                    else {
                        res.json({
                            "message": "invalid email or password",
                            "status": 400,
                            "success": false
                        })
                    }
                }
            })

            .catch(err => {
                console.log(err);
                res.json({

                    "message": "error in email",
                    "status": 500,
                    "success": false,
                    "err": string(err)
                })
            })
    }
}
exports.studentlogin = (req, res) => {
    if (req == undefined || req.body == undefined || req.body.email == undefined || req.body.password == undefined) {
        res.json({
            "message": "fill values",
            "status": 200,
            "success": false
        })
    }

    else {
        user.findOne({ 'email': req.body.email })
            .then(userObj => {
                if (userObj == null) {
                    res.json({
                        "message": "No User Exist",
                        "status": 400,
                        "success": true
                    })
                } else {
                    if (bcrypt.compareSync(req.body.password, userObj.password)) {
                        let useInfo = {
                            name: userObj.name,
                            email: userObj.email,
                            _id: userObj._id,

                        }


                        res.json({
                            "message": "User Successfully Loged in",
                            "status": 200,
                            "success": true,

                        })
                    }
                    else {
                        res.json({
                            "message": "Invalid Email and Password",
                            "status": 400,
                            "success": false
                        })
                    }
                }
            }).catch(err => {
                console.log(err)
                res.json({
                    "message": "Error in Email",
                    "status": 500,
                    "success": false,
                    "err": String(err)
                })
            })

    }

}

