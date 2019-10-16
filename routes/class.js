const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const Class = mongoose.model('class')
const classValidator = require('../modules/classValidator')


router.post('/', (req, res, next) => {
    // standard info
    const {
        courseId,
        startTime,
        endTime,
        studentList
    } = req.body
    const {
        errors,
        isValid
    } = classValidator(req.body)
    if (!isValid) return res.status(400).json(errors)
    const newClass = new Class({
        courseId: courseId,
        startTime: startTime,
        endTime: endTime,
        studentList: studentList
    })
    newClass.save().then(clas => {
        res.json({
            ok: true,
            data: clas
        })
    }).catch(err => {
        console.error(err)
    })
})

router.put('/:_id', (req, res, next) => {
    const { _id } = req.params
    const { studentList } = req.body
    Class.updateOne({_id: _id}, {
        studentList: studentList
    }).then(clas => {
        return res.status(200).json(clas)
    }).catch(err => {
        console.error(err)
    })
})

router.get('/', (req, res, next) => {
    const { courseId } = req.params
    Class.find({
        courseId: courseId
    }).then(courList => {
        res.status(200).json(courList)
    }).catch(err => {
        console.error(err)
    })
})

router.delete('/:_id', (req, res, next) => {
    const {
        _id
    } = req.params
    Class.deleteOne({
        _id: _id
    }).then(clas => {
        //delete dataSet folder
        return res.status(200).json(clas)
    }).catch(err => {
        console.error(err)
    })
})

module.exports = router;