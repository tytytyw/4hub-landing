import React from 'react'

import styles from './CustomItem.module.sass'

const CustomItem = ({item, badge, onClick}) => {

    return (
        <div
            onClick={onClick}
            className={styles.innerFolderWrap}
        >

            <div className={styles.innerFolder}>

                <div className={styles.innerFolderName}>
                    <img
                        src={item.img}
                        alt='icon'
                        className={styles.innerFolderIcon}
                    />
                    <div className={styles.nameWrap}>
                        <div className={styles.Name}>
                            <div className={styles.name}>{item.name}</div>
                        </div>
                    </div>
                </div>

                <div className={styles.innerFolderMedia}>

                    {badge > 0 &&
                    <span className={styles.badge}>{badge}</span>}

                    {item.symbol &&
                    <img
                        className={styles.symbols}
                        src={item?.symbol}
                        alt='emoji'
                    />}

                </div>

            </div>
        </div>
    )
}

export default CustomItem
