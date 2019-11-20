const Validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = ValidateRegisterInput = data => {
    let errors = {}

    data.name = !isEmpty(data.name) ? data.name : ''
    data.username = !isEmpty(data.username) ? data.username : ''
    data.password = !isEmpty(data.password) ? data.password : ''
    data.password_confirm = !isEmpty(data.password_confirm) ? data.password_confirm : ''

    if (Validator.isEmpty(data.name))
        errors.name = 'Name field is required'
    if (!Validator.isLength(data.username, { min: 2, max: 30 }))
        errors.username = 'Username must be between 2 to 30 chars'
    if (Validator.isEmpty(data.username))
        errors.username = 'Username field is required'
    if (!Validator.isLength(data.password, { min: 6, max: 30 }))
        errors.password = 'Password must be between 6 to 30 chars'
    if (Validator.isEmpty(data.password))
        errors.password = 'Password field is required'
    if (!Validator.isLength(data.password_confirm, { min: 6, max: 30 }))
        errors.password_confirm = 'Password Confirm must be between 6 to 30 chars'
    if (!Validator.equals(data.password, data.password_confirm))
        errors.password_confirm = 'Password and Password Confirm must match'
    if (Validator.isEmpty(data.password_confirm))
        errors.password_confirm = 'Password Confirm field is required'

    return {
        errors,
        isValid: isEmpty(errors)
    }
}