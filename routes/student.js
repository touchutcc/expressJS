var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
const Student = mongoose.model('student')

router.post('/', (req, res, next) => {
    const { stuId, name, lastname, line_id } = req.body
    Student.findOne({ stuId: stuId }).then(stu => {
        if (stu) {
            return res.status(400).json({
                stuId: 'Student ID already exists'
            })
        } else {
            const newStudent = new Student({
                stuId: stuId,
                name: name,
                lasename: lastname,
                line_id: line_id
            })
            newStudent.save().then(stu => {
                res.json({
                    ok: true,
                    data: stu
                })
            })
        }
    })
})

router.put('/:_id', (req, res, next) => {
    const { _id } = req.params
    const { line_id } = req.body
    Student.updateOne({ _id: _id }, { name: name, lastname: lastname, line_id: line_id }).then(stu => {
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
