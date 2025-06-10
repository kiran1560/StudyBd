// const user=require("../user/userModel")
const register = require('./registerModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const saltRounds = 10
exports.addperson = (req, res) => {
    if (req == undefined || req.body == undefined || req.body.FirstName == undefined || req.body.LastName == undefined || req.body.phone == undefined || req.body.email == undefined) {
        res.json({
            "message": "please fill the form",
            "status": 400,
            "successs": false
        })
    }
    else {
        let regObj = new register()
        regObj.FirstName = req.body.FirstName
        regObj.LastName = req.body.LastName
        regObj.email = req.body.email
        regObj.phone = req.body.phone
        regObj.save()
            .then(regi => {
                let regsObj = new user()
                regsObj.FirstName = req.body.FirstName
                regsObj.LastName = req.body.LastName
                regsObj.email = req.body.email
                const hash = bcrypt.hashSync(req.body.password, saltRounds)
                regsObj.password = hash
                regsObj.phone = req.body.phone
                regsObj.registerId = regi._id
                regsObj.save()
                    .then(regist => {
                        res.json({
                            "message": "user added",
                            "status": 200,
                            "success": "true",
                            "user": regsObj
                        })
                    })
                    .catch(err => {
                        console.log(err)
                        res.json({
                            "message": "error in add user",
                            "status": 500,
                            "success": false,
                            "err": String(err)

                        })
                    })
            })


    }
}
exports.showperson = (req, res) => {
    register.find({ 'status': true }).exec(function (err, data) {
        if (err) {
            res.json({
                "message": "Error in API",
                "status": 500,
                "success": false,
                "error": String(err)
            })
        } else {
            res.json({
                "message": "person info",
                "status": 200,
                "success": true,
                "user": data
            })
        }
    })
}
exports.updateperson = (req, res) => {
    register.findOne({ "_id": req.body.id })
        .then(regsobj => {
            if (regsobj == null) {
                res.json({
                    "message": "No details Found",
                    "status": true,
                    "success": true
                })
            } else {
                regsobj.FirstName = req.body.FirstName
                regsobj.LastName = req.body.LastName
                regsobj.email = req.body.email
                regsobj.phone = req.body.phone

                regsobj.save()
                res.json({
                    "message": "person updated Suc",
                    "status": 200,
                    "success": true,
                    "user": regsobj
                })
            }
        })

}
exports.deleteperson = (req, res) => {
    console.log(req.body)
    register.findOne({ "_id": req.body.id })
        .then(regobj => {
            if (regobj == null) {
                res.json({
                    "message": "No details Found",
                    "status": 200,
                    "success": true
                })
            } else {
                regobj.status = false
                regobj.save()
                res.json({
                    "message": "user deleted Successfully",
                    "status": 200,
                    "success": true,
                    "user": regobj
                })
            }
        })

}
exports.fetchuserbyid = (req, res) => {
    console.log(req.body)
    register.findOne({ "_id": req.body.id }).exec(function (err, data) {
        res.json({
            "message": "single user",
            "status": 200,
            "success": true,
            "user": data
        })
    })
}

exports.login = (req, res) => {
    if (req == undefined || req.body == undefined || req.body.email == undefined || req.body.password == undefined) {
        res.json({
            "message": "please fill all values",
            "status": 400,
            "success": false
        })
    }

    else {
        register.findOne({ "email": req.body.email })
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
                    "err": string(err)
                })
            })
    }
}