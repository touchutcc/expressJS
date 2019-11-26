const fs = require('fs')
const { pythonServer } = require('../config')
const request = require('request-promise')
const mongoose = require('mongoose')
const CheckIn = mongoose.model('checkIn')

module.exports = io => {
    io.on('connection', socket => {
        console.log('Connected socketIO');
        socket.on('predict', data => {
            const { Base64, name, type, classId, authId, checkId } = data
            console.log(checkId);

            decodeType = type.split(";").pop()
            options = {
                method: "POST",
                uri: `http://127.0.0.1:5000/predict`,
                form: {
                    _uid: authId,
                    base64: Base64
                }
            }
            request(options).then(async (v) => {
                v = JSON.parse(v);
                if (v.ok) {
                    // const CheckList = await CheckIn.findById(checkId)
                    // v.predicted.map(async (_id) => {
                    //     if (CheckList.studentList.indexOf(_id) < 0) {
                    //         newCheckIn = { _id: _id, time: new Date(), type: 'face' }
                    //         const checkInCheck = await CheckIn.update({ _id: checkId }, { $push: { studentList: _id } })
                    //         socket.emit('predicted', newCheckIn)
                    //     }
                    // })
                    CheckIn.findById(checkId).then(checkList => {
                        v.predicted.map(vm => {
                            if (checkList.studentList.indexOf(vm) < 0) {
                                newCheckIn = { _id: vm, time: new Date(), type: 'face' }
                                CheckIn.update({ _id: checkId }, { $push: { studentList: vm } }).then(checkInCheck => {
                                    socket.emit('predicted', newCheckIn)
                                })
                            }
                        })
                    })
                }
            })
        })
    })
    setInterval(() => {
        const nowDate = (new Date()) / 1
        console.log(`Ping: ${nowDate}`);
        io.emit('ping', { data: nowDate })
    }, 5000)
}