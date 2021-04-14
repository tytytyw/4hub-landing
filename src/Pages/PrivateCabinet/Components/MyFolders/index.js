import React, {useState} from 'react';
import { useSelector } from 'react-redux';

import styles from './MyFolders.module.sass';
import List from '../List';
import FolderItem from './FolderItem';
import WorkSpace from '../WorkSpace';
import CreateFolder from "../CreateFolder";

const MyFolders = () => {

    const global = useSelector(state => state.PrivateCabinet.global)
    const [listCollapsed, setListCollapsed] = useState(false);
    const [newFolder, setNewFolder] = useState(false);
    const [chosenFolder, setChosenFolder] = useState({path: ''});
    const [newFolderInfo, setNewFolderInfo] = useState({path: ''});

    const renderFolderList = () => {
        if(!global) return null;
        return global.map(el => {
            return <FolderItem
                key={el.name}
                folder={el}
                listCollapsed={listCollapsed}
                setNewFolderInfo={setNewFolderInfo}
                newFolderInfo={newFolderInfo}
                setNewFolder={setNewFolder}
                setChosenFolder={setChosenFolder}
                chosenFolder={chosenFolder}
                chosen={chosenFolder.path === el.path}
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
                info={newFolderInfo}
            />}
        </div>
    )
}

export default MyFolders;
