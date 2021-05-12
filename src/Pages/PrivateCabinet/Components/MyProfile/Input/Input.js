import React from 'react'

import styles from './Input.module.sass'
import classnames from 'classnames'

const Input = (
    {
        type, label, value, name, placeholder, maxLength, className, custom = false,
        isMistake = false, disabled = false, showPass = false,
        onChange = () => {},
        onFocus = () => {},
        onKeyPress = () => {},
        onKeyup = () => {},
        onBlur = () => {},
        setShowPass = () => {},
    }
) => {

    const inputType = type || 'text'
    const htmlFor = `${inputType}-${Math.random()}`

    const getType = () => {
        switch (type) {
            case 'password':
                return showPass ? 'text' : 'password'
            default:
                return 'text'
        }
    }

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
        <div className={styles.inputWrap}>

            <label
                className={styles.label}
                htmlFor={htmlFor}
            >
                {label}
            </label>

            {MyInput}

            {type === 'password' && <img
                src={getEyeImg()}
                alt='eye'
                className={styles.eye}
                onClick={() => !disabled && setShowPass(!showPass)}
            />}

        </div>
    )
}

export default Input