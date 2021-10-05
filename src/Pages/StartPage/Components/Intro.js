import React from 'react';

import styles from './Intro.module.sass';
import { ReactComponent as DownloadIcon } from '../../../assets/StartPage/download-startPage.svg';
import {imageSrc} from '../../../generalComponents/globalVariables';

const Intro = ({setPage, setOptions}) => {
    return (
        <div className={styles.main}>
            <img className={styles.hubIcon} src={imageSrc + 'assets/StartPage/4HUB.svg'} alt='4HUB' />
            <div className={styles.title}>Remote WorkSpace</div>
            <div className={styles.description}>
                Рыбный текст о сервисе и его преймуществах, сейчас делаю его на 3
                строкиможно больше можно меньше
            </div>
            <div className={styles.siteOptionWrapper}>
                <div className={styles.siteOption}>
                    <h3>Для личных целей</h3>
                    <span>
                        Рыбный текст о сервисе и его преймуществах, сейчас делаю
                        его на 3 строкиможно больше можно меньше  сейчас делаю его
                        на 3 строкиможно больше можно меньше
                    </span>
                    <div onClick={() => setPage('landing')}>Перейти</div>
                </div>
                <div className={styles.siteOption}>
                    <h3>Для бизнеса</h3>
                    <span>
                        Рыбный текст о сервисе и его преймуществах, сейчас делаю
                        его на 3 строкиможно больше можно меньше  сейчас делаю его
                        на 3 строки можно больше можно меньше
                    </span>
                    <div onClick={() => setPage('business-landing')}>Перейти</div>
                </div>
            </div>
            <div className={styles.download} onClick={() => setPage('sendFile')}>
                <DownloadIcon className={styles.downloadIcon} />
                <span>Отправить файл</span>
            </div>
        </div>
    )
};

export default Intro