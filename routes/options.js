const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const Semester = mongoose.model('semester')
const Course = mongoose.model('course')
const Class = mongoose.model('class')
const CheckIn = mongoose.model('checkIn')
const Student = mongoose.model('student')

router.get('/', (req, res) => {
    const userObjectId = req.uid
    const ObjectRes = {
        semester: [],
        course: [],
        class: [],
        student: [],
        checkIn: []
    }
    Student.find({ userId: userObjectId }).then(studentList => {
        ObjectRes.student = studentList
        Semester.find({ userId: userObjectId }).then(semesterList => {
            if (semesterList) {
                ObjectRes.semester = semesterList
                const semesterId = []
                semesterList.map(v => semesterId.push(v._id))
                Course.find({ semesterId: { $in: semesterId } }).then(courseList => {
                    if (courseList) {
                        ObjectRes.course = courseList
                        const courseId = []
                        courseList.map(v => courseId.push(v._id))
                        Class.find({ courseId: { $in: courseId } }).then(classList => {
                            if (classList) {
                                ObjectRes.class = classList
                                const classId = []
                                classList.map(v => classId.push(v._id))
                                CheckIn.find({ classId: { $in: classId } }).then(checkInList => {
                                    ObjectRes.checkIn = checkInList
                                    return res.status(200).json(ObjectRes)
                                })
                            } else {
                                return res.status(200).json(ObjectRes)
                            }
                        })
                    } else {
                        return res.status(200).json(ObjectRes)
                    }
                })
            } else {
                return res.status(200).json(ObjectRes)
            }
        })
    })
})

router.delete('/', async (req, res) => {
    const userObjectId = req.uid
    const ObjectRes = {
        semester: [],
        course: [],
        class: [],
        student: [],
        checkIn: []
    }
    ObjectRes.student = await Student.deleteMany({ userId: userObjectId })
    const findSemester = await Semester.find({ userId: userObjectId })
    if (findSemester) {
        const semesterList = []
        findSemester.map(i => semesterList.push(i._id))
        ObjectRes.semester = await Semester.deleteMany({ userId: userObjectId })
        const findCourse = await Course.find({ semesterId: { $in: semesterList } })
        if (findCourse) {
            const courseList = []
            findCourse.map(i => courseList.push(i._id))
            ObjectRes.course = await Course.deleteMany({ semesterId: { $in: semesterList } })
            const findClass = await Class.find({ courseId: { $in: courseList } })
            if (findClass) {
                const classList = []
                findClass.map(i => classList.push(i._id))
                ObjectRes.class = await Class.deleteMany({ courseId: { $in: courseList } })
                ObjectRes.checkIn = await CheckIn.deleteMany({ classId: { $in: classList } })
                return res.status(200).json()
            }
        }
    }
    return res.status(200).json(ObjectRes)
})
module.exports = router;
