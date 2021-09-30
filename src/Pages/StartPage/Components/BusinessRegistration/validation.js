import {useState} from "react";

export const useValidateForm = (initFields, requiredInputs = []) => {

    const [blurs, setBlurs] = useState([])
    const [errors, setErrors] = useState([])
    const [fields, setFields] = useState(initFields || {})

    const checkErrors = () => {
        let blurs = []
        let invalids = []
        let valid = true
        requiredInputs.forEach(name => {
            if (!fields?.[name]) {
                invalids.push(name)
                valid = false
            }
            blurs.push(name)
        })
        setBlurs(blurs)
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
        if (!blurs.includes(name)) {
            setBlurs([...blurs, name])
        }
        setFields({...fields, [name]: value})
    }

    return {onChange, errors, fields, setFields, blurs, checkErrors}
}