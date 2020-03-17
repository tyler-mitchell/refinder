import getNestedValue from './getNestedValue'

const getErrorMessages = (name, errors, parseError) => {
    const fieldError = getNestedValue(errors, name) || undefined
    const errorType = fieldError?.type
    if (Array.isArray(fieldError)) {
        console.error('Unexpected field error', fieldError)
    }
    if (!errorType) return
    return parseError ? parseError(errorType) : `This field is ${errorType}`
}
export default getErrorMessages

