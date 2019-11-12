const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CheckInSchema = new Schema({
    classId:{
        type:Schema.Types.ObjectId,
        required:true
    },
    studentList:{
        type:[Object],
        required:false
    }
},{ timestamps: true, versionKey: false })
const CheckIn = mongoose.model('checkIn',CheckInSchema)
module.exports = CheckIn