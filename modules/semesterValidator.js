const Validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = ValidateSemester = data => {
    let errors = {}

    data.name = !isEmpty(data.name)? data.name : ''
    data.startTime = !isEmpty(data.startTime) ? data.startTime : new Date().getTime()
    data.endTime = !isEmpty(data.endTime) ? data.endTime : new Date().getTime()

    if (Validator.isEmpty(data.name))
        errors.name = 'name field is required'
    if (Validator.isEmpty(data.startTime))
        errors.startTime = 'startTime field is required'
    if (Validator.isEmpty(data.endTime))
        errors.endTime = 'endTime field is required'

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
