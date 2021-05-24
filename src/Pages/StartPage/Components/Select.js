import React, {useState} from 'react'

import styles from './Select.module.sass'
import classNames from "classnames";

const Select = ({data = [], initValue, onChange = () => {}, ...props}) => {

    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(initValue)

    return (
        <div className={classNames({
            [styles.selectWrap]: true,
            [styles.active]: !!open
        })}>

            <div
                onClick={() => setOpen(!open)}
                className={styles.select}
            >
                <span className={styles.selectInput}>{value}</span>
                <span className={classNames({
                    [styles.arrow]: true,
                    [styles.active]: !!open
                })}/>
            </div>

            <div className={classNames({
                [styles.contentWrap]: true,
                [styles.active]: !!open
            })}>

                <ul className={styles.content}>
                    {data.map((item, index) => (
                        <li
                            key={index}
                            onClick={() => {
                                setOpen(false)
                                setValue(item.text)
                                onChange(item.text)
                            }}
                            className={classNames({
                                [styles.option]: true,
                                [styles.active]: value === item.text
                            })}
                        >{item.text}</li>
                    ))}
                </ul>

            </div>

        </div>
    )
}

export default Select