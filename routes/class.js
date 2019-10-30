const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const Class = mongoose.model('class')
const classValidator = require('../modules/classValidator')

router.post('/:_id', (req, res, next) => {
    // standard info
    const {
        group,
        location,
        day,
        startTime,
        endTime,
        studentList } = req.body
    const { _id } = req.params
    console.log(_id);
    
    //const { errors, isValid } = classValidator(req.body)
    //console.log(errors, isValid);
    //if (!isValid) return res.status(400).json(errors)
    Class.findOne({ group:group , courseId: _id }).then(clas => {
        if (clas) {
            return res.status(400).json({
                group: 'Group already exists'
            })
        } else {
            const newClass = new Class({
                courseId: _id,
                group: group,
                location: location,
                day: day,
                startTime: Date.now(),
                endTime: Date.now(),
                studentList: studentList
            })
            newClass.save().then(clas => {
                res.json({
                    ok: true,
                    data: clas
                })
            }).catch(err => {
                return res.status(500).json({err:err});
            })
        }
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
        return res.status(500).json({err:err});
    })
})

router.get('/', (req, res, next) => {
    const { courseId } = req.params
    Class.find({
        courseId: courseId
    }).then(courList => {
        res.status(200).json(courList)
    }).catch(err => {
        return res.status(500).json({err:err});
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
        return res.status(500).json({err:err});
    })
})

module.exports = router;