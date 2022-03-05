import React from 'react'

import styles from './WorkSpace.module.sass'
import SearchField from '../../SearchField'
import StorageSize from '../../StorageSize'
import Notifications from '../../Notifications'
import classnames from "classnames";

const WorkSpace = ({
       listCollapsed
}) => {

    return (
        <>
            <div
                className={classnames({
                    [styles.workSpaceWrap]: true,
                    [styles.collapsed]: listCollapsed,
                    [styles.notCollapsed]: !listCollapsed,
                })}
            >
                <div className={styles.header}>
                    <SearchField/>
                    <div className={styles.infoHeader}>
                        <StorageSize/>
                        <Notifications/>
                    </div>
                </div>
            </div>
        </>)
}

export default WorkSpace
