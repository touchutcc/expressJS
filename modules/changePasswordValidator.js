const Validator = require('validator')

module.exports = ValidateChangePasswordInput = data => {
    let errors = {}
    let isEmpty = Validator.isEmpty

    data.username_old = !isEmpty(data.username_old) ? data.username_old : ''
    data.password_new = !isEmpty(data.password_new) ? data.password_new : ''
    data.password_confirm = !isEmpty(data.password_confirm) ? data.password_confirm : ''

    if (!Validator.isLength(data.password_old, { min: 6, max: 30 }))
        errors.password_old = 'Password must be between 6 to 30 chars'
    if (Validator.isEmpty(data.password_old))
        errors.password_old = 'Password field is required'

    if (!Validator.isLength(data.password_new, { min: 6, max: 30 }))
        errors.password_new = 'Password must be between 6 to 30 chars'
    if (Validator.isEmpty(data.password_new))
        errors.password_new = 'Password field is required'

    if (!Validator.isLength(data.password_confirm, { min: 6, max: 30 }))
        errors.password_confirm = 'Password must be between 6 to 30 chars'
    /*---*/
    if (!Validator.isEmpty(data.password_new))
        if (!Validator.equals(data.password_new, data.password_confirm))
            errors.password_confirm = 'Password does not match'
    /*---*/
    if (Validator.isEmpty(data.password_confirm))
        errors.password_confirm = 'Password field is required'

    return {
        errors,
        isValid: isEmpty(errors)
    }
}