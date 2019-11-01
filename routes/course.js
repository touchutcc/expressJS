const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const Course = mongoose.model('course')
const courseValidator = require('../modules/courseValidator')

router.post('/', (req, res, next) => {
    // standard info
    const { _id,name } = req.body
    // const { errors, isValid } = courseValidator(req.body)
    // console.log(errors, isValid);
    // if (!isValid) return res.status(400).json(errors)
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
                res.json({
                    ok: true,
                    data: cour
                })
            }).catch(err => {
                return res.status(500).json({err:err});

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
        return res.status(500).json({err:err});
    })
})

// router.delete('/:_id', (req, res, next) => {
//     const { _id } = req.params
//     Course.deleteOne({ _id: _id }).then(cour => {
//         return res.status(200).json(cour)
//     }).catch(err => {
//         return res.status(500).json({err:err});
//     })
// })

router.delete('/:_id', (req, res, next) => {
    const { _id } = req.params
    Course.deleteOne({ _id: _id }).then(cour => {
        Class.find({courseId:couseList}).then(clas => {
            if(!clas)
                return res.status(200).json(cour)
            else 
            Class.deleteMany({courseId:couseList}).then(classOk => {
                const classList = []
                clas.map(v => classList.push(v._id))
                            CheckIn.find({classId:classList}).then(check => {
                                if(!check)
                                    return res.status(200).json(check)
                                else
                                CheckIn.deleteMany({classId:classList}).then(checkOk => {
                                    res.status(200).json(checkOk)
                                })
                            })
                        })
                    })
                
        
        //return res.status(200).json(cour)
    }).catch(err => {
        return res.status(500).json({err:err});
    })
})

module.exports = router;
