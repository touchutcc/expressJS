const Validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = ValidateStudent = data => {
    let errors = {}

    data.group = !isEmpty(data.group) ? data.group : ''    
    data.location = !isEmpty(data.location) ? data.location : ''

    if (Validator.isEmpty(data.group))
        errors.group = 'group is required'
    if (Validator.isEmpty(data.location))
        errors.location = 'location is required'

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
