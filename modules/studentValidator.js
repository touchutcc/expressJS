const Validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = ValidateStudent = data => {
    let errors = {}

    data.stuId = !isEmpty(data.stuId) ? data.stuId : ''
    data.name = !isEmpty(data.name) ? data.name : ''    
    data.lastname = !isEmpty(data.lastname) ? data.lastname : ''
    
    if (Validator.isEmpty(data.stuId))
        errors.stuId = 'student ID field is required'
    if (Validator.isEmpty(data.name))
        errors.name = 'Name field is required'
    if (Validator.isEmpty(data.lastname))
        errors.lastname = 'LastName field is required'

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
