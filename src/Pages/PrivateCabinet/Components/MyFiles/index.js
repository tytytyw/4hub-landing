import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './MyFiles.module.sass';
import List from '../List';
import FileItem from './FileItem/index';
import WorkSpace from './WorkSpace/index';
import { onChooseFiles } from '../../../../Store/actions/PrivateCabinetActions';

const MyFiles = () => {
    const dispatch = useDispatch();
    const [chosenFile] = useState(null);
    const fileList = useSelector(state => state.PrivateCabinet.fileList);
    const [workElementsView, setWorkElementsView] = useState('bars');
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
    useEffect(() => dispatch(onChooseFiles('global/all')), [dispatch]);

    return (
        <div className={styles.workAreaWrap}>
            {workElementsView === 'workLinesPreview' && <List
                title='Загрузить файл'
                src='add-file.svg'
                setListCollapsed={setListCollapsed}
                listCollapsed={listCollapsed}
                onCreate={()=>null}
            >
                <div className={styles.folderListWrap}>
                    {renderFileBar()}
                </div>
            </List>}
            <WorkSpace
                setBlob={setBlob}
                blob={blob}
                fileLoading={fileLoading}
                progress={progress}
                chosenFolder={chosenFolder}
                workElementsView={workElementsView}
                setWorkElementsView={setWorkElementsView}
            />
        </div>
    )
}

export default MyFiles;
