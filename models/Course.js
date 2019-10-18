const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CourseSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        required:true
    },
    name: {
        type:String,
        required:true
    },
    group: {
        type:String,
        required:false
    },
    location: {
        type:String,
        required:true
    },
    startTime:{
        type:Date,
        required:false //todo
    },
    endTime:{
        type:Date,
        required:false //todo
    },
    studentList:{
        type:[Schema.Types.ObjectId],
        required:false
    }
},{ timestamps: true, versionKey: false })
const Course = mongoose.model('course',CourseSchema)
module.exports = Course