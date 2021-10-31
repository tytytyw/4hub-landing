import React, {useState} from 'react';

import styles from './InputField.module.sass';
import classnames from 'classnames';

const InputField = ({
        value, set, model, mistake = false, switcher = false, isPass = false,
        placeholder = '', onSwitch, visibility, setVisibility, comparePass, phone, disabled = false
}) => {

    const [isPassword, setIsPassword] = useState(isPass);

    const switchOn = () => {
        setIsPassword(!isPassword);
        if(onSwitch) onSwitch(!isPassword);
    };

    const deleteReadOnly = (e) => {
        e.target.removeAttribute('readonly');
    }

    return (
        <div className={classnames({
            [styles.wrap]: true,
            [styles.redBorder]: mistake
        })}>
            <input
                className={classnames({
                    [styles.inputField]: true,
                    [styles.isPassword]: model === 'password',
                })}
                type={model === 'password' ? visibility : 'text'}
                autoComplete='off'
                readOnly={true}
                value={value}
                placeholder={placeholder}
                onFocus={deleteReadOnly}
                onChange={(e) => {
                    let newVal = e.target.value;
                    if(comparePass) comparePass(e.target.value);
                    if(e.target.value[0] === '+' && phone) {
                        const number = newVal.replace(/(\+)*(\()*(\))*\s*(-)*/g, '');
                        const length = number.length;
                        newVal = `+${number.substring(0, 2)}${length > 2 ? ' (' + number.substring(2, 5) : number.substring(2, 5)}${ length > 5 ? ') ' + number.substring(5, 8) : number.substring(5, 8)}${ length > 8 ? '-' + number.substring(8, 10) : number.substring(8, 10)}${length > 10 ? '-' + number.substring(10, number.length) : number.substring(10, number.length)}`;
                    }
                    set(newVal)}
                }
                disabled={disabled}
            />
            {isPassword && model === 'password' && visibility === 'password' && <img
                src='./assets/StartPage/invisible.svg'
                alt='eye'
                className={switcher ? styles.eye : styles.noSwitcher}
                onClick={() => setVisibility('text')}
            />}
            {isPassword && model === 'password' && visibility === 'text' && <img
                src='./assets/StartPage/eye.svg'
                alt='eye'
                className={switcher ? styles.eye : styles.noSwitcher}
                onClick={() => setVisibility('password')}
            />}
            {switcher && <div
                className={isPassword ? styles.switcherActive : styles.switcher}
                onClick={switchOn}
            ><div className={isPassword ? styles.switchActive : styles.switch} /></div>}
        </div>
    )
}

export default InputField;
