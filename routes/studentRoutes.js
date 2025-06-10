const router=require('express').Router()
const userController=require("../apis/user/userController")
const studentController=require('../apis/admin/student/studentController')

router.get("/",(req,res)=>{
    res.send("Welcome to Student Route")
})

router.post('/adduser',studentController.studentRegister)
router.post('/showuser',studentController.showregister)
router.post('/showoneuser',studentController.fetchstudentonebyid)
router.post("/updateuser",studentController.registerupdate)
//router.post("/delete",studentController.deletestudent)
//router.post('/studentlogin',userController.studentlogin)




module.exports=router;