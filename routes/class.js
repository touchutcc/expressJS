const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const Class = mongoose.model('class')
const Course = mongoose.model('course')
const CheckIn = mongoose.model('checkIn')
const Semester = mongoose.model('semester')
const classValidator = require('../modules/classValidator')

router.post('/', (req, res, next) => {
    // standard info
    const { _id, group, location, day, startTime, endTime } = req.body
    // const { errors, isValid } = classValidator(req.body)
    // if (!isValid) return res.status(400).json(errors)
    /*Class.findOne({ group: group, courseId: _id }).then(clas => {
        if (clas) {
            return res.status(400).json({
                group: 'Group already exists'
            })
        } else {*/
            const newClass = new Class({
                courseId: _id,
                group: group,
                location: location,
                day: day,
                startTime: startTime,
                endTime: endTime
            })
            newClass.save().then(clas => {
                res.status(200).json(clas)
            }).catch(err => {
                return res.status(400).json(err);
            })
      //  }
    //})
})

router.put('/:_id', (req, res, next) => {
    const { _id } = req.params
    const data = req.body
    Class.updateOne({ _id: _id }, data).then(classOk => {
        res.status(200).json(classOk)
    })
})

router.get('/:_id', (req, res, next) => {
    const { _id } = req.params
    Class.find({ courseId: _id }).then(courList => {
        res.status(200).json(courList)
    }).catch(err => {
        return res.status(500).json({ err: err });
    })
})
router.put('/stu/:_id', (req, res) => {
    const { _id } = req.params
    const { stuList } = req.body
    Class.update({ _id: _id }, { $push: { studentList: { $each: stuList } } }).then(classStuOk => {
        res.status(200).json(classStuOk)
    })
})
router.put('/stu/:_id/:_stu', (req, res) => {
    const { _id, _stu } = req.params
    Class.update({ _id: _id }, { $pull: { studentList: _stu } }).then(classStuOk => {
        res.status(200).json(classStuOk)
    })
})
router.delete('/:_id', (req, res, next) => {
    const { _id } = req.params
    Class.deleteOne({ _id: _id }).then(clasOk => {
        CheckIn.deleteMany({ classId: _id }).then(checkInOk => {
            return res.status(200).json(checkInOk)
        })
    }).catch(err => {
        return res.status(500).json({ err: err });
    })
})


module.exports = router;