const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const Course = mongoose.model('course')
const courseValidator = require('../modules/courseValidator')

router.post('/', (req, res, next) => {
    // standard info
    const { name, semesterId } = req.body
    const { errors, isValid } = courseValidator(req.body)
    console.log(errors, isValid);
    if (!isValid) return res.status(400).json(errors)
    Course.findOne({ name: name, semesterId: semesterId }).then(cour => {
        if (cour) {
            return res.status(400).json({
                name: 'Name already exists'
            })
        } else {
            const newCourse = new Course({
                semesterId: semesterId,
                name: name,
            })
            newCourse.save().then(cour => {
                res.json({
                    ok: true,
                    data: cour
                })
            }).catch(err => {
                console.error(err);

            })
        }
    })
})

// router.put('/:_id', (req, res, next) => {
//     const { _id } = req.params
//     const { name, group, location, startTime, endTime, studentList } = req.body
//     Course.updateOne({ _id: _id }, {name: name, group: group, location: location, startTime: Date.now(), endTime: Date.now(), studentList: studentList }).then(cour => {
//         return res.status(200).json(cour)
//     }).catch(err => {
//         console.error(err)
//     })
// })

router.get('/:_id', (req, res, next) => { // get All
    const { _id } = req.params
    Course.find({ semesterId: _id }).then(courList => {
        res.status(200).json(courList)
    }).catch(err => {
        console.error(err);
    })
})

router.delete('/:_id', (req, res, next) => {
    const { _id } = req.params
    Course.deleteOne({ _id: _id }).then(cour => {
        return res.status(200).json(cour)
    }).catch(err => {
        console.error(err)
    })
})

module.exports = router;
