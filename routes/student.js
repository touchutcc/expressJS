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
var PythonServer = path.join(dirProject, 'vgg_deep_server')
var dataBase = path.join(PythonServer, 'database')
var dataUpload = path.join(dataBase, 'dataUpload')

const uploadFile = async (file, stu, cb) => {
    const uploadFile = file
    const fileName = file.name
    const fileType = fileName.split('.').pop()
    const fileSave = `${stu._id}.${fileType}`
    const dirUploadFile = path.join(dataUpload, fileSave)
    uploadFile.mv(dirUploadFile, err => {
        cb(fileSave, err)
    })
}
const deleteUploadFile = async (fileName, cb) => {
    const delDeleteFile = path.join(dataUpload, fileName)
    fs.unlink(delDeleteFile, err => {
        cb(err)
    })
}
router.post('/', (req, res, next) => {
    const { stuId, name, major, faculty } = req.body
    const userObjId = req.uid
    Student.findOne({ stuId: stuId }).then(stu => {
        if (stu)
            return res.status(400).json({ stuId: 'Student ID already exists' })
        else {
            const newStudent = new Student({
                stuId: stuId,
                userId: userObjId,
                name: name,
                major: major,
                faculty: faculty
            })
            newStudent.save().then(stu => {
                uploadFile(req.files.file, stu, (file, err) => {
                    res.json(stu)
                })
            })
        }
    })
})

router.put('/:_id', (req, res, next) => {
    const { _id } = req.params
    const data = req.body
    Student.updateOne({ _id: _id }, data).then(stu => {
        if (req.files != null) {
            deleteUploadFile(`${_id}.mp4`, err => {
                uploadFile(req.files.file, { _id: _id }, () => {
                    return res.status(200).json(stu)
                })
            })
        }else{
            return res.status(200).json(stu)
        }
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

router.delete('/:_id', (req, res, next) => {
    const { _id } = req.params
    Student.deleteOne({ _id: _id }).then(stu => {
        deleteUploadFile(`${_id}.mp4`, err => {
            return res.status(200).json(stu)
        })
    }).catch(err => {
        console.error(err)
    })
})

module.exports = router;
