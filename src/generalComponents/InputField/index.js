import React, {useState} from 'react';

import styles from './InputField.module.sass';
import classnames from 'classnames';

const InputField = ({
        value, set, model, mistake = false, height = '25px', switcher = false,
        placeholder = '', onSwitch
}) => {

    const [visibility, setVisibility] = useState('password');
    const [isPassword, setIsPassword] = useState(true);

    const switchOn = () => {
        setIsPassword(!isPassword);
        if(onSwitch) onSwitch(!isPassword);
    };

    return (
        <div style={{height}} className={styles.wrap}>
            <input
                className={classnames({
                    [styles.inputField]: true,
                    [styles.isPassword]: model === 'password',
                    [styles.redBorder]: mistake
                })}
                type={model === 'password' ? visibility : 'text'}
                value={value}
                placeholder={placeholder}
                onChange={(e) => set(e.target.value)}
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
                onClick={() => switchOn()}
            ><div className={isPassword ? styles.switchActive : styles.switch} /></div>}
        </div>
    )
}

export default InputField;
