import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import styles from './MyFolders.module.sass';
import List from '../List';
import FolderItem from './FolderItem';
import WorkSpace from '../WorkSpace';
import CreateFolder from "../CreateFolder";
import CreateFile from "../CreateFile";

const MyFolders = () => {

    const global = useSelector(state => state.PrivateCabinet.global)
    const [listCollapsed, setListCollapsed] = useState(false);
    const [newFolder, setNewFolder] = useState(false);
    const [chosenFolder, setChosenFolder] = useState({path: 'global/all', open: false, subPath: ''});
    const [newFolderInfo, setNewFolderInfo] = useState({path: ''});
    const [blob, setBlob] = useState({file: null, show: false});
    const [fileLoading, setFileLoading] = useState({isLoading: false, percentage: 95, file: null});
    const [progress, setProgress] = useState(0);

    const renderFolderList = () => {
        if(!global) return null;
        return global.map((el, i) => {
            return <FolderItem
                key={i + el.name}
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
            <WorkSpace setBlob={setBlob} blob={blob} fileLoading={fileLoading} progress={progress} />
            {newFolder && <CreateFolder
                onCreate={setNewFolder}
                title='Новая папка'
                info={newFolderInfo}
                chosenFolder={chosenFolder}
                setChosenFolder={setChosenFolder}
            />}
            <input type='file' style={{display: 'none'}} id='add-file' onChange={e => setBlob(e.target.files[0])} />
            {blob.show && <CreateFile
                title='Добавление файла'
                info={chosenFolder}
                blob={blob}
                setBlob={setBlob}
                setFileLoading={setFileLoading}
                fileLoading={fileLoading}
                setProgress={setProgress}
                progress={progress}
            />}
        </div>
    )
}

export default MyFolders;
