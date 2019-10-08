const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ClassSchema = new Schema({
    
},{ timestamps: true, versionKey: false })
const Class = mongoose.model('course',ClassSchema)
module.exports = Class