import React from 'react'

const Form = ({ children, onSubmit = () => {}, ...props }) => {
    return (
        <form noValidate onSubmit={onSubmit}>
            {children}
        </form>
    )
}

export default Form