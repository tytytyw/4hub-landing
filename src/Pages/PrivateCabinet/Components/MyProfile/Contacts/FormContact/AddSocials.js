import React, {useEffect, useState} from 'react'

import styles from './FormContact.module.sass'
import PopUp from '../../../../../../generalComponents/PopUp'
/*import classnames from 'classnames'*/
import Button from '../../Button/Button'
import {socialsData as data} from '../consts'

const AddSocials = ({ values, setValues, set }) => {

    const [socialValues, setSocialValues] = useState([])

    useEffect(() => {
        const newData = []
        values.forEach(({type, link}) => {
            newData.push({type, link})
        })
        setSocialValues(newData)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onChange = (event, item) => {

        // получение ссылки от соц. сети
        const link = event.target.value
        // проверка на наличие соц. сети в общем массиве
        const socItem = socialValues.find(social => social.type === item.type)

        //если соц. сеть не имеется в общем массиве, добавляется иначе меняется только ссылка на нее
        if (!socItem) {
            socialValues.push({
                type: item.type,
                link
            })
        } else {
            socItem.link = link
        }

        // общий список соц. сетей проверяется на наличие ссылок, если нет ссылки удаляем из массива
        const newSocials = []
        socialValues.forEach(({type, link}) => {
            !!link && newSocials.push({ type, link })
        })

        // меняем состояние общего массива соц. сетей
        setSocialValues(newSocials)
    }

    const onSubmit = event => {
        event.preventDefault()
        setValues(socialValues)
        set(false)
    }

    const getValue = item => {
        const valueItem = socialValues.find(socItem => socItem.type === item.type)
        return valueItem?.link ? valueItem.link : ''
    }

    return (
        <PopUp set={set} zIndex={102}>

            <form noValidate onSubmit={onSubmit} className={styles.wrapper}>

                <div className={styles.top}>
                    <span
                        className={styles.close}
                        onClick={() => set(false)}
                    >
                        <span className={styles.times}/>
                    </span>
                </div>

                <div className={styles.content}>

                    <div className={styles.header}>
                        <p className={styles.title}>Укажите никнейм к соц.сетям</p>
                    </div>

                    <div className={styles.formContent}>

                        {data.map((item, index) => (
                            <div className={styles.formItem} key={index}>
                                <div className={styles.formBlock}>

                                    <div className={styles.option}>
                                        <img src={item.icon} alt={item.label}/>
                                        <span className={styles.info}>{item.label}:</span>
                                    </div>

                                    <input
                                        value={getValue(item)}
                                        onChange={event => onChange(event, item)}
                                        name={item.type}
                                        className={styles.input}
                                    />
                                </div>
                            </div>
                        ))}

                    </div>

                </div>

                <div className={styles.submitBlock}>
                    <Button
                        className={styles.cancelBtn}
                        onClick={() => set(false)}
                    >
                        Отмена
                    </Button>
                    <Button
                        type='submit'
                        className={styles.submitBtn}
                    >
                        Сохранить
                    </Button>
                </div>

            </form>

        </PopUp>
    )
}

export default AddSocials