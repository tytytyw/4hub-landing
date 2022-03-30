import React from 'react'

import styles from './TariffPlan.module.sass'
import TariffCard from './TariffCard'
import {useData} from './consts'
import {useLocales} from "react-localized";

const TariffPlan = () => {
    const { __ } = useLocales();
    const data = useData();
    return (
        <div className={styles.wrapper}>

            <div className={styles.headerStorage}>
                <h4>{ __('Увеличьте Объем Хранилища') }</h4>
                <p>{ __('Изменить тарифный план можно в любой момент') }</p>
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