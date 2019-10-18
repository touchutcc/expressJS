const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ClassSchema = new Schema({
    courseId:{
        type:Schema.Types.ObjectId,
        required:true
    },
    startTime: {
        type:Date,
        required: true
    },
    endTime: {
        type:Date,
        required:true
    },
    studentList:{
        type:[Schema.Types.ObjectId],
        required:false
    }
    
},{ timestamps: true, versionKey: false })
const Class = mongoose.model('class',ClassSchema)
module.exports = Class