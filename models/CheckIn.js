const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CheckInSchema = new Schema({
    classId:{
        type:Schema.Types.ObjectId,
        required:true
    },
    studentList:{
        type:[Schema.Types.ObjectId],
        required:true
    }

},{ timestamps: true, versionKey: false })
const CheckIn = mongoose.model('checkIn',CheckInSchema)
module.exports = CheckIn