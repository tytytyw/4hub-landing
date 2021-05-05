import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './MyFiles.module.sass';
import List from '../List';
import FileItem from './FileItem/index';
import WorkSpace from '../WorkSpace';

const MyFiles = () => {

    const [chosenFile, setChosenFile] = useState(null);
    const fileList = useSelector(state => state.PrivateCabinet.fileList);
    const renderFileBar = () => {
        if(!fileList?.files) return null;
        return fileList.files.map((file, i) => {
            return <FileItem key={i} file={file} chosen={chosenFile?.fid === file?.fid}  listCollapsed={listCollapsed}/>
        })
    };

    // const global = useSelector(state => state.PrivateCabinet.global);
    // const other = useSelector(state => state.PrivateCabinet.other?.folders);
    const [listCollapsed, setListCollapsed] = useState(false);
    const [chosenFolder, setChosenFolder] = useState({path: 'global/all', open: false, subPath: ''});
    const [newFolderInfo, setNewFolderInfo] = useState({path: ''});
    const [blob, setBlob] = useState({file: null, show: false});
    const [fileLoading, setFileLoading] = useState({isLoading: false, percentage: 95, file: null});
    const [progress, setProgress] = useState(0);
    const [safePassword, setSafePassword] = useState({open: false})
    const [workElementsView, setWorkElementsView] = useState('bars');

    return (
        <div className={styles.workAreaWrap}>
            <List
                title='Загрузить файл'
                src='add-file.svg'
                setListCollapsed={setListCollapsed}
                listCollapsed={listCollapsed}
                // onCreate={(boolean) => {setNewFolder(boolean); setNewFolderInfo({...newFolderInfo, path: ''})}}
            >
                <div className={styles.folderListWrap}>
                    {renderFileBar()}
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
        </div>
    )
}

export default MyFiles;
