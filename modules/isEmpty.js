const isEmpty = value => {
    return (
        value === undefined ||
        value === null ||
        (value instanceof Object && Object.keys(value).length === 0) ||
        (value instanceof String && value.trim.length === 0)
    )
}

module.exports = isEmpty