import React from 'react'

import styles from './TariffPlan.module.sass'
import Button from '../Button'
import TariffCard from './TariffCard'
import {data} from "./consts";

const TariffPlan = ({currentTariff = 'Free', balance = 100}) => {

    return (
        <div className={styles.wrapper}>

            <div className={styles.header}>

                <div className={styles.headerLeft}>
                    <p>Ваш текущий тарифный план:&nbsp;<span className={styles.tariff}>{currentTariff}</span></p>
                </div>
                <div className={styles.headerRight}>
                    <div className={styles.balance}>
                        <img src="./assets/PrivateCabinet/credit-card-payment.svg" alt="Credit card"/>
                        <p>Баланс:&nbsp;<span>{balance}$</span></p>
                    </div>
                    <div className={styles.addBalance}>
                        <Button className={styles.addBalanceBtn}>
                            Пополнить баланс
                            <img src="./assets/PrivateCabinet/plus-3.svg" alt="Plus"/>
                        </Button>
                    </div>
                </div>

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