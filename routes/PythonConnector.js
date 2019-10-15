const express = require('express')
const router = express.Router()
const request = require('request-promise')

const url = "http://127.0.0.1:5000"
const pythonUrl = (path) => {
    return `${url}/${(!path ? '': path)}`
}
router.post('/model',(req,res) => {
    const {idList} = req.body
    const arrayData = ["Bobby.MOV","Mark.MOV"] // for test only
    options = {
        method:req.method,
        uri:`${url}/array`,
        form:{
            data:JSON.stringify(arrayData)
        }
    }
    request(options).then(v => {
        res.status(200).json(v)
    }).catch(err => {
        console.error(err)
        res.status(400).json(err)
    })
})
// router.post('/predict/:id',(req,res) => {
//     const {id} = req.params
//     const {base64} = req.body
//     options = {
//         method:req.method,
//         uri:`${url}/predict`,
//         form:{
//             data:id,
//             base64:base64
//         }
//     }
//     request(options).then(v => {
//         res.status(200).json(v)
//     }).catch(err => {
//         console.error(err)
//         res.status(400).json(err)
//     })
// })
router.post('/redis/:id',(req,res) => {
    const {id} = req.params
    options = {
        method:req.method,
        uri:`${url}/model/redis`,
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
router.delete('/redis/;id',(req,res) => {
    const {id} = req.params
    options = {
        method:req.method,
        uri:`${url}/model/redis`,
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