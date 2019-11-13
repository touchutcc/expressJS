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
            request(options).then(v => {
                v = JSON.parse(v);
                if (v.ok) {
                    CheckIn.findById(checkId).then(checkList => {
                        if (checkList.studentList.filter(i => i._id == v.predicted).length == 0) {
                            newCheckIn = { _id: v.predicted, time: new Date(),type:'face'}
                            CheckIn.update({ _id: checkId }, { $push: { studentList: newCheckIn } }).then(checkInCheck => {
                                socket.emit('predicted', newCheckIn)
                            })
                        }
                    })
                }
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