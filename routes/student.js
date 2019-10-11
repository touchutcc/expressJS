const express = require('express');
const router = express.Router();
const fs = require('fs')
const path = require('path')
const request = require('request-promise')
const mongoose = require('mongoose')
const Student = mongoose.model('student')
const studentValidator = require('../modules/studentValidator')

var dirServer = path.dirname(__dirname)
var dirProject = path.dirname(dirServer)
var PythonServer = path.join(dirProject, 'deep_server_with_facenet')
var dataBase = path.join(PythonServer, 'database')
var dataUpload = path.join(dataBase, 'dataUpload')

router.post('/', (req, res, next) => {
    // standard info
    const { stuId, name, lastname, line_id } = req.body
    const { errors, isValid } = studentValidator(req.body)
    if (!isValid) return res.status(400).json(errors)
    // file Upload
    const uploadFile = req.files.file
    const fileName = req.files.file.name
    const fileType = fileName.split('.').pop()
    Student.findOne({ stuId: stuId }).then(stu => {
        if (stu) {
            return res.status(400).json({
                stuId: 'Student ID already exists'
            })
        } else {
            const newStudent = new Student({
                stuId: stuId,
                name: name,
                lastname: lastname,
                line_id: line_id
            })
            newStudent.save().then(stu => {
                const fileSave = `${stu._id}_${(new Date()).getTime()}.${fileType}`
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
    })
})

router.put('/:_id', (req, res, next) => {
    const { _id } = req.params
    const { line_id, name, lastname } = req.body
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
        //delete video file
        //delete dataSet folder
        return res.status(200).json(stu)
    }).catch(err => {
        console.error(err)
    })
})

module.exports = router;
