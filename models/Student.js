const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StudentSchema = new Schema({
    stuId: {
        type: String,
        required: true
    },
    userId:{
        type:Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    faculty: {
        type:String,
        required:true
    },
    major:{
        type:String,
        required:true
    }
}, { timestamps: true, versionKey: false })
const Student = mongoose.model('student', StudentSchema)
module.exports = Student