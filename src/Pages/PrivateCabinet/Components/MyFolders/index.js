import React, {useState} from 'react';

import styles from './MyFolders.module.sass';
import List from '../List';
import FolderItem from './FolderItem';
import { folders } from './hardCodedFolders';
import WorkSpace from '../WorkSpace';
import CreateFolder from "../CreateFolder";

const MyFolders = () => {

    const [listCollapsed, setListCollapsed] = useState(false);
    const [newFolder, setNewFolder] = useState(false);

    const renderFolderList = () => {
        return folders.map(el => {
            return <FolderItem
                key={el.name}
                src={el.src}
                title={el.name}
                quantity={el.folders.length}
                listCollapsed={listCollapsed}
            />
        })
    };

    return (
        <div className={styles.workAreaWrap}>
            <List
                title='Папки'
                src='add-folder.svg'
                setListCollapsed={setListCollapsed}
                listCollapsed={listCollapsed}
                onCreate={setNewFolder}
            >
                <div className={styles.folderListWrap}>
                    {renderFolderList()}
                </div>
            </List>
            <WorkSpace />
            {newFolder && <CreateFolder
                onCreate={setNewFolder}
                title='Новая папка'
            />}
        </div>
    )
}

export default MyFolders;
