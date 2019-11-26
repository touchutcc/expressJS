const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SemesterSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        required:true
    },
    name: {
        type:String,
        required:true
    },
    startDate:{
        type:Date,
        required:true
    },
    endDate:{
        type:Date,
        required:true
    }
},{ timestamps: true, versionKey: false })
const Semester = mongoose.model('semester',SemesterSchema)
module.exports = Semester