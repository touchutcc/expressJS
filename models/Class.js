const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ClassSchema = new Schema({
    classId: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type:String,
        required:true
    },
    studentList:{
        type:[Schema.Types.ObjectId],
        required:false
    }
    
},{ timestamps: true, versionKey: false })
const Class = mongoose.model('class',ClassSchema)
module.exports = Class