import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './MyFiles.module.sass';
import List from '../List';
import FileItem from './FileItem/index';
import WorkSpace from '../WorkSpace';

const MyFiles = () => {

    const [chosenFile] = useState(null);
    const fileList = useSelector(state => state.PrivateCabinet.fileList);
    const renderFileBar = () => {
        if(!fileList?.files) return null;
        return fileList.files.map((file, i) => {
            return <FileItem key={i} file={file} chosen={chosenFile?.fid === file?.fid}  listCollapsed={listCollapsed}/>
        })
    };
    const [listCollapsed, setListCollapsed] = useState(false);
    const [chosenFolder] = useState({path: 'global/all', open: false, subPath: ''});
    const [blob, setBlob] = useState({file: null, show: false});
    const [fileLoading] = useState({isLoading: false, percentage: 95, file: null});
    const [progress] = useState(0);
    return (
        <div className={styles.workAreaWrap}>
            <List
                title='Загрузить файл'
                src='add-file.svg'
                setListCollapsed={setListCollapsed}
                listCollapsed={listCollapsed}
                onCreate={()=>null}
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
            />
        </div>
    )
}

export default MyFiles;
