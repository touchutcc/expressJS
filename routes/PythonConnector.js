const express = require('express')
const router = express.Router()
const request = require('request-promise')

const url = "http://127.0.0.1:5000"

router.post('/model',(req,res) => {
    const { classId } = req.body
    options = {
        method:req.method,
        uri:`${url}/model`,
        form:{
            classId:classId
        }
    }
    request(options).then(v => {
        res.status(200).json(JSON.parse(v))
    }).catch(err => {
        console.error(err)
        res.status(400).json(err)
    })
})
router.get('/model/:id',(req,res) => {
    const {id} = req.params
    options = {
        method:req.method,
        uri:`${url}/model`,
        form:{
            model_id:id
        }
    }
    request(options).then(v => {
        res.status(200).json(v)
    }).catch(err => {
        console.error(err)
        res.status(400).json(err)
    })
})
router.delete('/model/:id',(req,res) => {
    const {id} = req.params
    options = {
        method:req.method,
        uri:`${url}/model`,
        form:{
            model_id:id
        }
    }
    request(options).then(v => {
        res.status(200).json(v)
    }).catch(err => {
        console.error(err)
        res.status(400).json(err)
    })
})

module.exports = router