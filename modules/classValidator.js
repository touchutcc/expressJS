const Validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = ValidateStudent = data => {
    let errors = {}

    data.classId = !isEmpty(data.classId) ? data.classId : ''
    data.startTime = !isEmpty(data.startTime) ? data.startTime : ''    
    data.endTime = !isEmpty(data.endTime) ? data.endTime : ''
    
    if (Validator.isEmpty(data.classId))
        errors.classId = 'classId field is required'
    if (Validator.isEmpty(data.startTime))
        errors.startTime = 'startTime field is required'
    if (Validator.isEmpty(data.endTime))
        errors.endTime = 'endTime field is required'

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
