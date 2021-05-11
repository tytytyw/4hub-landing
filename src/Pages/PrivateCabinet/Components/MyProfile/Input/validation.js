import {useEffect, useState} from 'react'

export const useInput = (initialValue, validations) => {

    if (!initialValue) initialValue = ''

    const [value, setValue] = useState(initialValue)
    const [dirty, setDirty] = useState(false)

    const valid = useValidation(value, validations)

    const onChange = event => setValue(event.target.value)
    const onBlur = () => setDirty(true)

    return {
        value,
        onChange,
        onBlur,
        dirty,
        ...valid,
        reset() {
            setValue(initialValue)
            setDirty(false)
        }
    }
}

const useValidation = (value, validations) => {

    const [isEmpty, setEmpty] = useState(true)
    const [isEmail, setEmail] = useState(false)

    const validateEmail = email => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    const isEmptyValue = value => !value || value === '';

    useEffect(() => {

        for (const validation in validations) {
            switch (validation) {
                case 'email':
                    (validateEmail(value) && !isEmptyValue(value)) ? setEmail(true) : setEmail(false)
                    break;
                default:
                    break;
            }
        }

        isEmptyValue(value) ? setEmpty(true) :  setEmpty(false)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])


    return {
        isEmpty,
        isEmail
    }
}