import React, {useState} from 'react'

import styles from './TableTaskItem.module.sass'
import {taskTypesColor} from '../helper'
import PopoverTaskItem from "./PopoverTaskItem";

const TableTaskItem = ({task}) => {

    const [visible, setVisible] = useState(false)
    const color = taskTypesColor?.[task?.type]

    return (
        <div
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
            style={{
                background: color
            }}
            className={styles.wrapper}
        >
            <p className={styles.name}>{task?.name}</p>

            {visible &&
            <PopoverTaskItem
                task={task}
            />}
        </div>
    )
}

export default TableTaskItem