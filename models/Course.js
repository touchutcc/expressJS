const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CourseSchema = new Schema({
    semesterId:{
        type:Schema.Types.ObjectId,
        required:true
    },
    name: {
        type:String,
        required:true
    }
},{ timestamps: true, versionKey: false })
const Course = mongoose.model('course',CourseSchema)
module.exports = Course