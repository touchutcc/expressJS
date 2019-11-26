const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const User = mongoose.model('user')
const config = require('../config')

const opts = {}
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken()
opts.secretOrKey =  config.jwt.secret

module.exports = passport => {
    passport.use(new JWTStrategy(opts,(payload,done) => {    
        User.findById(payload.id).then(user => {
            if(user) return done(null,user)
            return done(null,false)
        }).catch(err => {
            console.log(err);
        })
    }))
}