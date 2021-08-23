import React from "react";

import styles from "./WorkSpace.module.sass";
import List from "../../List";

const WorkSpace = () => {
    return(
        <div className={styles.chatWorkSpaceWrap}>
            <List
                icon={false}
                title='Мои устройства'
                src='add-folder.svg'
                // setListCollapsed={setListCollapsed}
                // listCollapsed={listCollapsed}
                // onCreate={(boolean) => {setNewFolder(boolean); setNewFolderInfo({...newFolderInfo, path: ''})}}
            >

            </List>
        </div>
    )
}

export default WorkSpace;