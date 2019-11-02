const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const Course = mongoose.model('course')
const Class = mongoose.model('class')
const CheckIn = mongoose.model('checkIn')
const courseValidator = require('../modules/courseValidator')

router.post('/', (req, res, next) => {
    const { _id, name } = req.body
    Course.findOne({ name: name, semesterId: _id }).then(cour => {
        if (cour) {
            return res.status(400).json({
                name: 'Name already exists'
            })
        } else {
            const newCourse = new Course({
                semesterId: _id,
                name: name,
            })
            newCourse.save().then(cour => {
                res.json(cour)
            }).catch(err => {
                return res.status(500).json({ err: err });

            })
        }
    })
})

router.put('/:_id', (req, res, next) => {
    const { _id } = req.params
    const { name, group, location, startTime, endTime, studentList } = req.body
    Course.updateOne({ _id: _id }, { name: name, group: group, location: location, startTime: Date.now(), endTime: Date.now(), studentList: studentList }).then(cour => {
        return res.status(200).json(cour)
    }).catch(err => {
        console.error(err)
    })
})

router.get('/:_id', (req, res, next) => {
    const { _id } = req.params
    Course.find({ semesterId: _id }).then(courList => {
        res.status(200).json(courList)
    }).catch(err => {
        return res.status(500).json({ err: err });
    })
})

router.delete('/:_id', (req, res, next) => {
    const { _id } = req.params
    Course.deleteOne({ _id: _id }).then(courOk => {
        Class.find({ courseId: _id }).then(classList => {
            if (classList) {
                const classId = []
                classList.map(v => classId.push(v._id))
                Class.deleteMany({ _id: { $in: classId } }).then(classOk => {
                    CheckIn.find({ classId: { $in: classId } }).then(checkInList => {
                        if (checkInList) {
                            const checkInId = []
                            checkInList.map(v => checkInId.push(v._id))
                            CheckIn.deleteMany({ _id: { $in: checkInId } }).then(checkInOk => {
                                return res.status(200).json(checkInOk)
                            })
                        } else return res.status(200).json(classOk)
                    })
                })
            } else return res.status(200).json(courOk)
        })
    }).catch(err => {
        return res.status(500).json({ err: err });
    })
})

module.exports = router;
