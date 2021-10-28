import React, {useState} from 'react'

import styles from './ListMenu.module.sass'
import {ReactComponent as ArrowIcon} from '../../../../../../../assets/BusinessCabinet/SideList/arrow.svg'
import classNames from 'classnames'

const ListItem = ({item, page, setPage, isSub, render, setPageOption}) => {

    const [collapse, setCollapse] = useState(false)

    const hasChild = item.children?.length

    const onClickHandler = () => {
        setPageOption(item.name)
        if (hasChild) {
            setCollapse(!collapse)
            setPage(item.name)
        } else {
            // setPage(item.name)
        }
        
    }

    return (

        <div className={styles.itemWrap}>

            <div
                onClick={onClickHandler}
                className={classNames({
                    [styles.item]: true,
                    [styles.active]: collapse,
                    [styles.activePage]: page === item.name,
                    [styles.itemSub]: isSub
                })}
            >
                <div className={styles.info}>
                    <div className={styles.icon}>
                        {item.icon}
                    </div>
                    <p className={styles.text}>{item.label}</p>
                </div>

                {hasChild && <ArrowIcon className={styles.arrow}/>}
            </div>

            {hasChild &&
            <div className={classNames({
                [styles.subItems]: true,
                [styles.active]: collapse,
            })}>
                {render(item.children, true)}
            </div>}

        </div>
    )
}

export default ListItem