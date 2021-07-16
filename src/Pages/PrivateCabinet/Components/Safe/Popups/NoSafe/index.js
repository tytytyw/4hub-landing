import React from 'react'
import PopUp from '../../../../../../generalComponents/PopUp'

import styles from './NoSafe.module.sass'
import Button from '../../../MyProfile/Button'

const NoSafe = ({set}) => {

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
                        <h4 className={styles.title}>У Вас еще нет ни одного сейфа</h4>
                    </div>

                    <div className={styles.imageWrap}>
                        <img
                            className={styles.image}
                            src="./assets/PrivateCabinet/alerts/nosafe-pc.png"
                            alt="Warning PC"
                        />
                    </div>

                    <div className={styles.textWrap}>
                        <p className={styles.text}>
                            Функция сейф поможет Вам хранить важные данные а так
                            же свои пароли в надежном месте
                        </p>
                    </div>

                    <div className={styles.actionBlock}>
                        <Button
                            type='submit'
                            className={styles.cancelBtn}
                            onClick={() => set(false)}
                        >
                            Отмена
                        </Button>
                        <Button
                            type='submit'
                            className={styles.submitBtn}
                        >
                            Создать
                        </Button>
                    </div>

                </div>
            </div>

        </PopUp>
    )

}

export default NoSafe
