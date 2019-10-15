const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const Class = mongoose.model('class')
const courseValidator = require('../modules/classValidator')


router.post('/', (req, res, next) => {
    // standard info
    const { userId, name, group, location, stateTime, endTime, studentList, classU } = req.body
    const { errors, isValid } = courseValidator(req.body)
    if (!isValid) return res.status(400).json(errors)
    Course.findOne({ name: name, group: group }).then(cour => {
        if (cour) {
            return res.status(400).json({
                name: 'Name already exists',
                group: 'Group already exists'
            })
        } else {
            const newCourse = new Course({
                userId: userId,
                name: name,
                group: group,
                location: location,
                stateTime: stateTime,
                endTime: endTime,
                studentList: studentList,
                classU: classU
            })
            newCourse.save().then(cour => {
                const fileSave = `${cour._id}_${(new Date()).getTime()}.${fileType}`
                const dirUploadFile = path.join(dataUpload, fileSave)
                uploadFile.mv(dirUploadFile, err => {
                    if (err) return res.status(500).send(err)
                    /*options = {
                        method: "POST",
                        uri:'http://127.0.0.1:5000/',
                        body:{
                            fileName:fileName,
                            stuId:stu._id
                        }
                    }
                    require(options).then(v => {
                        console.log(v);
                    }).catch(err => {
                        console.error(err);
                        return res.status(400).json(err)
                    })*/
                })
                /*res.json({
                    ok: true,
                    data: stu
                })*/ //for without upload funtion
            })
        }
    })//course.find
})

router.put('/:_id', (req, res, next) => {
    const { _id } = req.params
    const { userId, name, group, location, stateTime, endTime, studentList, classU} = req.body
    Course.updateOne({ _id: _id }, { userId: userId, name: name, group: group, location: location, stateTime: stateTime, endTime: endTime, studentList: studentList, classU: classU }).then(cour => {
        return res.status(200).json(cour)
    }).catch(err => {
        console.error(err)
    })
})

 router.get('/', (req, res, next) => {
    const userObjectId = req.uid
    Course.find({ userId: userObjectId }).then(courList => {
        console.log('====================================');
        console.log(courList);
        console.log('====================================');
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
