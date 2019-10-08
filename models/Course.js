const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CourseSchema = new Schema({
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
    stateTime:{
        type:Date,
        required:true
    },
    endTime:{
        type:Date,
        required:true
    },
    studentList:{
        type:[Schema.Types.ObjectId],
        required:false
    },
    classU:{
        type:[Schema.Types.ObjectId],
        required:false
    }
},{ timestamps: true, versionKey: false })
const Course = mongoose.model('course',CourseSchema)
module.exports = Course