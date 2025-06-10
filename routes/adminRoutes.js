const router = require('express').Router()
const userController = require('../apis/user/userController')
const registerController = require('../apis/register/registerController')
const courseController = require('../apis/admin/course/courseController')
const teacherController = require('../apis/admin/teacher/teacherController')
const studentController = require('../apis/admin/student/studentController')
const batchesController = require('../apis/admin/batches/batchesController')
const assignmentController = require('../apis/admin/assignment/assignmentController')
const materialController = require('../apis/admin/material/materialController')
const assignedBatchController = require('../apis/admin/assignedBatch/assignedBatchController')
const studentAssignmentController = require('../apis/admin/studentAssignment/studentAssignmentController')
const dashboardController = require('../apis/admin/dashboard/dashboardController')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/pdf')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })

const storageAnswer = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/studentAnswers')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + path.extname(file.originalname))
  }
})

const uploadAnswer = multer({ storage: storageAnswer })
router.post('/login', userController.login)
router.post('/dashboard', dashboardController.dashboard)
router.get("/", (req, res) => {
  res.send("Welcome to Course Route")
})

router.post('/addcourse', courseController.addcourse)
router.post('/showcourse', courseController.showcourse)
router.post('/showonecourse', courseController.fetchcoursebyid)
router.post("/updatecourse", courseController.courseupdate)
router.post("/deletecourse", courseController.deletecourse)

router.get("/", (req, res) => {
  res.send("Welcome to Teacher Route")
})

router.post('/addteacher', teacherController.addteacher)
router.post('/showteacher', teacherController.showteacher)
router.post('/showsingleteacher', teacherController.fetchteacherbyid)
router.post("/updateteacher", teacherController.teacherupdate)
router.post("/deleteteacher", teacherController.deleteteacher)


router.get("/", (req, res) => {
  res.send("Welcome to Batches Route")
})

router.post('/addbatch', batchesController.addbatches)
router.post('/showbatches', batchesController.showbatches)
router.post('/showonebatch', batchesController.fetchbatchesbyid)
router.post("/updatebatch", batchesController.batchesupdate)
router.post("/deletebatch", batchesController.deletebatches)

/** Assigned batches routes */
router.post('/assignedBatch/add', assignedBatchController.addAssignedBatch)
router.post('/assignedBatch/all', assignedBatchController.getAll)
router.post('/assignedBatch/single', assignedBatchController.getSingle)
router.post("/assignedBatch/update", assignedBatchController.updateAssignedBatch)
router.post("/assignedBatch/delete", assignedBatchController.deleteAssignedBatch)


router.get("/", (req, res) => {
  res.send("Welcome to Student Route")
})

router.post('/addstudent', studentController.addstudent)
router.post('/showstudent', studentController.showstudent)
router.post('/showonestudent', studentController.fetchstudentbyid)
router.post("/updatestudent", studentController.studentupdate)
router.post("/deletestudent", studentController.deletestudent)


//register page

router.post('/addperson', registerController.addperson)
router.post('/showperson', registerController.showperson)
router.post('/updateperson', registerController.updateperson)
router.post('/deleteperson', registerController.deleteperson)
router.post('/fetchuserbyid', registerController.fetchuserbyid)


//assignment page

router.post('/addassignment', upload.single('upload_file'), assignmentController.addassignment)
router.post('/showassignment', assignmentController.showassignment)
router.post('/assignmentupdate', upload.single('upload_file'), assignmentController.assignmentupdate)
router.post('/fetchassignmentbyid', assignmentController.fetchassignmentbyid)
router.post('/deleteassignment', assignmentController.deleteassignment)



//material page

router.post('/addmaterial', upload.single('upload_file'), materialController.addmaterial)
router.post('/showmaterial', materialController.showmaterial)
router.post('/materialupdate', upload.single('upload_file'), materialController.materialupdate)
router.post('/fetchmaterialbyid', materialController.fetchmaterialbyid)
router.post('/deletematerial', materialController.deletematerial)

//studentAssignment

router.post('/studentAssignment/addAnswer', uploadAnswer.single('studentAnswerFile'), studentAssignmentController.updatestudentAssignment)
router.post('/studentAssignment/evaluate', studentAssignmentController.evaluateStudentAssignment)
router.post('/studentAssignment/all', studentAssignmentController.getAll)
router.post('/studentAssignment/single', studentAssignmentController.getSingle)


module.exports = router;