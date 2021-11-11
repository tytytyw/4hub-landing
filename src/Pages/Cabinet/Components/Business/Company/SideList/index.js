import React from 'react';
import styles from './SideList.module.sass'

import ListMenu from './ListMenu'
import AddLogo from "./AddLogo";

const SideList = ({data = [], pageOption, setPageOption, mouseParams, setMouseParams, renderMenuItems, setAction, companyName, setCompanyName}) => {

    return (
        <div className={styles.wrapper}>

            <div className={styles.topHeader}>
                <AddLogo
                    mouseParams={mouseParams}
                    setMouseParams={setMouseParams}
                    renderMenuItems={renderMenuItems}
                    setAction={setAction}
                    companyName={companyName}
                    setCompanyName={setCompanyName}
                />
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