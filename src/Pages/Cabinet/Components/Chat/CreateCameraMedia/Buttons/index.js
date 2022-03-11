import React from 'react'
import styles from './Buttons.module.sass'

const Buttons = ({state}) => {
  return (
    <div className={styles.wrapper}>
        <div className={styles.leftContainer}>left</div>
        <div className={styles.centerContainer}>center</div>
        <div className={styles.rightContainer}>right</div>
    </div>
  )
}

export default Buttons