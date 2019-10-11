const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const request = require('request-promise')

router.post('/', (req, res) => {
    let uploadFile = req.files.file
    const fileName = req.files.file.name
    const { stuId } = req.body
    const dirUploadFile = path.join(dataUpload, fileName)
    uploadFile.mv(dirUploadFile, err => {
        if (err) return res.status(500).send(err)
        options = {
            method:"POST",
            uri:'http://127.0.0.1:5000',
            body:{
                fileName:fileName,
                stuId:stuId
            }
        }
        request(options).then(v => {
        }).catch(err => {
        })
    })
})

router.delete('/:_id', (req, res) => {

})

module.exports = router