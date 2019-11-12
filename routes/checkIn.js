const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const CheckIn = mongoose.model('checkIn')

router.post('/', (req, res, next) => {
    const { classId } = req.body
    const newCheckIn = new CheckIn({
            classId: classId,
            // studentList: {
            //     _id:"testObjId",
            //     time:new Date()
            //     }
            })
            newCheckIn.save().then(check => {
                res.json(check)
            }).catch(err => {
                return res.status(500).json({ err: err });
            })
})

// router.put('/pull', (req, res, next) => {
//     const { _id } = req.params
//         CheckIn.findById( _id ).then(checkList => {
//          if(checkList.studentList.filter(i => i._id == "testObjId") == []){
//              console.log("have");
//          }else{
//              console.log("else");   
//          }
//     }).catch(err => {
//         console.error(err);
//     })
// })

router.put('/pull', (req, res, next) => {
    const { _id } = req.params
            CheckIn.updateOne( _id ).then(check => {
                return res.status(200).json(check)
            }).catch(err => {
                return res.status(500).json({ err: err });
            })
})

router.delete('/:_id', (req, res, next) => {
    const { _id } = req.params
    CheckIn.deleteOne({ _id: _id }).then(checkOk => {
            CheckIn.find({ classId: { $in: classId } }).then(checkInList => {
                        if (checkInList) {
                            const checkInId = []
                            checkInList.map(v => checkInId.push(v._id))
                            CheckIn.deleteMany({ _id: { $in: checkInId } }).then(checkInOk => {
                                return res.status(200).json(checkInOk)
                            })
                        } else return res.status(200).json(checkOk)
                    })
    }).catch(err => {
        return res.status(500).json({ err: err });
    })
})

module.exports = router;