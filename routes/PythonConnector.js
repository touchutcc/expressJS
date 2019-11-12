const express = require('express')
const router = express.Router()
const request = require('request-promise')
const mongoose = require('mongoose')
const CheckIn = mongoose.model('checkIn')

const url = "http://127.0.0.1:5000"

router.post('/model', (req, res) => {
    const { id } = req.body
    options = {
        method: req.method,
        uri: `${url}/model`,
        form: {
            _id: id
        }
    }
    request(options).then(v => {
        res.status(200).json(JSON.parse(v))
    })
        .catch(err => {
            console.error(err)
        })
})
router.delete('/model/pop/:id', (req, res) => {
    const { id } = req.params
    // options = {
    //     method:req.method,
    //     uri:`${url}/model/pop`,
    //     form:{
    //         _id:id,
    //     }
    // }
    // request(options).then(v => {
    //     res.status(200).json(JSON.parse(v))
    // }).catch(err => {
    //     res.status(404).json(JSON.parse(err.response.body))
    // })
    res.status(200).json({ _id: id })
})
router.get('/model/:id', (req, res) => {
    const { id } = req.params
    options = {
        method: req.method,
        uri: `${url}/model`,
        form: {
            _id: id,
            _uid: req.uid
        }
    }
    request(options).then(v => {
        const newCheckIn = new CheckIn({
            classId: id
        })
        newCheckIn.save().then(checkInRes => {
            withCheckIn = JSON.parse(v)
            withCheckIn['checkIn'] = checkInRes
            res.status(200).json(withCheckIn)
        })
    }).catch(err => {
        res.status(404).json(JSON.parse(err.response.body))
    })
})
router.get('/model/check/:id', (req, res) => {
    const { id } = req.params
    options = {
        method: req.method,
        uri: `${url}/model/check`,
        form: {
            _id: id,
        }
    }
    request(options).then(v => {
        res.status(200).json(JSON.parse(v))
    })
    // .catch(err => {
    //     res.status(404).json(JSON.parse(err.response.body))
    // })
})
router.delete('/model/:id', (req, res) => {
    const { id } = req.params
    options = {
        method: req.method,
        uri: `${url}/model`,
        form: {
            _id: id,
            _uid: req.uid
        }
    }
    request(options).then(v => {
        res.status(200).json(v)
    }).catch(err => {
        res.status(400).json(err)
    })
})

module.exports = router