const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: { //facebook
        type: String,
        required: true
    },
    name: { //เอามาจาก facebook
        type: String,
        required: true
    },
    password: { //facebook
        type: String,
        required: true
    },
    facebookId: { //_id
        type: String,
        required: false
    }
}, { timestamps: true, versionKey: false })
const User = mongoose.model('user', UserSchema)
module.exports = User