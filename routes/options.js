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
                                CheckIn.find({classId:{$in:classId}}).then(checkInList => {
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

router.delete('/', (req, res) => {
    const userObjectId = req.uid
    const ObjectRes = {
        semester: [],
        course: [],
        class: [],
        student: []
    }
    Student.deleteMany({ userId: userObjectId }).then(studentOk => {
        ObjectRes.student = studentOk
        Semester.find({ userId: userObjectId }).then(semesterList => {
            if (semesterList) {
                Semester.deleteMany({ userId: userObjectId }).then(semesterOk => {
                    //delete model check
                    ObjectRes.semester = semesterOk
                    const semesterId = []
                    semesterList.map(v => semesterId.push(v._id))
                    Course.find({ semesterId: { $in: semesterId } }).then(courseList => {
                        if (courseList) {
                            Course.deleteMany({ semesterId: { $in: semesterId } }).then(courseOk => {
                                ObjectRes.course = courseOk
                                const courseId = []
                                courseList.map(v => courseId.push(v._id))
                                Class.find({ courseId: { $in: courseId } }).then(classList => {
                                    ObjectRes.class = classList
                                    return res.status(200).json(ObjectRes)
                                })
                            })
                        } else {
                            return res.status(200).json(ObjectRes)
                        }
                    })
                })
            } else {
                return res.status(200).json(ObjectRes)
            }
        })
    }).catch(err => {
        return res.status(500).json({ err: err });
    })
})
module.exports = router;
