import React from 'react';

import styles from './SideList.module.sass'
import {ReactComponent as CompanyIcon} from '../../../../../../assets/BusinessCabinet/SideList/company.svg'

import ListMenu from './ListMenu'
import AddLogo from "./AddLogo";

const SideList = ({data = [], pageOption, setPageOption}) => {

    return (
        <div className={styles.wrapper}>

            <div className={styles.topHeader}>
                <AddLogo/>
            </div>

            <div className={styles.header}>
                <CompanyIcon className={styles.icon}/>
                <p className={styles.text}>Компания</p>
            </div>

            <ListMenu
                page={pageOption}
                setPage={setPageOption}
                menuData={data}
                setPageOption={setPageOption}
            />

        </div>
    )
}

export default SideList