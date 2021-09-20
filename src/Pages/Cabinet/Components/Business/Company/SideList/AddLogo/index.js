import React, {useState} from 'react'
import styles from './AddLogo.module.sass'
import logoImg from '../../../../../../../assets/BusinessCabinet/logo.png'
import {ReactComponent as ArrowIcon} from '../../../../../../../assets/BusinessCabinet/SideList/arrow.svg'

const AddLogo = () => {

    const [image] = useState(1)

    return (
        <div className={styles.wrapper}>
            {image
                ? <img src={logoImg} alt="Logo"/>
                : <p className={styles.title}>Добавить лого компании</p>}
            <ArrowIcon className={styles.arrow}/>

            {/*<div className={styles.context}>*/}
            {/*    <div className={styles.contextItem}>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    )
}

export default AddLogo