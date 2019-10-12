const Validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = ValidateCourse = data => {
    let errors = {}

    data.userId = !isEmpty(data.stuId) ? data.stuId : ''
    data.name = !isEmpty(data.name) ? data.name : ''    
    data.location = !isEmpty(data.location) ? data.location : ''
    data.stateTime = !isEmpty(data.stateTime) ? data.stateTime : ''
    data.endTime = !isEmpty(data.endTime) ? data.endTime : ''
    
    if (Validator.isEmpty(data.stuId))
        errors.stuId = 'Student ID field is required'
    if (Validator.isEmpty(data.name))
        errors.name = 'Name field is required'
    if (Validator.isEmpty(data.location))
        errors.location = 'Location field is required'
    if (Validator.isEmpty(data.stateTime))
        errors.stateTime = 'StateTime field is required'
    if (Validator.isEmpty(data.endTime))
        errors.endTime = 'EndTime field is required'

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
