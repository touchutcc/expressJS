const fs = require('fs')
const {pythonServer} = require('../config')
const request = require('request-promise')

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
                   model_id:classId,
                   base64:Base64
               }
           }
           request(options).then(v => {
               socket.emit('predicted',v)
           })
        })
    })
    setInterval(() => {
        const nowDate = (new Date()) / 1
        console.log(`Ping: ${nowDate}`);
        io.emit('ping', { data: nowDate })
    }, 2000)
}