<<<<<<< HEAD
import React, {useState} from 'react'
=======
import React from 'react'
>>>>>>> e2bca16da87ec29e6978e52809d9e1f1494eed87

import styles from './Input.module.sass'
import classnames from 'classnames'

const Input = (
    {
<<<<<<< HEAD
        type, label, value, name, placeholder,
        isMistake = false, readonly = false,
        onChange = () => {},
        onKeyup = () => {},
        onBlur = () => {}
=======
        type, label, value, name, placeholder, maxLength, className, custom = false,
        isMistake = false, disabled = false, showPass = false,
        onChange = () => {},
        onFocus = () => {},
        onKeyPress = () => {},
        onKeyup = () => {},
        onBlur = () => {},
        setShowPass = () => {},
>>>>>>> e2bca16da87ec29e6978e52809d9e1f1494eed87
    }
) => {

    const inputType = type || 'text'
    const htmlFor = `${inputType}-${Math.random()}`

<<<<<<< HEAD
    const [toText, setToText] = useState(false)

    const getType = () => {
        switch (type) {
            case 'password':
                return toText ? 'text' : 'password'
=======
    const getType = () => {
        switch (type) {
            case 'password':
                return showPass ? 'text' : 'password'
>>>>>>> e2bca16da87ec29e6978e52809d9e1f1494eed87
            default:
                return 'text'
        }
    }

<<<<<<< HEAD
    const getEyeImg = () => toText ? './assets/StartPage/eye.svg' : './assets/StartPage/invisible.svg'

    return (
=======
    const getEyeImg = () => showPass ? './assets/StartPage/eye.svg' : './assets/StartPage/invisible.svg'

    const MyInput = <input
        className={classnames({
            [styles.input]: !custom,
            [className]: !!className,
            [styles.redBorder]: isMistake && !disabled
        })}
        id={htmlFor}
        maxLength={maxLength}
        type={getType()}
        value={value}
        name={name}
        onChange={onChange}
        onFocus={onFocus}
        onKeyPress={onKeyPress}
        onBlur={onBlur}
        onKeyUp={onKeyup}
        disabled={disabled}
        placeholder={placeholder}
    />

    return custom ? <input
        className={classnames({
            [styles.input]: !custom,
            [className]: !!className,
            [styles.redBorder]: isMistake && !disabled
        })}
        id={htmlFor}
        maxLength={maxLength}
        type={getType()}
        value={value}
        name={name}
        onChange={onChange}
        onFocus={onFocus}
        onKeyPress={onKeyPress}
        onBlur={onBlur}
        onKeyUp={onKeyup}
        disabled={disabled}
        placeholder={placeholder}
    /> : (
>>>>>>> e2bca16da87ec29e6978e52809d9e1f1494eed87
        <div className={styles.inputWrap}>

            <label
                className={styles.label}
                htmlFor={htmlFor}
            >
                {label}
            </label>

<<<<<<< HEAD
            <input
                className={classnames({
                    [styles.input]: true,
                    [styles.redBorder]: isMistake
                })}
                id={htmlFor}
                type={getType()}
                value={value}
                name={name}
                onChange={onChange}
                onBlur={onBlur}
                onKeyUp={onKeyup}
                readOnly={readonly}
                placeholder={placeholder}
            />
=======
            {MyInput}
>>>>>>> e2bca16da87ec29e6978e52809d9e1f1494eed87

            {type === 'password' && <img
                src={getEyeImg()}
                alt='eye'
                className={styles.eye}
<<<<<<< HEAD
                onClick={() => setToText(!toText)}
=======
                onClick={() => !disabled && setShowPass(!showPass)}
>>>>>>> e2bca16da87ec29e6978e52809d9e1f1494eed87
            />}

        </div>
    )
}

export default Input