const User = require('../apis/user/userModel')
const bcrypt = require('bcrypt');
const saltRounds = 10
exports.seedadmin = () => {
    let data = {
        name: "Admin",
        password: 1234,
        email: "admin@gmail.com",
        userType: 1,
    }
    const hash = bcrypt.hashSync('1234', saltRounds);
    data.password = hash
    User.findOne({ email: "admin@gmail.com" })
        .then(data1 => {
            if (data1 == null) {
                let userObj = User(data)
                userObj.save()
            }
        })
}