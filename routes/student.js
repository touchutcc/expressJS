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

const uploadFile = async (files, stu, cb) => {
    const uploadFile = files.file
    const fileName = files.file.name
    const fileType = fileName.split('.').pop()
    const fileSave = `${stu._id}_${(new Date()).getTime()}.${fileType}`
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

// =======================================================
const url = "http://127.0.0.1:5000"
const pythonUrl = (path) => {
    return `${url}/${(!path ? '': path)}`
}

router.post('/data_set/video',(req,res,next) => {
    options = {
        method:req.method,
        uri:`${url}/data_set/video`,
        form:{
            name:"Bobby.MOV"
        }
    }
    request(options).then(v => {
        res.status(200).json(v)
    }).catch(err => {
        console.error(err)
        res.status(400).json(err)
    })
})
// =======================================================

router.post('/', (req, res, next) => {
    // standard info
    const { stuId, name, lastname, line_id } = req.body
    const { errors, isValid } = studentValidator(req.body)
    if (!isValid) return res.status(400).json(errors)

    Student.findOne({ stuId: stuId }).then(stu => {
        if (stu)
            return res.status(400).json({ stuId: 'Student ID already exists' })
        else {
            const newStudent = new Student({
                stuId: stuId,
                name: name,
                lastname: lastname,
                line_id: line_id
            })
            newStudent.save().then(stu => {
                uploadFile(req.files, stu, (file, err) => {
                    if (err) return res.status(500).json(err)
                    deleteUploadFile(file, err => {
                        if (err) return res.status(500).json(err)
                        // face Detection
                        res.json({
                            ok: true,
                            data: stu
                        })
                    })
                })
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
        //delete dataSet folder
        return res.status(200).json(stu)
    }).catch(err => {
        console.error(err)
    })
})

module.exports = router;
