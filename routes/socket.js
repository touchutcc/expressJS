const fs = require('fs')
const {pythonServer} = require('../config')
const request = require('request-promise')

module.exports = io => {
    io.on('connection', socket => {
        console.log('Connected socketIO');
        socket.on('sendphoto', data => {
            const { Base64, name, type, classId, authId } = data
            pathName = `./dataSet/${name}`
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
               console.log('====================================');
               console.log(v);
               console.log('====================================');
           })
        })
        socket.on('load-model',(data) => {
            options = {
                method:"POST",
                uri:`http://127.0.0.1:5000/model/redis`,
                form:{
                    model_id:data.classId
                }
            }
            request(options).then(v => {
                console.log(v);
            })
        })
        socket.on('del-model',data => {
            options = {
                method:"DELETE",
                uri:`http://127.0.0.1:5000/model/redis`,
                form:{
                    model_id:data.classId
                }
            }
            request(options).then(v => {
                console.log(v);
            })
        })
    })
    setInterval(() => {
        const nowDate = (new Date()) / 1
        console.log(`Ping: ${nowDate}`);
        io.emit('ping', { data: nowDate })
    }, 1000)
}