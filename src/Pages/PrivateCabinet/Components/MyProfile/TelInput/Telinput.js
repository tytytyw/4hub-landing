import React from 'react'
import Input from '../Input/Input'

const TelInput = ({...props}) => {

    const onFocus = event => {
        const inp = event.target
        if(!/^\+\d*$/.test(inp.value))
            // То вставляем знак плюса как значение
            inp.value = '+'
    }

    const onKeyPress = event => {

        const inp = event.target
        inp.value.replace(/^(\d{3})(\d{3})(\d)+$/, "($1)$2-$3")

        if(!/\d/.test(event.key))
            event.preventDefault()
    }

    return (
        <Input
            {...props}
            onFocus={onFocus}
            maxLength={13}
            onKeyPress={onKeyPress}
        />
    )
}

export default TelInput