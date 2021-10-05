import React, {useEffect, useRef, useState} from 'react';

import styles from './LangPicker.module.sass'
import {ReactComponent as ArrowIcon} from "../../assets/StartPage/arrow-point.svg";
import {ReactComponent as CheckMark} from "../../assets/PrivateCabinet/check-mark.svg";
import classNames from "classnames";

const langs = [
    {lang: 'ru', name: 'Русский'},
    {lang: 'ua', name: 'Украинский'},
    {lang: 'eng', name: 'Английский'},
]

const LangPicker = () => {

    const [lang, setLang] = useState('ru')
    const [open, setOpen] = useState(false)

    const ref = useRef()

    useEffect(() => {
        const onClick = (event) => {
            if (!ref.current?.contains(event.target)) {
                setOpen(false)
            }
        }
        window.addEventListener('click', onClick)
        return () => window.removeEventListener('click', onClick)
    }, [])

    return (

        <div className={styles.wrapper}>

            <div
                ref={ref}
                className={classNames({
                    [styles.content]: true,
                    [styles.active]: open
                })}
            >
                <div
                    onClick={() => setOpen(!open)}
                    className={styles.info}
                >
                    <span className={styles.lang}>{lang}</span>
                    <ArrowIcon className={styles.arrow} />
                </div>
                <ul className={styles.list}>
                    {langs.map(item => (
                        <li
                            onClick={() => {
                                setOpen(false)
                                setLang(item.lang)
                            }}
                            className={styles.item}
                            key={item.lang}
                        >
                            <p className={styles.lang}>{item.lang}</p>
                            {lang === item.lang && <CheckMark/>}
                        </li>
                    ))}
                </ul>
            </div>

        </div>


    );
};

export default LangPicker;