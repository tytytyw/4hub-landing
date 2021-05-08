import React, {useState} from 'react'

import styles from './Input.module.sass'
import classnames from 'classnames'

const Input = (
    {
        type, label, value, name, placeholder,
        isMistake = false, disabled = false,
        onChange = () => {},
        onKeyup = () => {},
        onBlur = () => {}
    }
) => {

    const inputType = type || 'text'
    const htmlFor = `${inputType}-${Math.random()}`

    const [toText, setToText] = useState(false)

    const getType = () => {
        switch (type) {
            case 'password':
                return toText ? 'text' : 'password'
            default:
                return 'text'
        }
    }

    const getEyeImg = () => toText ? './assets/StartPage/eye.svg' : './assets/StartPage/invisible.svg'

    return (
        <div className={styles.inputWrap}>

            <label
                className={styles.label}
                htmlFor={htmlFor}
            >
                {label}
            </label>

            <input
                className={classnames({
                    [styles.input]: true,
                    [styles.redBorder]: isMistake && !disabled
                })}
                id={htmlFor}
                type={getType()}
                value={value}
                name={name}
                onChange={onChange}
                onBlur={onBlur}
                onKeyUp={onKeyup}
                disabled={disabled}
                placeholder={placeholder}
            />

            {type === 'password' && <img
                src={getEyeImg()}
                alt='eye'
                className={styles.eye}
                onClick={() => !disabled && setToText(!toText)}
            />}

        </div>
    )
}

export default Input