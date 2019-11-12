const fs = require('fs')
const {pythonServer} = require('../config')
const request = require('request-promise')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = io => {
    io.on('connection', socket => {
        console.log('Connected socketIO');
        socket.on('predict', data => {
            const { Base64, name, type, classId, authId } = data
            decodeType = type.split(";").pop()
            options = {
                method:"POST",
                uri:`http://127.0.0.1:5000/predict`,
                form:{
                   _uid:authId,
                   base64:Base64
               }
           }
           request(options).then(v => {
               console.log(v);
               
               //socket.emit('predicted',v)
           })
        })
    })
    setInterval(() => {
        const nowDate = (new Date()) / 1
        console.log(`Ping: ${nowDate}`);
        io.emit('ping', { data: nowDate })
    }, 2000)
}


// router.put('/pull', (req, res, next) => {
//     const { _id } = req.params
//             CheckIn.updateOne( _id ).then(check => {
//                 return res.status(200).json(check)
//             }).catch(err => {
//                 return res.status(500).json({ err: err });
//             })
// })