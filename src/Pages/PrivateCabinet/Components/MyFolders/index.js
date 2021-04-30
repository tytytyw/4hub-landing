import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import styles from './MyFolders.module.sass';
import List from '../List';
import FolderItem from './FolderItem';
import WorkSpace from '../WorkSpace';
import CreateFolder from '../CreateFolder';
import CreateFile from '../CreateFile';
import CustomFolderItem from './CustomFolderItem';
import CreateSafePassword from '../CreateSafePassword';

const MyFolders = () => {

    const global = useSelector(state => state.PrivateCabinet.global);
    const other = useSelector(state => state.PrivateCabinet.other?.folders);
    const [listCollapsed, setListCollapsed] = useState(false);
    const [newFolder, setNewFolder] = useState(false);
    const [chosenFolder, setChosenFolder] = useState({path: 'global/all', open: false, subPath: ''});
    const [newFolderInfo, setNewFolderInfo] = useState({path: ''});
    const [blob, setBlob] = useState({file: null, show: false});
    const [fileLoading, setFileLoading] = useState({isLoading: false, percentage: 95, file: null});
    const [progress, setProgress] = useState(0);
    const [safePassword, setSafePassword] = useState({open: false})

    const renderStandardFolderList = () => {
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

    const renderOtherFolderList = () => {
        if(!other) return null;
        return other.map((f, i) => {
            return <CustomFolderItem
                key={i + f.name}
                f={f}
                listCollapsed={listCollapsed}
                setNewFolderInfo={setNewFolderInfo}
                newFolderInfo={newFolderInfo}
                setNewFolder={setNewFolder}
                setChosenFolder={setChosenFolder}
                chosenFolder={chosenFolder}
                chosen={chosenFolder.path === f.path}
                padding={'0px 10px 0px 26px'}
                subFolder={false}
            />
        })
    };

    const onCloseSafePassword = (boolean) => setSafePassword({...safePassword, open: boolean});

    return (
        <div className={styles.workAreaWrap}>
            <List
                title='Папки'
                src='add-folder.svg'
                setListCollapsed={setListCollapsed}
                listCollapsed={listCollapsed}
                onCreate={(boolean) => {setNewFolder(boolean); setNewFolderInfo({...newFolderInfo, path: ''})}}
            >
                <div className={styles.folderListWrap}>
                    {renderStandardFolderList()}
                    {renderOtherFolderList()}
                </div>
            </List>
            <WorkSpace
                setBlob={setBlob}
                blob={blob}
                fileLoading={fileLoading}
                progress={progress}
                chosenFolder={chosenFolder}
                setSafePassword={setSafePassword}
            />
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
            {safePassword.open && <CreateSafePassword
                onToggle={onCloseSafePassword}
                title='Создайте пароль для Сейфа с паролями'
                info={newFolderInfo}
                chosenFolder={chosenFolder}
                setChosenFolder={setChosenFolder}
            />}
        </div>
    )
}

export default MyFolders;
