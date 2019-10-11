const express = require('express');
const router = express.Router();
/*const fs = require('fs')
const path = require('path')
const request = require('request-promise')*/
const mongoose = require('mongoose')
const Course = mongoose.model('course')
//const studentValidator = require('../modules/studentValidator')

/*var dirServer = path.dirname(__dirname)
var dirProject = path.dirname(dirServer)
var PythonServer = path.join(dirProject, 'deep_server_with_facenet')
var dataBase = path.join(PythonServer, 'database')
var dataUpload = path.join(dataBase, 'dataUpload')*/

router.post('/', (req, res, next) => {
    // standard info
    const { userId, name, group, location, stateTime, endTime, studentList, classU } = req.body
    //const { errors, isValid } = studentValidator(req.body)
    //if (!isValid) return res.status(400).json(errors)
    Course.findOne({ name: name, group: group }).then(cour => {
        if (cour) {
            return res.status(400).json({
                name: 'Student ID already exists',
                group: 'Course ID already exists'
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

/*router.get('/:stuId', (req, res, next) => {
    const { stuId } = req.params
    Student.find({ stuId: { $regex: stuId } }).then(stu => {
        res.json({
            ok: true,
            data: stu
        })
    })
})*/

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
        //delete video file
        //delete dataSet folder
        return res.status(200).json(cour)
    }).catch(err => {
        console.error(err)
    })
})

module.exports = router;
