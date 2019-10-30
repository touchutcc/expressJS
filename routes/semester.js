const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const Semester = mongoose.model('semester')
const semesterValidator = require('../modules/semesterValidator')

router.post('/', (req, res, next) => {
    // standard info
    const { name, startDate, endDate } = req.body
    const newSemester = new Semester({
        userId: req.uid,
        name: name,
        startDate: startDate,//startDate,
        endDate: endDate //endDate
    })
    newSemester.save().then(Semest => {
        res.json({
            ok: true,
            data: Semest
        })
    }).catch(err => {
        return res.status(500).json({err:err});
    })
    //const { errors, isValid } = semesterValidator(req.body);
    //if (!isValid) return res.status(400).json(errors)
    // Semester.findOne({ name:name }).then(Semest => {
    //     if (Semest) {
    //         return res.status(400).json({
    //             name: 'Name already exists',
    //         })
    //     } else {
    //         const newSemester = new Semester({
    //             userId: req.uid,
    //             name: name,
    //             startDate: startDate,//startDate,
    //             endDate: endDate //endDate
    //         })
    //         newSemester.save().then(Semest => {
    //             res.json({
    //                 ok: true,
    //                 data: Semest
    //             })
    //         }).catch(err => {
    //             console.error(err)
    //         })
    //     }
    // })
})

 router.put('/:_id', (req, res, next) => {
     const { _id } = req.params
     const { name, startDate, endDate } = req.body
     Semester.updateOne({ _id: _id }, {name: name, startDate: startDate, endDate: endDate }).then(cour => {
         return res.status(200).json(cour)
     }).catch(err => {
        return res.status(500).json({err:err});
     })
 })

router.get('/', (req, res, next) => { // get All
    const userObjectId = req.uid
    console.log('====================================');
    console.log(userObjectId);
    console.log('====================================');
    Semester.find({ userId: userObjectId }).then(semesterList => {
        res.status(200).json(semesterList)
    }).catch(err => {
        return res.status(500).json({err:err});
    })
})

router.delete('/:_id', (req, res, next) => {
    const { _id } = req.params
    Semester.deleteOne({ _id: _id }).then(cour => {
        return res.status(200).json(cour)
    }).catch(err => {
        return res.status(500).json({err:err});
    })
})

module.exports = router;
