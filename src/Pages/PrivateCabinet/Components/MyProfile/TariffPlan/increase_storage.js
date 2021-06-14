import React from 'react'

import styles from './TariffPlan.module.sass'
import Button from '../Button'
import TariffCard from './TariffCard'
import {data} from "./consts";

const TariffPlan = ({currentTariff = 'Free', balance = 100}) => {

    return (
        <div className={styles.wrapper}>

            <div className={styles.headerStorage}>
                <h4>Увеличьте Объем Хранилища</h4>
                <p>Изменить тарифный план можно в любой момент</p>
            </div>

            <div className={styles.cards}>
                {data.map((item, index) => {
                    return <TariffCard item={item} key={index}/>
                })}
            </div>

        </div>
    )
}

export default TariffPlan