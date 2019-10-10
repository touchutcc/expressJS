const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')

var dirUpload = path.dirname(__dirname)
dirUpload = path.join(dirUpload,'upload')

router.post('/',(req,res) => {
    console.log('====================================');
    console.log(req.uid);
    console.log('====================================');
    let uploadFile = req.files.file
    const fileName = req.files.file.name
    const dirUploadFile = path.join(dirUpload,fileName)
    uploadFile.mv(dirUploadFile,err => {
        if (err)   return res.status(500).send(err)
        res.json({
            ok:1
        })
    })
})

router.delete('/:_id',(req,res) => {

})

module.exports = router