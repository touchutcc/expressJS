var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
const Course = mongoose.model('course')

router.post('/', (req, res, next) => {
    const { name, group, location, stateTime, endTime, studentList, classU } = req.body
    Course.findOne({ name: name, group: group }).then(ng => {
        if (ng) {
            return res.status(400).json({
                name: 'Name already exists',
                group: 'Group already exists'
            })
        } else {
            const newCourse = new Course({
                name: name,
                group: group,
                location: location,
                stateTime: stateTime,
                endTime: endTime,
                studentList: studentList,
                class: classU
            })
            newCourse.save().then(ng => {
                res.json({
                    ok: true,
                    data: ng
                })
            })
        }
    })
})

router.put('/:_id', (req, res, next) => {
    const { _id } = req.params
    const { line_id } = req.body
    Student.updateOne({ _id: _id }, { line_id: line_id }).then(stu => {
        return res.status(200).json(stu)
    }).catch(err => {
        console.error(err)
    })
})

router.put('/:_id', (req, res, next) => {
    const { _id } = req.params
    const { line_id } = req.body
    Student.updateOne({ _id: _id }, { line_id: line_id }).then(stu => {
        return res.status(200).json(stu)
    }).catch(err => {
        console.error(err)
    })
})

router.get('/:stuId', (req, res, next) => {
    const { stuId } = req.params
    Student.find({ stuId: { $regex: stuId } }).then(stu => {
        res.json({
            ok: true,
            data: stu
        })
    })
})

/* router.get('/', (req, res, next) => {
    const { stuIdList } = req.body
    Student.find({ stuId: { $in: stuIdList } }).select('_id').then(stuList => {
        console.log('====================================');
        console.log(stuList);
        console.log('====================================');
    })
}) */

router.delete('/:_id', (req, res, next) => {
    const { _id } = req.params
    Student.deleteOne({ _id: _id }).then(stu => {
        return res.status(200).json(stu)
    }).catch(err => {
        console.error(err)
    })
})

module.exports = router;
