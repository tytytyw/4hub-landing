import React from 'react'

import styles from './TariffCard.module.sass'
import Button from '../../Button'
import classnames from 'classnames'

const TariffCard = ({ item }) => {

    return (
        <div className={styles.card}>

            <div className={classnames({
                [styles.topBlock]: true,
                [styles.dayOffer]: item.dayOffer
            })}>
                {item.dayOffer && 'Предложение дня'}
            </div>

            <div>

                <div className={styles.header}>
                    <p className={styles.tariff}>{item.tariff}</p>
                    <div className={styles.priceBlock}>
                        {item.oldPrice && <p className={styles.oldPrice}>${item.oldPrice}</p>}
                        <p className={styles.price}>${item.price}</p>
                    </div>
                    <p className={styles.desc}>{item.desc}</p>
                </div>

                <div className={styles.content}>

                    <ul className={styles.optionList}>
                        {item.options.map((subItem, index) => (
                            <li className={styles.optionItem} key={index}>
                                <div className={styles.icon}>
                                    <img src={subItem.img} alt="Pie Chart"/>
                                </div>
                                <p>{subItem.text}</p>
                            </li>
                        ))}
                    </ul>

                </div>

            </div>


            <div className={styles.actionBlock}>
                <Button
                    className={classnames({
                        [styles.actionBtn]: true,
                        [styles.buyBtn]: !item.current
                    })}
                >
                    {item.current ? 'Текущий план' : 'Купить'}
                </Button>
            </div>

        </div>
    )
}

export default TariffCard