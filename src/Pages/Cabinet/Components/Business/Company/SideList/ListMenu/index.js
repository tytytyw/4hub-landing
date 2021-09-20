import React from 'react'

import styles from './ListMenu.module.sass'
import ListItem from './ListItem'

const ListMenu = ({menuData = [], page, setPage}) => {

    const renderItems = (data, isSub = false) => {

        return data.map(item => (
            <ListItem
                page={page}
                setPage={setPage}
                key={item.name}
                item={item}
                isSub={isSub}
                render={renderItems}
            />
        ))
    }

    return (
        <div className={styles.wrapper}>
            {renderItems(menuData)}
        </div>
    )
}

export default ListMenu