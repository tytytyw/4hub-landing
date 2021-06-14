import React from 'react'
import PopUp from '../../../../../generalComponents/PopUp'

import styles from './CodePopup.module.sass'
import Input from '../../MyProfile/Input'
import Button from '../../MyProfile/Button'

const CodePopup = ({safe, set}) => {

    return (
        <PopUp set={set}>

            <div className={styles.wrapper}>

                <div className={styles.top}>
                    <span
                        className={styles.close}
                        onClick={() => set(false)}
                    >
                        <span className={styles.times}/>
                    </span>
                </div>

                <div className={styles.content}>
                    <h4 className={styles.title}>{safe?.name}</h4>
                    <div className={styles.inputWrap}>
                        <Input
                            placeholder='Введите код в смс'
                            className={styles.input}
                        />
                        <a href={'/'} className={styles.link}>Не пришел код?</a>
                    </div>
                    <div className={styles.actionBlock}>
                        <Button
                            type='submit'
                            className={styles.actionBtn}
                        >
                            Отправить
                        </Button>
                    </div>
                </div>
            </div>

        </PopUp>
    )

}

export default CodePopup
