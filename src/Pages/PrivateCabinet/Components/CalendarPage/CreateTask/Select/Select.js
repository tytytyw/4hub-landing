import React, {useEffect, useRef, useState} from 'react'

import styles from './Select.module.sass'
import classNames from 'classnames'

const Select = ({data = [], initValue, onChange = () => {}, ...props}) => {

    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(initValue)

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

    const getValue = () => {

        if (!value) {
            return props.placeholder
        }

        const valueItem = data.find(item => item?.id === value)
        return valueItem?.text
    }

    return (
        <div
            ref={ref}
            className={classNames({
                [styles.selectWrap]: true,
                [styles.active]: !!open
            })}
        >

            <div
                onClick={() => setOpen(!open)}
                className={classNames({
                    [styles.select]: true,
                    [styles.selected]: !!value
                })}
            >
                <span className={styles.selectInput}>{getValue()}</span>
                <span className={classNames({
                    [styles.arrow]: true,
                    [styles.active]: !!open
                })}/>
            </div>

            <div className={classNames({
                [styles.contentWrap]: true,
                [styles.active]: !!open
            })}>
                {props.children}
            </div>

        </div>
    )
}

export default Select