const Validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = ValidateCourse = data => {
    let errors = {}

    //data.stuId = !isEmpty(data.stuId) ? data.stuId : ''
    data.name = !isEmpty(data.name) ? data.name : ''    
    data.location = !isEmpty(data.location) ? data.location : ''
    data.startTime = !isEmpty(data.startTime) ? data.startTime : ''
    data.endTime = !isEmpty(data.endTime) ? data.endTime : ''
    
    //if (Validator.isEmpty(data.stuId))
    //    errors.stuId = 'Student ID field is required'
    if (Validator.isEmpty(data.name))
        errors.name = 'Name field is required'
    if (Validator.isEmpty(data.location))
        errors.location = 'Location field is required'
    /*if (Validator.isEmpty(data.startTime))
        errors.startTime = 'StartTime field is required'
    if (Validator.isEmpty(data.endTime))
        errors.endTime = 'EndTime field is required'*/

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
