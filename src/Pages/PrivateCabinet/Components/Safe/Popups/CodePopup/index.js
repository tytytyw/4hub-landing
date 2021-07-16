import React from 'react'
import PopUp from '../../../../../../generalComponents/PopUp'

import styles from './CodePopup.module.sass'
import Input from '../../../MyProfile/Input'
import Button from '../../../MyProfile/Button'
import SafeIcon from "../../SafeIcon";

const CodePopup = ({safe, set}) => {

    return (
        <PopUp set={set}>

            <div className={styles.wrapper}>

                <div className={styles.top}>

                    <div className={styles.closeWrap}>
                        <div
                            className={styles.close}
                            onClick={() => set(false)}
                        >
                            <span className={styles.times}/>
                        </div>
                    </div>

                </div>

                <div className={styles.content}>

                    <div className={styles.titleWrap}>
                        <SafeIcon
                            className={styles.titleImg}
                        />
                        <h4 className={styles.title}>{safe?.name || 'Сейф не найден'}</h4>
                    </div>

                    <div className={styles.inputWrap}>
                        <Input
                            placeholder='Введите пароль'
                            className={styles.input}
                        />
                        <a href={'/'} className={styles.link}>Забыли пароль?</a>
                    </div>

                    <p className={styles.orItem}>или</p>

                    <div className={styles.inputWrap}>
                        <Input
                            placeholder='Введите номер телефона (форма ввода +3 )'
                            label={false}
                            name='tel'
                            className={styles.input}
                            phone={true}
                        />
                        <a href={'/'} className={styles.link}>Не пришол код?</a>
                    </div>

                    <div className={styles.actionBlock}>
                        <Button
                            type='submit'
                            className={styles.actionBtn}
                        >
                            Войти
                        </Button>
                    </div>

                </div>
            </div>

        </PopUp>
    )

}

export default CodePopup
