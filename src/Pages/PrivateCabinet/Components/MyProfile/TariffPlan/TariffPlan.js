import React from 'react'

import styles from './TariffPlan.module.sass'
import Button from '../Button/Button'
import TariffCard from './TariffCard/TariffCard'

const data = [
    {
        tariff: 'Free',
        price: 0,
        desc: 'На пользователя в месяц начиная с 3 польз.',
        current: true,
        dayOffer: false,
        options: [
            {
                img: './assets/PrivateCabinet/pie-chart-5.svg',
                text: '2 000 ГБ места для безопасного хранения файлов'
            },
            {
                img: './assets/PrivateCabinet/folder-3.svg',
                text: 'Простые инструменты для храннения и предоставления доступа и совместной работы'
            },
        ]
    },
    {
        tariff: 'Standart',
        price: 30,
        desc: 'На пользователя в месяц начиная с 3 польз.',
        current: false,
        dayOffer: false,
        options: [
            {
                img: './assets/PrivateCabinet/pie-chart-5.svg',
                text: '2 000 ГБ места для безопасного хранения файлов'
            },
            {
                img: './assets/PrivateCabinet/folder-3.svg',
                text: 'Простые инструменты для храннения и предоставления доступа и совместной работы'
            },
        ]
    },
    {
        tariff: 'Premium',
        price: 50,
        oldPrice: 100,
        desc: 'На пользователя в месяц начиная с 3 польз.',
        current: false,
        dayOffer: true,
        options: [
            {
                img: './assets/PrivateCabinet/pie-chart-5.svg',
                text: '2 000 ГБ места для безопасного хранения файлов'
            },
            {
                img: './assets/PrivateCabinet/folder-3.svg',
                text: 'Простые инструменты для храннения и предоставления доступа и совместной работы'
            },
        ]
    },
    {
        tariff: 'Premium plus',
        price: 120,
        desc: 'На пользователя в месяц начиная с 3 польз.',
        current: false,
        dayOffer: false,
        options: [
            {
                img: './assets/PrivateCabinet/pie-chart-5.svg',
                text: '2 000 ГБ места для безопасного хранения файлов'
            },
            {
                img: './assets/PrivateCabinet/folder-3.svg',
                text: 'Простые инструменты для храннения и предоставления доступа и совместной работы'
            },
        ]
    },
]


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
                {data.map((item, index) => (
                    <TariffCard item={item} key={index}/>
                ))}
            </div>

        </div>
    )
}

export default TariffPlan