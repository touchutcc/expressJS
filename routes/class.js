const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const Class = mongoose.model('class')
const classValidator = require('../modules/classValidator')


router.post('/', (req, res, next) => {
    // standard info
    const { classId, startTime, endTime, studentList } = req.body
    const { errors, isValid } = classValidator(req.body)
    if (!isValid) return res.status(400).json(errors)
    Class.findOne({ classId: classId }).then(clas => {
        if (clas)
            return res.status(400).json({ classId: 'Class ID already exists' })
        else {
            const newClass = new Class({
                classId: classId,
                startTime: startTime,
                endTime: endTime,
                studentList: studentList
            })
            newClass.save().then(clas => {
                const fileSave = `${clas._id}_${(new Date()).getTime()}.${fileType}`
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
    const { classId, startTime, endTime, studentList } = req.body
    Class.updateOne({ _id: _id }, { classId: classId, startTime: startTime, endTime: endTime, studentList: studentList }).then(clas => {
        return res.status(200).json(clas)
    }).catch(err => {
        console.error(err)
    })
})

router.get('/', (req, res, next) => {
    const userObjectId = req.uid
    Class.find({ classId: userObjectId }).then(clasList => {
        console.log('====================================');
        console.log(clasList);
        console.log('====================================');
    })
}) 

router.delete('/:_id', (req, res, next) => {
    const { _id } = req.params
    Class.deleteOne({ _id: _id }).then(clas => {
        //delete dataSet folder
        return res.status(200).json(clas)
    }).catch(err => {
        console.error(err)
    })
})

module.exports = router;
