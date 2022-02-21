import React from 'react'

import styles from './CustomItem.module.sass'
import classNames from "classnames";

const CustomItem = ({item, badge, onClick, listSize, collapsed}) => {

    return (
        <div
            onClick={onClick}
            className={classNames({
                [styles.innerFolderWrap]: true,
                [styles?.[`wrapper_${listSize}`]]: !!listSize
            })}
        >

            <div className={classNames({
                [styles.innerFolder]: true,
                [styles.collapsed]: collapsed
            })}>

                <div className={styles.innerFolderName}>
                    <img
                        src={item.img}
                        alt='icon'
                        className={styles.innerFolderIcon}
                    />
                    {collapsed ? null : <div className={styles.nameWrap}>
                        <div className={styles.name}>{item.name}</div>
                    </div>}
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
