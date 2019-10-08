var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = mongoose.model('user')
const ValidateLoginInput = require('../modules/loginValidator')
const ValidateRegisterInput = require('../modules/registerValidator')
const config = require('../config')

router.post('/register', (req, res) => {
  const reqData = req.body
  const { errors, isValid } = ValidateRegisterInput(reqData)
  if (!isValid) return res.status(400).json(errors)
  User.findOne({ username: reqData.username }).then(user => {
    if (user) {
      return res.status(400).json({
        username: 'Username already exists'
      })
    } else {
      const newUser = new User({
        name: reqData.name,
        username: reqData.username,
        password: reqData.password
      })
      bcrypt.genSalt(10, (err, salt) => {
        if (err) console.error('There was an error', err);
        else {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) console.error('There was an error', err);
            else {
              newUser.password = hash
              newUser.save().then(user => {
                const payload = {
                  id: user.id
                }
                jwt.sign(payload, config.jwt.secret, config.jwt.options, (err, encoded) => {
                  if (err) console.error('Thene is some error is token', err)
                  else res.json({
                    success: true,
                    token: encoded // token = Brarer encoded
                  })
                })
              })
            }
          })
        }
      })
    }
  })
})

router.post('/login', (req, res) => {
  const reqData = req.body
  const { errors, isValid } = ValidateLoginInput(reqData)
  if (!isValid) return res.status(400).json(errors)
  User.findOne({ username:reqData.username }).then(user => {
    if (!user) {
      errors.usename = 'Username not found'
      return res.status(400).json(errors)
    } else {
      bcrypt.compare(reqData.password, user.password).then(isMatch => {
        if (isMatch) {
          const payload = {
            id: user.id
          }
          jwt.sign(payload, config.jwt.secret, config.jwt.options, (err, encoded) => {
            if (err) console.error('Thene is some error is token', err)
            else res.json({
              success: true,
              token: encoded // token = Brarer encoded
            })
          })
        } else {
          errors.password = 'Incorrect Password'
          return res.status(400).json(errors)
        }
      })
    }
  })
})
module.exports = router;
