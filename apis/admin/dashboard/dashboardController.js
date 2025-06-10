const Courses = require('../course/courseModel')
const Batches = require('../batches/batchesModel')
const Teachers = require('../teacher/teacherModel')
const Students = require('../student/studentModel')


exports.dashboard = async (req, res) => {
    let totalCourses = await Courses.countDocuments()
    let totalBatches = await Batches.countDocuments()
    let totalTeachers = await Teachers.countDocuments()
    let totalStudents = await Students.countDocuments()

    res.send({
        success: true,
        status: 200,
        message: "Dashboard Loaded Succesfully",
        totalCourses: totalCourses,
        totalBatches: totalBatches,
        totalTeachers: totalTeachers,
        totalStudents: totalStudents,
    })

}
