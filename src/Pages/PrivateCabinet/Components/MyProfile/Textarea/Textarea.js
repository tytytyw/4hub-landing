import React, {useState} from 'react'

import styles from './Textarea.module.sass'
import classnames from 'classnames'

const Textarea = (
    {
        type, label, value, name,
        isMistake = false, readonly = false,
        onChange = () => {},
        onBlur = () => {},
    }
) => {

    const inputType = type || 'text'
    const htmlFor = `${inputType}-${Math.random()}`

    return (
        <div className={styles.inputWrap}>

            <label
                className={styles.label}
                htmlFor={htmlFor}
            >
                {label}
            </label>

            <textarea
                className={classnames({
                    [styles.textarea]: true,
                    [styles.redBorder]: isMistake
                })}
                id={htmlFor}
                name={name}
                onChange={onChange}
                onBlur={onBlur}
                onKeyUp={onBlur}
                readOnly={readonly}
            >
                {value}
            </textarea>

        </div>
    )
}

export default Textarea