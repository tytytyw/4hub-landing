import {useState} from "react";

export const useValidateForm = (initFields, requiredInputs = []) => {

    const [errors, setErrors] = useState([])
    const [fields, setFields] = useState(initFields || {})

    const checkErrors = () => {
        let invalids = []
        let valid = true
        requiredInputs.forEach(name => {
            if (!fields?.[name]) {
                invalids.push(name)
                valid = false
            }
        })
        setErrors(invalids)
        return valid
    }

    const onChange = (value, name) => {
        if (requiredInputs.includes(name)) {
            if (value?.length < 1) {
                setErrors([...errors, name])
            } else {
                setErrors(errors.filter(item => item !== name))
            }
        }
        setFields({...fields, [name]: value})
    }

    return {onChange, errors, fields, setFields, checkErrors}
}